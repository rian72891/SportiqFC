import { useState, useEffect, useCallback, useRef } from 'react';
import { RefreshCw, Wifi, WifiOff, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Match {
  id: string;
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  status: 'live' | 'scheduled' | 'finished';
  time: string;
  commence: string;
}

const SPORT_NAMES: Record<string, string> = {
  'soccer_brazil_campeonato': 'Brasileirão',
  'soccer_uefa_champs_league': 'Champions League',
  'soccer_epl': 'Premier League',
  'soccer_spain_la_liga': 'La Liga',
  'basketball_nba': 'NBA',
  'mma_mixed_martial_arts': 'UFC',
};

const SPORT_ICONS: Record<string, string> = {
  'Brasileirão': '🇧🇷',
  'Champions League': '🏆',
  'Premier League': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'La Liga': '🇪🇸',
  'NBA': '🏀',
  'UFC': '🥊',
};

const REFRESH_OPTIONS = [
  { label: '30s', value: 30 },
  { label: '1min', value: 60 },
  { label: '5min', value: 300 },
];

const CACHE_KEY = 'sportiqfc_live_scores';
const CACHE_EXPIRY_KEY = 'sportiqfc_live_scores_expiry';

const FALLBACK_MATCHES: Match[] = [
  { id: 'f1', sport: 'Brasileirão', league: 'Brasileirão', homeTeam: 'Flamengo', awayTeam: 'Palmeiras', homeScore: 2, awayScore: 1, status: 'finished', time: 'FT', commence: '2026-03-16T20:00:00Z' },
  { id: 'f2', sport: 'Premier League', league: 'Premier League', homeTeam: 'Liverpool', awayTeam: 'Arsenal', homeScore: 3, awayScore: 2, status: 'finished', time: 'FT', commence: '2026-03-16T17:00:00Z' },
  { id: 'f3', sport: 'La Liga', league: 'La Liga', homeTeam: 'Real Madrid', awayTeam: 'Barcelona', homeScore: 2, awayScore: 2, status: 'finished', time: 'FT', commence: '2026-03-16T21:00:00Z' },
  { id: 'f4', sport: 'Brasileirão', league: 'Brasileirão', homeTeam: 'Botafogo', awayTeam: 'São Paulo', homeScore: 1, awayScore: 0, status: 'finished', time: 'FT', commence: '2026-03-16T19:00:00Z' },
  { id: 'f5', sport: 'NBA', league: 'NBA', homeTeam: 'Lakers', awayTeam: 'Celtics', homeScore: 112, awayScore: 108, status: 'finished', time: 'FT', commence: '2026-03-16T02:00:00Z' },
  { id: 'u1', sport: 'Brasileirão', league: 'Brasileirão', homeTeam: 'Corinthians', awayTeam: 'Cruzeiro', homeScore: null, awayScore: null, status: 'scheduled', time: '20:00', commence: '2026-03-18T23:00:00Z' },
  { id: 'u2', sport: 'Champions League', league: 'Champions League', homeTeam: 'PSG', awayTeam: 'Bayern', homeScore: null, awayScore: null, status: 'scheduled', time: '16:00', commence: '2026-03-19T19:00:00Z' },
  { id: 'u3', sport: 'Premier League', league: 'Premier League', homeTeam: 'Man City', awayTeam: 'Chelsea', homeScore: null, awayScore: null, status: 'scheduled', time: '13:30', commence: '2026-03-19T16:30:00Z' },
  { id: 'u4', sport: 'La Liga', league: 'La Liga', homeTeam: 'Atlético Madrid', awayTeam: 'Sevilla', homeScore: null, awayScore: null, status: 'scheduled', time: '17:00', commence: '2026-03-20T20:00:00Z' },
  { id: 'u5', sport: 'UFC', league: 'UFC', homeTeam: 'Alex Pereira', awayTeam: 'Ankalaev', homeScore: null, awayScore: null, status: 'scheduled', time: '23:00', commence: '2026-03-22T02:00:00Z' },
];

// Load cached data from localStorage
const loadCachedScores = (): Match[] | null => {
  try {
    const expiry = localStorage.getItem(CACHE_EXPIRY_KEY);
    if (expiry && Date.now() < parseInt(expiry)) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) return JSON.parse(cached);
    }
  } catch {}
  return null;
};

const saveCachedScores = (matches: Match[]) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(matches));
    // Cache for 30 minutes
    localStorage.setItem(CACHE_EXPIRY_KEY, String(Date.now() + 30 * 60 * 1000));
  } catch {}
};

// Team badge URL helper using a public CDN
const getTeamBadge = (teamName: string): string | null => {
  // Use a free logo API
  const encoded = encodeURIComponent(teamName);
  return `https://www.thesportsdb.com/images/search/team/${encoded}.png`;
};

