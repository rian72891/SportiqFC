import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Wifi } from 'lucide-react';

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

const SPORT_KEYS = [
  'soccer_brazil_campeonato',
  'soccer_uefa_champs_league',
  'soccer_epl',
  'soccer_spain_la_liga',
  'basketball_nba',
  'mma_mixed_martial_arts',
];

const SPORT_NAMES: Record<string, string> = {
  'soccer_brazil_campeonato': 'Brasileirão',
  'soccer_uefa_champs_league': 'Champions League',
  'soccer_epl': 'Premier League',
  'soccer_spain_la_liga': 'La Liga',
  'basketball_nba': 'NBA',
  'mma_mixed_martial_arts': 'UFC',
};

const API_KEY = 'f28768e29f8725ea120da36191ee08fe';

const LiveScores = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchScores = useCallback(async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled(
        SPORT_KEYS.map(async (sport) => {
          const res = await fetch(
            `https://api.the-odds-api.com/v4/sports/${sport}/scores/?apiKey=${API_KEY}&daysFrom=1`
          );
          if (!res.ok) return [];
          const data = await res.json();
          return data.map((game: any) => ({
            id: game.id,
            sport: SPORT_NAMES[sport] || sport,
            league: SPORT_NAMES[sport] || sport,
            homeTeam: game.home_team,
            awayTeam: game.away_team,
            homeScore: game.scores?.find((s: any) => s.name === game.home_team)?.score ?? null,
            awayScore: game.scores?.find((s: any) => s.name === game.away_team)?.score ?? null,
            status: game.completed ? 'finished' : game.scores ? 'live' : 'scheduled',
            time: game.completed ? 'FT' : game.scores ? 'AO VIVO' : new Date(game.commence_time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            commence: game.commence_time,
          }));
        })
      );

      const allMatches = results
        .filter((r): r is PromiseFulfilledResult<Match[]> => r.status === 'fulfilled')
        .flatMap((r) => r.value)
        .sort((a, b) => {
          if (a.status === 'live' && b.status !== 'live') return -1;
          if (a.status !== 'live' && b.status === 'live') return 1;
          return new Date(a.commence).getTime() - new Date(b.commence).getTime();
        });

      setMatches(allMatches.slice(0, 20));
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error fetching scores:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchScores]);

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-[1200px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚽</span>
            <span className="font-extrabold text-sm uppercase">Placares Ao Vivo</span>
            <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-bold">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-live" />
              Tempo Real
            </div>
          </div>
          <button
            onClick={() => fetchScores()}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary border border-primary rounded-full px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            Atualizar
          </button>
        </div>

        {loading && matches.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <RefreshCw size={20} className="animate-spin mr-2" />
            Carregando placares...
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground text-sm">
            Nenhum jogo encontrado no momento
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {matches.map((match) => (
              <div
                key={match.id}
                className="flex-shrink-0 bg-secondary rounded-xl p-3 min-w-[220px] border border-border hover:border-primary transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">
                    {match.league}
                  </span>
                  {match.status === 'live' ? (
                    <span className="bg-primary text-primary-foreground text-[10px] font-extrabold px-1.5 py-0.5 rounded animate-pulse-live">
                      AO VIVO
                    </span>
                  ) : match.status === 'finished' ? (
                    <span className="text-[10px] font-bold text-muted-foreground">FT</span>
                  ) : (
                    <span className="text-[10px] font-bold text-info">{match.time}</span>
                  )}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate max-w-[130px]">{match.homeTeam}</span>
                    <span className="text-sm font-black text-foreground">
                      {match.homeScore !== null ? match.homeScore : '-'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate max-w-[130px]">{match.awayTeam}</span>
                    <span className="text-sm font-black text-foreground">
                      {match.awayScore !== null ? match.awayScore : '-'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {lastUpdate && (
          <p className="text-center text-[10px] text-muted-foreground mt-2 italic">
            Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
          </p>
        )}
      </div>
    </div>
  );
};

export default LiveScores;
