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
      { pos: 9, name: 'Atlético-MG', pts: 28, pj: 19, vit: 8, emp: 4, der: 7, gp: 26, gc: 23, sg: 3 },
      { pos: 10, name: 'Grêmio', pts: 27, pj: 19, vit: 7, emp: 6, der: 6, gp: 22, gc: 21, sg: 1 },
      { pos: 11, name: 'Fluminense', pts: 26, pj: 19, vit: 7, emp: 5, der: 7, gp: 20, gc: 22, sg: -2 },
      { pos: 12, name: 'Vasco', pts: 25, pj: 19, vit: 7, emp: 4, der: 8, gp: 21, gc: 24, sg: -3 },
      { pos: 13, name: 'Corinthians', pts: 24, pj: 19, vit: 6, emp: 6, der: 7, gp: 19, gc: 22, sg: -3 },
      { pos: 14, name: 'Athletico-PR', pts: 23, pj: 19, vit: 6, emp: 5, der: 8, gp: 18, gc: 23, sg: -5 },
      { pos: 15, name: 'Santos', pts: 22, pj: 19, vit: 6, emp: 4, der: 9, gp: 20, gc: 26, sg: -6 },
      { pos: 16, name: 'Bragantino', pts: 21, pj: 19, vit: 5, emp: 6, der: 8, gp: 17, gc: 24, sg: -7 },
      { pos: 17, name: 'Juventude', pts: 19, pj: 19, vit: 5, emp: 4, der: 10, gp: 15, gc: 27, sg: -12 },
      { pos: 18, name: 'Cuiabá', pts: 17, pj: 19, vit: 4, emp: 5, der: 10, gp: 14, gc: 28, sg: -14 },
      { pos: 19, name: 'Vitória', pts: 15, pj: 19, vit: 3, emp: 6, der: 10, gp: 13, gc: 29, sg: -16 },
      { pos: 20, name: 'Criciúma', pts: 13, pj: 19, vit: 3, emp: 4, der: 12, gp: 12, gc: 32, sg: -20 },
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
      { pos: 7, name: 'Chelsea', pts: 30, pj: 19, vit: 8, emp: 6, der: 5, gp: 27, gc: 20, sg: 7 },
      { pos: 8, name: 'Manchester United', pts: 28, pj: 19, vit: 8, emp: 4, der: 7, gp: 25, gc: 23, sg: 2 },
      { pos: 9, name: 'Brighton', pts: 27, pj: 19, vit: 7, emp: 6, der: 6, gp: 24, gc: 22, sg: 2 },
      { pos: 10, name: 'West Ham', pts: 26, pj: 19, vit: 7, emp: 5, der: 7, gp: 22, gc: 24, sg: -2 },
      { pos: 11, name: 'Bournemouth', pts: 25, pj: 19, vit: 7, emp: 4, der: 8, gp: 23, gc: 26, sg: -3 },
      { pos: 12, name: 'Fulham', pts: 24, pj: 19, vit: 6, emp: 6, der: 7, gp: 20, gc: 23, sg: -3 },
      { pos: 13, name: 'Crystal Palace', pts: 23, pj: 19, vit: 6, emp: 5, der: 8, gp: 19, gc: 25, sg: -6 },
      { pos: 14, name: 'Wolves', pts: 22, pj: 19, vit: 6, emp: 4, der: 9, gp: 18, gc: 27, sg: -9 },
      { pos: 15, name: 'Brentford', pts: 21, pj: 19, vit: 5, emp: 6, der: 8, gp: 21, gc: 28, sg: -7 },
      { pos: 16, name: 'Nottingham Forest', pts: 20, pj: 19, vit: 5, emp: 5, der: 9, gp: 17, gc: 26, sg: -9 },
      { pos: 17, name: 'Everton', pts: 19, pj: 19, vit: 5, emp: 4, der: 10, gp: 16, gc: 28, sg: -12 },
      { pos: 18, name: 'Leicester', pts: 17, pj: 19, vit: 4, emp: 5, der: 10, gp: 15, gc: 30, sg: -15 },
      { pos: 19, name: 'Ipswich Town', pts: 14, pj: 19, vit: 3, emp: 5, der: 11, gp: 13, gc: 31, sg: -18 },
      { pos: 20, name: 'Southampton', pts: 11, pj: 19, vit: 2, emp: 5, der: 12, gp: 11, gc: 35, sg: -24 },
    ],
  },
  laliga: {
    name: 'La Liga 2025/26',
    teams: [
      { pos: 1, name: 'Real Madrid', pts: 46, pj: 19, vit: 15, emp: 1, der: 3, gp: 44, gc: 14, sg: 30 },
      { pos: 2, name: 'Barcelona', pts: 43, pj: 19, vit: 13, emp: 4, der: 2, gp: 48, gc: 18, sg: 30 },
      { pos: 3, name: 'Atlético Madrid', pts: 38, pj: 19, vit: 11, emp: 5, der: 3, gp: 30, gc: 14, sg: 16 },
      { pos: 4, name: 'Athletic Bilbao', pts: 34, pj: 19, vit: 10, emp: 4, der: 5, gp: 26, gc: 18, sg: 8 },
      { pos: 5, name: 'Real Sociedad', pts: 31, pj: 19, vit: 9, emp: 4, der: 6, gp: 24, gc: 20, sg: 4 },
      { pos: 6, name: 'Villarreal', pts: 30, pj: 19, vit: 8, emp: 6, der: 5, gp: 27, gc: 21, sg: 6 },
      { pos: 7, name: 'Real Betis', pts: 29, pj: 19, vit: 8, emp: 5, der: 6, gp: 23, gc: 20, sg: 3 },
      { pos: 8, name: 'Girona', pts: 28, pj: 19, vit: 8, emp: 4, der: 7, gp: 25, gc: 23, sg: 2 },
      { pos: 9, name: 'Sevilla', pts: 27, pj: 19, vit: 7, emp: 6, der: 6, gp: 22, gc: 22, sg: 0 },
      { pos: 10, name: 'Celta Vigo', pts: 25, pj: 19, vit: 7, emp: 4, der: 8, gp: 21, gc: 25, sg: -4 },
      { pos: 11, name: 'Osasuna', pts: 24, pj: 19, vit: 6, emp: 6, der: 7, gp: 19, gc: 22, sg: -3 },
      { pos: 12, name: 'Rayo Vallecano', pts: 23, pj: 19, vit: 6, emp: 5, der: 8, gp: 18, gc: 24, sg: -6 },
      { pos: 13, name: 'Mallorca', pts: 22, pj: 19, vit: 6, emp: 4, der: 9, gp: 16, gc: 23, sg: -7 },
      { pos: 14, name: 'Getafe', pts: 21, pj: 19, vit: 5, emp: 6, der: 8, gp: 14, gc: 21, sg: -7 },
      { pos: 15, name: 'Las Palmas', pts: 20, pj: 19, vit: 5, emp: 5, der: 9, gp: 17, gc: 26, sg: -9 },
      { pos: 16, name: 'Espanyol', pts: 19, pj: 19, vit: 5, emp: 4, der: 10, gp: 15, gc: 27, sg: -12 },
      { pos: 17, name: 'Alavés', pts: 18, pj: 19, vit: 4, emp: 6, der: 9, gp: 14, gc: 25, sg: -11 },
      { pos: 18, name: 'Valencia', pts: 16, pj: 19, vit: 4, emp: 4, der: 11, gp: 15, gc: 30, sg: -15 },
      { pos: 19, name: 'Valladolid', pts: 14, pj: 19, vit: 3, emp: 5, der: 11, gp: 12, gc: 29, sg: -17 },
      { pos: 20, name: 'Cádiz', pts: 11, pj: 19, vit: 2, emp: 5, der: 12, gp: 10, gc: 33, sg: -23 },
    ],
  },
};
