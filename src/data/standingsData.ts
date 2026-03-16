export interface TeamStanding {
  pos: number;
  name: string;
  pts: number;
  pj: number;
  vit: number;
  emp: number;
  der: number;
  gp: number;
  gc: number;
  sg: number;
}

export const standingsData: Record<string, { name: string; teams: TeamStanding[] }> = {
  brasileirao: {
    name: 'Brasileirão Série A 2026',
    teams: [
      { pos: 1, name: 'Botafogo', pts: 43, pj: 19, vit: 13, emp: 4, der: 2, gp: 35, gc: 15, sg: 20 },
      { pos: 2, name: 'Palmeiras', pts: 40, pj: 19, vit: 12, emp: 4, der: 3, gp: 32, gc: 14, sg: 18 },
      { pos: 3, name: 'Flamengo', pts: 38, pj: 19, vit: 11, emp: 5, der: 3, gp: 30, gc: 16, sg: 14 },
      { pos: 4, name: 'Fortaleza', pts: 36, pj: 19, vit: 10, emp: 6, der: 3, gp: 28, gc: 15, sg: 13 },
      { pos: 5, name: 'São Paulo', pts: 33, pj: 19, vit: 9, emp: 6, der: 4, gp: 25, gc: 18, sg: 7 },
      { pos: 6, name: 'Cruzeiro', pts: 31, pj: 19, vit: 9, emp: 4, der: 6, gp: 27, gc: 20, sg: 7 },
      { pos: 7, name: 'Internacional', pts: 30, pj: 19, vit: 8, emp: 6, der: 5, gp: 24, gc: 19, sg: 5 },
      { pos: 8, name: 'Bahia', pts: 29, pj: 19, vit: 8, emp: 5, der: 6, gp: 22, gc: 20, sg: 2 },
    ],
  },
  premier: {
    name: 'Premier League 2025/26',
    teams: [
      { pos: 1, name: 'Liverpool', pts: 45, pj: 19, vit: 14, emp: 3, der: 2, gp: 42, gc: 15, sg: 27 },
      { pos: 2, name: 'Arsenal', pts: 42, pj: 19, vit: 13, emp: 3, der: 3, gp: 38, gc: 14, sg: 24 },
      { pos: 3, name: 'Manchester City', pts: 39, pj: 19, vit: 12, emp: 3, der: 4, gp: 40, gc: 18, sg: 22 },
      { pos: 4, name: 'Aston Villa', pts: 35, pj: 19, vit: 10, emp: 5, der: 4, gp: 30, gc: 19, sg: 11 },
      { pos: 5, name: 'Tottenham', pts: 33, pj: 19, vit: 10, emp: 3, der: 6, gp: 32, gc: 24, sg: 8 },
      { pos: 6, name: 'Newcastle', pts: 31, pj: 19, vit: 9, emp: 4, der: 6, gp: 28, gc: 22, sg: 6 },
    ],
  },
  laliga: {
    name: 'La Liga 2025/26',
    teams: [
      { pos: 1, name: 'Real Madrid', pts: 46, pj: 19, vit: 15, emp: 1, der: 3, gp: 44, gc: 14, sg: 30 },
      { pos: 2, name: 'Barcelona', pts: 43, pj: 19, vit: 13, emp: 4, der: 2, gp: 48, gc: 18, sg: 30 },
      { pos: 3, name: 'Atletico Madrid', pts: 38, pj: 19, vit: 11, emp: 5, der: 3, gp: 30, gc: 14, sg: 16 },
      { pos: 4, name: 'Athletic Bilbao', pts: 34, pj: 19, vit: 10, emp: 4, der: 5, gp: 26, gc: 18, sg: 8 },
      { pos: 5, name: 'Real Sociedad', pts: 31, pj: 19, vit: 9, emp: 4, der: 6, gp: 24, gc: 20, sg: 4 },
    ],
  },
};
