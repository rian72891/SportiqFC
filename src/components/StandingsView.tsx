import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, RefreshCw, Trophy, Shield } from 'lucide-react';
import { standingsData, championsLeagueGroups, libertadoresGroups, TeamStanding, GroupStanding } from '@/data/standingsData';

interface StandingsViewProps {
  onBack: () => void;
}

interface ApiStanding {
  team: { name: string };
  points: number;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  position: number;
}

const FOOTBALL_DATA_LEAGUES: Record<string, { code: string; name: string }> = {
  brasileirao: { code: 'BSA', name: 'Brasileirão Série A 2026' },
  premier: { code: 'PL', name: 'Premier League 2025/26' },
  laliga: { code: 'PD', name: 'La Liga 2025/26' },
};

const ZONE_CONFIG: Record<string, { libertadores: number; preLib: number; rebaixamento: number }> = {
  brasileirao: { libertadores: 4, preLib: 6, rebaixamento: 17 },
  premier: { libertadores: 4, preLib: 6, rebaixamento: 18 },
  laliga: { libertadores: 4, preLib: 6, rebaixamento: 18 },
};

const StandingsTable = ({ teams, zoneConfig, showZones = true }: { teams: TeamStanding[]; zoneConfig?: { libertadores: number; preLib: number; rebaixamento: number }; showZones?: boolean }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-background text-muted-foreground text-xs font-bold">
          <th className="p-3 text-center w-12">POS</th>
          <th className="p-3 text-left">TIME</th>
          <th className="p-3 text-center">PTS</th>
          <th className="p-3 text-center">PJ</th>
          <th className="p-3 text-center hidden sm:table-cell">V</th>
          <th className="p-3 text-center hidden sm:table-cell">E</th>
          <th className="p-3 text-center hidden sm:table-cell">D</th>
          <th className="p-3 text-center hidden md:table-cell">GP</th>
          <th className="p-3 text-center hidden md:table-cell">GC</th>
          <th className="p-3 text-center">SG</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team) => {
          let posClass = '';
          if (showZones && zoneConfig) {
            if (team.pos <= zoneConfig.libertadores) posClass = 'bg-success/20 text-success';
            else if (team.pos <= zoneConfig.preLib) posClass = 'bg-warning/20 text-warning';
            else if (team.pos >= zoneConfig.rebaixamento) posClass = 'bg-destructive/20 text-destructive';
          }

          return (
            <tr key={`${team.name}-${team.pos}`} className="border-b border-border hover:bg-background/50 transition-colors">
              <td className="p-3 text-center">
                <span className={`w-7 h-7 rounded-full inline-flex items-center justify-center font-extrabold text-xs ${posClass}`}>
                  {team.pos}
                </span>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-[10px] font-bold text-white">
                    {team.name.charAt(0)}
                  </div>
                  <span className="font-bold text-sm">{team.name}</span>
                </div>
              </td>
              <td className="p-3 text-center font-extrabold text-primary">{team.pts}</td>
              <td className="p-3 text-center text-sm">{team.pj}</td>
              <td className="p-3 text-center text-sm hidden sm:table-cell">{team.vit}</td>
              <td className="p-3 text-center text-sm hidden sm:table-cell">{team.emp}</td>
              <td className="p-3 text-center text-sm hidden sm:table-cell">{team.der}</td>
              <td className="p-3 text-center text-sm hidden md:table-cell">{team.gp}</td>
              <td className="p-3 text-center text-sm hidden md:table-cell">{team.gc}</td>
              <td className="p-3 text-center text-sm font-bold">
                {team.sg > 0 ? `+${team.sg}` : team.sg}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const StandingsView = ({ onBack }: StandingsViewProps) => {
  const [active, setActive] = useState('brasileirao');
  const [apiData, setApiData] = useState<Record<string, TeamStanding[]>>({});
  const [loading, setLoading] = useState(false);
  const [usingApi, setUsingApi] = useState(false);

  const isGroupCompetition = active === 'champions' || active === 'libertadores';
  const staticData = standingsData[active];

  const tabs = [
    { id: 'brasileirao', label: '🇧🇷 Brasileirão', icon: '🇧🇷' },
    { id: 'premier', label: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { id: 'laliga', label: '🇪🇸 La Liga', icon: '🇪🇸' },
    { id: 'champions', label: '🏆 Champions', icon: '🏆' },
    { id: 'libertadores', label: '🏆 Libertadores', icon: '🏆' },
  ];

  const fetchStandings = useCallback(async (leagueId: string) => {
    const league = FOOTBALL_DATA_LEAGUES[leagueId];
    if (!league) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.football-data.org/v4/competitions/${league.code}/standings`,
        { headers: { 'X-Auth-Token': '7f8b9c2e1d3a4f5e6b7c8d9e0f1a2b3c' } }
      );
      if (res.ok) {
        const data = await res.json();
        const standings: TeamStanding[] = data.standings[0].table.map((row: ApiStanding) => ({
          pos: row.position, name: row.team.name, pts: row.points, pj: row.playedGames,
          vit: row.won, emp: row.draw, der: row.lost, gp: row.goalsFor, gc: row.goalsAgainst, sg: row.goalDifference,
        }));
        setApiData((prev) => ({ ...prev, [leagueId]: standings }));
        setUsingApi(true);
      }
    } catch {
      setUsingApi(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isGroupCompetition) fetchStandings(active);
  }, [active, fetchStandings, isGroupCompetition]);

  const teams = apiData[active] || staticData?.teams || [];
  const leagueName = isGroupCompetition
    ? active === 'champions' ? 'Champions League 2025/26' : 'Libertadores 2026'
    : staticData?.name || '';

  const groups: GroupStanding[] = active === 'champions' ? championsLeagueGroups : active === 'libertadores' ? libertadoresGroups : [];

  return (
    <div className="min-h-screen bg-background animate-in fade-in duration-300 pb-12">
      <div className="max-w-[1200px] mx-auto px-4 pt-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-black">Tabelas e Classificações</h1>
          {!isGroupCompetition && (
            <button onClick={() => fetchStandings(active)} className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-primary border border-primary rounded-full px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-all">
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              Atualizar
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActive(tab.id); setUsingApi(false); }}
              className={`px-4 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all border-2 text-sm ${
                active === tab.id
                  ? 'gradient-primary text-primary-foreground border-primary'
                  : 'bg-card text-foreground border-border hover:border-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Champions / Libertadores - ESPN/TNT style */}
        {isGroupCompetition && (
          <div className="space-y-6 mt-4">
            {/* Header */}
            <div className="bg-card rounded-2xl overflow-hidden border border-border">
              <div className={`p-5 flex items-center gap-3 ${active === 'champions' ? 'bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900' : 'bg-gradient-to-r from-green-900 via-green-800 to-green-900'} text-white`}>
                <Trophy size={28} />
                <div>
                  <h2 className="text-xl font-extrabold">{leagueName}</h2>
                  <p className="text-xs opacity-80">
                    {active === 'champions' ? 'League Phase - Classificação Final' : 'Fase de Grupos - Classificação'}
                  </p>
                </div>
              </div>
            </div>

            {active === 'champions' ? (
              /* Champions League - Single table with zone markers */
              <div className="bg-card rounded-2xl overflow-hidden border border-border">
                <div className="p-4 bg-background border-b border-border flex items-center gap-2">
                  <Shield size={16} className="text-primary" />
                  <span className="font-bold text-sm">Classificação Geral - League Phase</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-background text-muted-foreground text-xs font-bold">
                        <th className="p-3 text-center w-12">POS</th>
                        <th className="p-3 text-left">TIME</th>
                        <th className="p-3 text-center">PTS</th>
                        <th className="p-3 text-center">PJ</th>
                        <th className="p-3 text-center hidden sm:table-cell">V</th>
                        <th className="p-3 text-center hidden sm:table-cell">E</th>
                        <th className="p-3 text-center hidden sm:table-cell">D</th>
                        <th className="p-3 text-center hidden md:table-cell">GP</th>
                        <th className="p-3 text-center hidden md:table-cell">GC</th>
                        <th className="p-3 text-center">SG</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groups[0]?.teams.map((team) => {
                        let posClass = '';
                        let borderClass = '';
                        if (team.pos <= 8) { posClass = 'bg-blue-500/20 text-blue-400'; }
                        else if (team.pos <= 24) { posClass = 'bg-sky-500/20 text-sky-400'; }
                        else { posClass = 'bg-destructive/20 text-destructive'; }

                        // Divider lines at positions 8 and 24
                        if (team.pos === 8 || team.pos === 24) borderClass = 'border-b-2 border-primary';

                        return (
                          <tr key={team.name} className={`border-b border-border hover:bg-background/50 transition-colors ${borderClass}`}>
                            <td className="p-2.5 text-center">
                              <span className={`w-7 h-7 rounded-full inline-flex items-center justify-center font-extrabold text-xs ${posClass}`}>
                                {team.pos}
                              </span>
                            </td>
                            <td className="p-2.5">
                              <span className="font-bold text-sm">{team.name}</span>
                            </td>
                            <td className="p-2.5 text-center font-extrabold text-primary">{team.pts}</td>
                            <td className="p-2.5 text-center text-sm">{team.pj}</td>
                            <td className="p-2.5 text-center text-sm hidden sm:table-cell">{team.vit}</td>
                            <td className="p-2.5 text-center text-sm hidden sm:table-cell">{team.emp}</td>
                            <td className="p-2.5 text-center text-sm hidden sm:table-cell">{team.der}</td>
                            <td className="p-2.5 text-center text-sm hidden md:table-cell">{team.gp}</td>
                            <td className="p-2.5 text-center text-sm hidden md:table-cell">{team.gc}</td>
                            <td className="p-2.5 text-center text-sm font-bold">{team.sg > 0 ? `+${team.sg}` : team.sg}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="p-3 bg-background flex gap-6 justify-center flex-wrap text-xs">
                  <span><span className="text-blue-400">●</span> Classificação direta (1º-8º)</span>
                  <span><span className="text-sky-400">●</span> Playoffs (9º-24º)</span>
                  <span><span className="text-destructive">●</span> Eliminado (25º-36º)</span>
                </div>
              </div>
            ) : (
              /* Libertadores - Group by group, ESPN style */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groups.map((group) => (
                  <div key={group.group} className="bg-card rounded-xl overflow-hidden border border-border">
                    <div className="bg-gradient-to-r from-green-800 to-green-700 text-white px-4 py-2.5 flex items-center gap-2">
                      <Shield size={14} />
                      <span className="font-extrabold text-sm">{group.group}</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-background text-muted-foreground text-[10px] font-bold">
                            <th className="p-2 text-center w-8">#</th>
                            <th className="p-2 text-left">TIME</th>
                            <th className="p-2 text-center">PTS</th>
                            <th className="p-2 text-center">PJ</th>
                            <th className="p-2 text-center">V</th>
                            <th className="p-2 text-center">E</th>
                            <th className="p-2 text-center">D</th>
                            <th className="p-2 text-center">SG</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.teams.map((team) => {
                            const posClass = team.pos <= 2 ? 'bg-success/20 text-success' : 'bg-muted/30 text-muted-foreground';
                            return (
                              <tr key={team.name} className="border-b border-border hover:bg-background/50 transition-colors">
                                <td className="p-2 text-center">
                                  <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-extrabold text-[10px] ${posClass}`}>
                                    {team.pos}
                                  </span>
                                </td>
                                <td className="p-2">
                                  <span className="font-bold text-xs">{team.name}</span>
                                </td>
                                <td className="p-2 text-center font-extrabold text-primary text-xs">{team.pts}</td>
                                <td className="p-2 text-center text-xs">{team.pj}</td>
                                <td className="p-2 text-center text-xs">{team.vit}</td>
                                <td className="p-2 text-center text-xs">{team.emp}</td>
                                <td className="p-2 text-center text-xs">{team.der}</td>
                                <td className="p-2 text-center text-xs font-bold">{team.sg > 0 ? `+${team.sg}` : team.sg}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {active === 'libertadores' && (
              <div className="p-3 bg-card rounded-xl border border-border flex gap-6 justify-center flex-wrap text-xs">
                <span><span className="text-success">●</span> Classificado para oitavas</span>
                <span><span className="text-muted-foreground">●</span> Eliminado</span>
              </div>
            )}
          </div>
        )}

        {/* Regular league table */}
        {!isGroupCompetition && teams.length > 0 && (
          <div className="bg-card rounded-2xl overflow-hidden border border-border mt-4">
            <div className="gradient-primary text-primary-foreground p-5 flex justify-between items-center">
              <h2 className="text-xl font-extrabold">{leagueName}</h2>
              <div className="flex items-center gap-2">
                {usingApi && (
                  <span className="text-[10px] bg-primary-foreground/20 px-2 py-0.5 rounded-full">📡 API ao vivo</span>
                )}
                <span className="text-sm opacity-90">Atualizado 17/03/2026</span>
              </div>
            </div>
            <StandingsTable teams={teams} zoneConfig={ZONE_CONFIG[active]} />
            <div className="p-3 bg-background flex gap-6 justify-center flex-wrap text-xs">
              <span><span className="text-success">●</span> Libertadores/Champions</span>
              <span><span className="text-warning">●</span> Pré-Libertadores/Europa League</span>
              <span><span className="text-destructive">●</span> Rebaixamento</span>
            </div>
          </div>
        )}

        {loading && teams.length === 0 && !isGroupCompetition && (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <RefreshCw size={20} className="animate-spin mr-2" />
            Carregando classificação...
          </div>
        )}
      </div>
    </div>
  );
};

export default StandingsView;