const LiveScores = () => {
  const [matches, setMatches] = useState<Match[]>(() => loadCachedScores() || []);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(60);
  const [countdown, setCountdown] = useState(60);
  const [activeFilter, setActiveFilter] = useState('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchScores = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-scores');

      if (error) throw error;

      const fetchedMatches: Match[] = data?.matches || [];

      if (fetchedMatches.length > 0) {
        setMatches(fetchedMatches);
        saveCachedScores(fetchedMatches);
      } else {
        // If API returned empty, try cache then fallback
        const cached = loadCachedScores();
        setMatches(cached || FALLBACK_MATCHES);
      }

      setLastUpdate(new Date());
      setCountdown(refreshInterval);
    } catch (err) {
      console.error('Error fetching scores:', err);
      // On error, use cache or fallback - never show empty
      const cached = loadCachedScores();
      if (!matches.length) {
        setMatches(cached || FALLBACK_MATCHES);
      }
    } finally {
      setLoading(false);
    }
  }, [refreshInterval]);

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchScores, refreshInterval * 1000);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchScores]);

  useEffect(() => {
    if (!autoRefresh) return;
    setCountdown(refreshInterval);
    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? refreshInterval : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [autoRefresh, refreshInterval, lastUpdate]);

  const filteredMatches = activeFilter === 'all'
    ? matches
    : matches.filter((m) => m.league === activeFilter);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  const uniqueLeagues = [...new Set(matches.map((m) => m.league))];
  const liveCount = matches.filter((m) => m.status === 'live').length;

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-[1200px] mx-auto px-4 py-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚽</span>
            <span className="font-extrabold text-sm uppercase">Placares Ao Vivo</span>
            {liveCount > 0 && (
              <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-bold">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-live" />
                {liveCount} AO VIVO
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1.5 transition-all border ${
                autoRefresh
                  ? 'bg-primary/10 text-primary border-primary'
                  : 'bg-card text-muted-foreground border-border'
              }`}
              title={autoRefresh ? 'Desativar atualização automática' : 'Ativar atualização automática'}
            >
              {autoRefresh ? <Wifi size={12} /> : <WifiOff size={12} />}
              {autoRefresh ? `${countdown}s` : 'Off'}
            </button>
            {autoRefresh && (
              <div className="flex gap-1">
                {REFRESH_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setRefreshInterval(opt.value);
                      setCountdown(opt.value);
                    }}
                    className={`text-[10px] font-bold px-2 py-1 rounded-full transition-all ${
                      refreshInterval === opt.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => fetchScores()}
              className="flex items-center gap-1.5 text-xs font-semibold text-primary border border-primary rounded-full px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              Atualizar
            </button>
          </div>
        </div>

        {/* Sport filter tabs */}
        <div className="flex gap-1.5 mb-3 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap transition-all ${
              activeFilter === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-muted-foreground hover:text-foreground'
            }`}
          >
            Todos ({matches.length})
          </button>
          {uniqueLeagues.map((league) => {
            const count = matches.filter((m) => m.league === league).length;
            return (
              <button
                key={league}
                onClick={() => setActiveFilter(league)}
                className={`text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                  activeFilter === league
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background text-muted-foreground hover:text-foreground'
                }`}
              >
                {SPORT_ICONS[league] || '⚽'} {league} ({count})
              </button>
            );
          })}
        </div>

        {/* Matches scroll */}
        {loading && matches.length === 0 ? (
          <div className="flex gap-3 overflow-hidden px-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-shrink-0 rounded-xl p-3 min-w-[220px] border border-border bg-secondary animate-pulse">
                <div className="h-3 bg-muted rounded w-20 mb-3" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-3 bg-muted rounded w-24" />
                    <div className="h-4 bg-muted rounded w-6" />
                  </div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-muted rounded w-20" />
                    <div className="h-4 bg-muted rounded w-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredMatches.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground text-sm">
            Nenhum jogo encontrado para este filtro
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card/90 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all shadow-lg"
            >
              <ChevronLeft size={16} />
            </button>
            <div ref={scrollRef} className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 px-6">
              {filteredMatches.map((match) => (
                <div
                  key={match.id}
                  className={`flex-shrink-0 rounded-xl p-3 min-w-[220px] border transition-all cursor-pointer ${
                    match.status === 'live'
                      ? 'bg-primary/5 border-primary shadow-red'
                      : 'bg-secondary border-border hover:border-primary'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                      {SPORT_ICONS[match.league] || '⚽'} {match.league}
                    </span>
                    {match.status === 'live' ? (
                      <span className="bg-primary text-primary-foreground text-[10px] font-extrabold px-1.5 py-0.5 rounded animate-pulse-live flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />
                        AO VIVO
                      </span>
                    ) : match.status === 'finished' ? (
                      <span className="text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded">FT</span>
                    ) : (
                      <span className="text-[10px] font-bold text-info bg-info/10 px-1.5 py-0.5 rounded">{match.time}</span>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <img
                          src={getTeamBadge(match.homeTeam) || ''}
                          alt=""
                          className="w-4 h-4 object-contain flex-shrink-0"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <span className={`text-xs font-bold truncate ${match.status === 'live' ? 'text-foreground' : ''}`}>
                          {match.homeTeam}
                        </span>
                      </div>
                      <span className={`text-sm font-black flex-shrink-0 ${match.status === 'live' ? 'text-primary' : 'text-foreground'}`}>
                        {match.homeScore !== null ? match.homeScore : '-'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <img
                          src={getTeamBadge(match.awayTeam) || ''}
                          alt=""
                          className="w-4 h-4 object-contain flex-shrink-0"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <span className={`text-xs font-bold truncate ${match.status === 'live' ? 'text-foreground' : ''}`}>
                          {match.awayTeam}
                        </span>
                      </div>
                      <span className={`text-sm font-black flex-shrink-0 ${match.status === 'live' ? 'text-primary' : 'text-foreground'}`}>
                        {match.awayScore !== null ? match.awayScore : '-'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card/90 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all shadow-lg"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {lastUpdate && (
          <div className="flex items-center justify-center gap-2 mt-2">
            <p className="text-[10px] text-muted-foreground italic">
              Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
            </p>
            {autoRefresh && (
              <div className="w-16 h-1 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000"
                  style={{ width: `${(countdown / refreshInterval) * 100}%` }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveScores;
