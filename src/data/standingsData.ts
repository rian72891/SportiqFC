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

export interface GroupStanding {
  group: string;
  teams: TeamStanding[];
}

export const standingsData: Record<string, { name: string; teams: TeamStanding[] }> = {
  brasileirao: {
    name: 'Brasileirão Série A 2026',
    teams: [
      { pos: 1, name: 'Palmeiras', pts: 13, pj: 6, vit: 4, emp: 1, der: 1, gp: 11, gc: 5, sg: 6 },
      { pos: 2, name: 'Botafogo', pts: 12, pj: 6, vit: 4, emp: 0, der: 2, gp: 10, gc: 6, sg: 4 },
      { pos: 3, name: 'Flamengo', pts: 11, pj: 6, vit: 3, emp: 2, der: 1, gp: 9, gc: 5, sg: 4 },
      { pos: 4, name: 'Fortaleza', pts: 11, pj: 6, vit: 3, emp: 2, der: 1, gp: 8, gc: 4, sg: 4 },
      { pos: 5, name: 'São Paulo', pts: 10, pj: 6, vit: 3, emp: 1, der: 2, gp: 7, gc: 5, sg: 2 },
      { pos: 6, name: 'Internacional', pts: 10, pj: 6, vit: 3, emp: 1, der: 2, gp: 8, gc: 7, sg: 1 },
      { pos: 7, name: 'Cruzeiro', pts: 9, pj: 6, vit: 2, emp: 3, der: 1, gp: 7, gc: 5, sg: 2 },
      { pos: 8, name: 'Atlético-MG', pts: 9, pj: 6, vit: 2, emp: 3, der: 1, gp: 6, gc: 4, sg: 2 },
      { pos: 9, name: 'Bahia', pts: 8, pj: 6, vit: 2, emp: 2, der: 2, gp: 7, gc: 6, sg: 1 },
      { pos: 10, name: 'Grêmio', pts: 8, pj: 6, vit: 2, emp: 2, der: 2, gp: 6, gc: 6, sg: 0 },
      { pos: 11, name: 'Fluminense', pts: 7, pj: 6, vit: 2, emp: 1, der: 3, gp: 5, gc: 7, sg: -2 },
      { pos: 12, name: 'Corinthians', pts: 7, pj: 6, vit: 2, emp: 1, der: 3, gp: 6, gc: 8, sg: -2 },
      { pos: 13, name: 'Vasco', pts: 7, pj: 6, vit: 2, emp: 1, der: 3, gp: 5, gc: 7, sg: -2 },
      { pos: 14, name: 'Santos', pts: 6, pj: 6, vit: 1, emp: 3, der: 2, gp: 5, gc: 6, sg: -1 },
      { pos: 15, name: 'Athletico-PR', pts: 6, pj: 6, vit: 1, emp: 3, der: 2, gp: 4, gc: 6, sg: -2 },
      { pos: 16, name: 'Bragantino', pts: 5, pj: 6, vit: 1, emp: 2, der: 3, gp: 4, gc: 7, sg: -3 },
      { pos: 17, name: 'Juventude', pts: 5, pj: 6, vit: 1, emp: 2, der: 3, gp: 3, gc: 6, sg: -3 },
      { pos: 18, name: 'Vitória', pts: 4, pj: 6, vit: 1, emp: 1, der: 4, gp: 4, gc: 9, sg: -5 },
      { pos: 19, name: 'Ceará', pts: 3, pj: 6, vit: 0, emp: 3, der: 3, gp: 3, gc: 8, sg: -5 },
      { pos: 20, name: 'Mirassol', pts: 2, pj: 6, vit: 0, emp: 2, der: 4, gp: 2, gc: 9, sg: -7 },
    ],
  },
  premier: {
    name: 'Premier League 2025/26',
    teams: [
      { pos: 1, name: 'Liverpool', pts: 66, pj: 29, vit: 21, emp: 3, der: 5, gp: 61, gc: 24, sg: 37 },
      { pos: 2, name: 'Arsenal', pts: 59, pj: 29, vit: 18, emp: 5, der: 6, gp: 52, gc: 25, sg: 27 },
      { pos: 3, name: 'Nottingham Forest', pts: 56, pj: 29, vit: 17, emp: 5, der: 7, gp: 47, gc: 30, sg: 17 },
      { pos: 4, name: 'Manchester City', pts: 50, pj: 29, vit: 15, emp: 5, der: 9, gp: 55, gc: 34, sg: 21 },
      { pos: 5, name: 'Chelsea', pts: 49, pj: 29, vit: 14, emp: 7, der: 8, gp: 49, gc: 33, sg: 16 },
      { pos: 6, name: 'Aston Villa', pts: 48, pj: 29, vit: 14, emp: 6, der: 9, gp: 42, gc: 35, sg: 7 },
      { pos: 7, name: 'Newcastle', pts: 47, pj: 29, vit: 13, emp: 8, der: 8, gp: 45, gc: 32, sg: 13 },
      { pos: 8, name: 'Bournemouth', pts: 46, pj: 29, vit: 13, emp: 7, der: 9, gp: 43, gc: 34, sg: 9 },
      { pos: 9, name: 'Brighton', pts: 44, pj: 29, vit: 12, emp: 8, der: 9, gp: 42, gc: 37, sg: 5 },
      { pos: 10, name: 'Fulham', pts: 42, pj: 29, vit: 11, emp: 9, der: 9, gp: 38, gc: 35, sg: 3 },
      { pos: 11, name: 'Tottenham', pts: 38, pj: 29, vit: 11, emp: 5, der: 13, gp: 49, gc: 42, sg: 7 },
      { pos: 12, name: 'Manchester United', pts: 37, pj: 29, vit: 10, emp: 7, der: 12, gp: 35, gc: 38, sg: -3 },
      { pos: 13, name: 'Brentford', pts: 36, pj: 29, vit: 10, emp: 6, der: 13, gp: 40, gc: 45, sg: -5 },
      { pos: 14, name: 'West Ham', pts: 35, pj: 29, vit: 9, emp: 8, der: 12, gp: 36, gc: 44, sg: -8 },
      { pos: 15, name: 'Crystal Palace', pts: 33, pj: 29, vit: 8, emp: 9, der: 12, gp: 30, gc: 38, sg: -8 },
      { pos: 16, name: 'Everton', pts: 30, pj: 29, vit: 7, emp: 9, der: 13, gp: 26, gc: 39, sg: -13 },
      { pos: 17, name: 'Wolves', pts: 27, pj: 29, vit: 7, emp: 6, der: 16, gp: 31, gc: 52, sg: -21 },
      { pos: 18, name: 'Ipswich Town', pts: 22, pj: 29, vit: 4, emp: 10, der: 15, gp: 23, gc: 48, sg: -25 },
      { pos: 19, name: 'Leicester', pts: 20, pj: 29, vit: 4, emp: 8, der: 17, gp: 22, gc: 52, sg: -30 },
      { pos: 20, name: 'Southampton', pts: 11, pj: 29, vit: 1, emp: 8, der: 20, gp: 14, gc: 53, sg: -39 },
    ],
  },
  laliga: {
    name: 'La Liga 2025/26',
    teams: [
      { pos: 1, name: 'Barcelona', pts: 63, pj: 28, vit: 20, emp: 3, der: 5, gp: 68, gc: 28, sg: 40 },
      { pos: 2, name: 'Real Madrid', pts: 59, pj: 28, vit: 18, emp: 5, der: 5, gp: 55, gc: 24, sg: 31 },
      { pos: 3, name: 'Atlético Madrid', pts: 58, pj: 28, vit: 17, emp: 7, der: 4, gp: 48, gc: 20, sg: 28 },
      { pos: 4, name: 'Athletic Bilbao', pts: 49, pj: 28, vit: 14, emp: 7, der: 7, gp: 38, gc: 25, sg: 13 },
      { pos: 5, name: 'Villarreal', pts: 46, pj: 28, vit: 13, emp: 7, der: 8, gp: 44, gc: 38, sg: 6 },
      { pos: 6, name: 'Mallorca', pts: 42, pj: 28, vit: 11, emp: 9, der: 8, gp: 28, gc: 26, sg: 2 },
      { pos: 7, name: 'Real Betis', pts: 40, pj: 28, vit: 11, emp: 7, der: 10, gp: 35, gc: 34, sg: 1 },
      { pos: 8, name: 'Real Sociedad', pts: 37, pj: 28, vit: 9, emp: 10, der: 9, gp: 27, gc: 27, sg: 0 },
      { pos: 9, name: 'Osasuna', pts: 37, pj: 28, vit: 10, emp: 7, der: 11, gp: 33, gc: 39, sg: -6 },
      { pos: 10, name: 'Girona', pts: 36, pj: 28, vit: 9, emp: 9, der: 10, gp: 35, gc: 37, sg: -2 },
      { pos: 11, name: 'Celta Vigo', pts: 35, pj: 28, vit: 9, emp: 8, der: 11, gp: 37, gc: 41, sg: -4 },
      { pos: 12, name: 'Sevilla', pts: 34, pj: 28, vit: 8, emp: 10, der: 10, gp: 30, gc: 36, sg: -6 },
      { pos: 13, name: 'Rayo Vallecano', pts: 33, pj: 28, vit: 8, emp: 9, der: 11, gp: 26, gc: 33, sg: -7 },
      { pos: 14, name: 'Getafe', pts: 32, pj: 28, vit: 7, emp: 11, der: 10, gp: 21, gc: 27, sg: -6 },
      { pos: 15, name: 'Espanyol', pts: 31, pj: 28, vit: 7, emp: 10, der: 11, gp: 26, gc: 38, sg: -12 },
      { pos: 16, name: 'Alavés', pts: 30, pj: 28, vit: 7, emp: 9, der: 12, gp: 24, gc: 35, sg: -11 },
      { pos: 17, name: 'Las Palmas', pts: 29, pj: 28, vit: 7, emp: 8, der: 13, gp: 32, gc: 44, sg: -12 },
      { pos: 18, name: 'Leganés', pts: 24, pj: 28, vit: 5, emp: 9, der: 14, gp: 18, gc: 38, sg: -20 },
      { pos: 19, name: 'Valladolid', pts: 20, pj: 28, vit: 3, emp: 11, der: 14, gp: 17, gc: 43, sg: -26 },
      { pos: 20, name: 'Valencia', pts: 19, pj: 28, vit: 4, emp: 7, der: 17, gp: 22, gc: 48, sg: -26 },
    ],
  },
};

// Champions League 2025/26 - League Phase (novo formato com 36 times, top 24 classificam)
export const championsLeagueGroups: GroupStanding[] = [
  {
    group: 'Classificação Geral',
    teams: [
      { pos: 1, name: 'Liverpool', pts: 21, pj: 8, vit: 7, emp: 0, der: 1, gp: 15, gc: 5, sg: 10 },
      { pos: 2, name: 'Barcelona', pts: 19, pj: 8, vit: 6, emp: 1, der: 1, gp: 26, gc: 11, sg: 15 },
      { pos: 3, name: 'Arsenal', pts: 19, pj: 8, vit: 6, emp: 1, der: 1, gp: 14, gc: 4, sg: 10 },
      { pos: 4, name: 'Inter', pts: 19, pj: 8, vit: 6, emp: 1, der: 1, gp: 11, gc: 3, sg: 8 },
      { pos: 5, name: 'Atlético Madrid', pts: 18, pj: 8, vit: 5, emp: 3, der: 0, gp: 16, gc: 8, sg: 8 },
      { pos: 6, name: 'Bayer Leverkusen', pts: 16, pj: 8, vit: 5, emp: 1, der: 2, gp: 13, gc: 7, sg: 6 },
      { pos: 7, name: 'Lille', pts: 16, pj: 8, vit: 5, emp: 1, der: 2, gp: 12, gc: 7, sg: 5 },
      { pos: 8, name: 'Aston Villa', pts: 16, pj: 8, vit: 5, emp: 1, der: 2, gp: 12, gc: 7, sg: 5 },
      { pos: 9, name: 'Atalanta', pts: 14, pj: 8, vit: 4, emp: 2, der: 2, gp: 18, gc: 10, sg: 8 },
      { pos: 10, name: 'B. Dortmund', pts: 14, pj: 8, vit: 4, emp: 2, der: 2, gp: 17, gc: 11, sg: 6 },
      { pos: 11, name: 'Bayern', pts: 14, pj: 8, vit: 4, emp: 2, der: 2, gp: 17, gc: 11, sg: 6 },
      { pos: 12, name: 'Real Madrid', pts: 14, pj: 8, vit: 4, emp: 2, der: 2, gp: 15, gc: 11, sg: 4 },
      { pos: 13, name: 'Milan', pts: 13, pj: 8, vit: 4, emp: 1, der: 3, gp: 13, gc: 9, sg: 4 },
      { pos: 14, name: 'PSV', pts: 13, pj: 8, vit: 4, emp: 1, der: 3, gp: 12, gc: 10, sg: 2 },
      { pos: 15, name: 'PSG', pts: 13, pj: 8, vit: 4, emp: 1, der: 3, gp: 10, gc: 8, sg: 2 },
      { pos: 16, name: 'Benfica', pts: 12, pj: 8, vit: 4, emp: 0, der: 4, gp: 14, gc: 12, sg: 2 },
      { pos: 17, name: 'Monaco', pts: 12, pj: 8, vit: 4, emp: 0, der: 4, gp: 13, gc: 11, sg: 2 },
      { pos: 18, name: 'Brest', pts: 12, pj: 8, vit: 4, emp: 0, der: 4, gp: 10, gc: 10, sg: 0 },
      { pos: 19, name: 'Feyenoord', pts: 12, pj: 8, vit: 4, emp: 0, der: 4, gp: 14, gc: 16, sg: -2 },
      { pos: 20, name: 'Juventus', pts: 11, pj: 8, vit: 3, emp: 2, der: 3, gp: 9, gc: 8, sg: 1 },
      { pos: 21, name: 'Celtic', pts: 11, pj: 8, vit: 3, emp: 2, der: 3, gp: 11, gc: 12, sg: -1 },
      { pos: 22, name: 'Manchester City', pts: 11, pj: 8, vit: 3, emp: 2, der: 3, gp: 15, gc: 14, sg: 1 },
      { pos: 23, name: 'Sporting', pts: 10, pj: 8, vit: 3, emp: 1, der: 4, gp: 12, gc: 12, sg: 0 },
      { pos: 24, name: 'Club Brugge', pts: 10, pj: 8, vit: 3, emp: 1, der: 4, gp: 7, gc: 10, sg: -3 },
      { pos: 25, name: 'Dinamo Zagreb', pts: 9, pj: 8, vit: 3, emp: 0, der: 5, gp: 10, gc: 18, sg: -8 },
      { pos: 26, name: 'Stuttgart', pts: 8, pj: 8, vit: 2, emp: 2, der: 4, gp: 10, gc: 14, sg: -4 },
      { pos: 27, name: 'Shakhtar', pts: 7, pj: 8, vit: 2, emp: 1, der: 5, gp: 7, gc: 13, sg: -6 },
      { pos: 28, name: 'Bologna', pts: 5, pj: 8, vit: 1, emp: 2, der: 5, gp: 4, gc: 10, sg: -6 },
      { pos: 29, name: 'Sparta Praha', pts: 5, pj: 8, vit: 1, emp: 2, der: 5, gp: 7, gc: 19, sg: -12 },
      { pos: 30, name: 'RB Leipzig', pts: 4, pj: 8, vit: 1, emp: 1, der: 6, gp: 8, gc: 14, sg: -6 },
      { pos: 31, name: 'Girona', pts: 4, pj: 8, vit: 1, emp: 1, der: 6, gp: 5, gc: 14, sg: -9 },
      { pos: 32, name: 'Red Star', pts: 4, pj: 8, vit: 1, emp: 1, der: 6, gp: 10, gc: 22, sg: -12 },
      { pos: 33, name: 'Salzburg', pts: 3, pj: 8, vit: 1, emp: 0, der: 7, gp: 4, gc: 22, sg: -18 },
      { pos: 34, name: 'Sturm Graz', pts: 3, pj: 8, vit: 1, emp: 0, der: 7, gp: 5, gc: 14, sg: -9 },
      { pos: 35, name: 'Young Boys', pts: 2, pj: 8, vit: 0, emp: 2, der: 6, gp: 6, gc: 19, sg: -13 },
      { pos: 36, name: 'Slovan Bratislava', pts: 0, pj: 8, vit: 0, emp: 0, der: 8, gp: 5, gc: 24, sg: -19 },
    ],
  },
];

// Libertadores 2026 - Fase de Grupos
export const libertadoresGroups: GroupStanding[] = [
  {
    group: 'Grupo A',
    teams: [
      { pos: 1, name: 'Palmeiras', pts: 13, pj: 6, vit: 4, emp: 1, der: 1, gp: 10, gc: 4, sg: 6 },
      { pos: 2, name: 'Bolívar', pts: 9, pj: 6, vit: 3, emp: 0, der: 3, gp: 7, gc: 8, sg: -1 },
      { pos: 3, name: 'Ind. del Valle', pts: 7, pj: 6, vit: 2, emp: 1, der: 3, gp: 5, gc: 7, sg: -2 },
      { pos: 4, name: 'San Lorenzo', pts: 5, pj: 6, vit: 1, emp: 2, der: 3, gp: 4, gc: 7, sg: -3 },
    ],
  },
  {
    group: 'Grupo B',
    teams: [
      { pos: 1, name: 'Flamengo', pts: 15, pj: 6, vit: 5, emp: 0, der: 1, gp: 14, gc: 5, sg: 9 },
      { pos: 2, name: 'Peñarol', pts: 10, pj: 6, vit: 3, emp: 1, der: 2, gp: 8, gc: 7, sg: 1 },
      { pos: 3, name: 'Millonarios', pts: 6, pj: 6, vit: 2, emp: 0, der: 4, gp: 5, gc: 9, sg: -4 },
      { pos: 4, name: 'Rosario Central', pts: 4, pj: 6, vit: 1, emp: 1, der: 4, gp: 4, gc: 10, sg: -6 },
    ],
  },
  {
    group: 'Grupo C',
    teams: [
      { pos: 1, name: 'River Plate', pts: 16, pj: 6, vit: 5, emp: 1, der: 0, gp: 13, gc: 3, sg: 10 },
      { pos: 2, name: 'Atlético-MG', pts: 10, pj: 6, vit: 3, emp: 1, der: 2, gp: 9, gc: 6, sg: 3 },
      { pos: 3, name: 'Nacional-URU', pts: 6, pj: 6, vit: 2, emp: 0, der: 4, gp: 5, gc: 10, sg: -5 },
      { pos: 4, name: 'Alianza Lima', pts: 3, pj: 6, vit: 1, emp: 0, der: 5, gp: 3, gc: 11, sg: -8 },
    ],
  },
  {
    group: 'Grupo D',
    teams: [
      { pos: 1, name: 'Botafogo', pts: 14, pj: 6, vit: 4, emp: 2, der: 0, gp: 11, gc: 3, sg: 8 },
      { pos: 2, name: 'Boca Juniors', pts: 10, pj: 6, vit: 3, emp: 1, der: 2, gp: 7, gc: 6, sg: 1 },
      { pos: 3, name: 'Dep. Cali', pts: 7, pj: 6, vit: 2, emp: 1, der: 3, gp: 6, gc: 8, sg: -2 },
      { pos: 4, name: 'Caracas', pts: 2, pj: 6, vit: 0, emp: 2, der: 4, gp: 3, gc: 10, sg: -7 },
    ],
  },
  {
    group: 'Grupo E',
    teams: [
      { pos: 1, name: 'Fluminense', pts: 12, pj: 6, vit: 4, emp: 0, der: 2, gp: 10, gc: 6, sg: 4 },
      { pos: 2, name: 'Cerro Porteño', pts: 9, pj: 6, vit: 3, emp: 0, der: 3, gp: 7, gc: 7, sg: 0 },
      { pos: 3, name: 'Colo-Colo', pts: 8, pj: 6, vit: 2, emp: 2, der: 2, gp: 6, gc: 6, sg: 0 },
      { pos: 4, name: 'Monagas', pts: 5, pj: 6, vit: 1, emp: 2, der: 3, gp: 4, gc: 8, sg: -4 },
    ],
  },
  {
    group: 'Grupo F',
    teams: [
      { pos: 1, name: 'São Paulo', pts: 13, pj: 6, vit: 4, emp: 1, der: 1, gp: 9, gc: 4, sg: 5 },
      { pos: 2, name: 'Univ. Católica', pts: 8, pj: 6, vit: 2, emp: 2, der: 2, gp: 6, gc: 6, sg: 0 },
      { pos: 3, name: 'Barcelona-EQU', pts: 7, pj: 6, vit: 2, emp: 1, der: 3, gp: 5, gc: 7, sg: -2 },
      { pos: 4, name: 'Sporting Cristal', pts: 6, pj: 6, vit: 1, emp: 3, der: 2, gp: 5, gc: 8, sg: -3 },
    ],
  },
  {
    group: 'Grupo G',
    teams: [
      { pos: 1, name: 'Grêmio', pts: 11, pj: 6, vit: 3, emp: 2, der: 1, gp: 8, gc: 5, sg: 3 },
      { pos: 2, name: 'Estudiantes', pts: 10, pj: 6, vit: 3, emp: 1, der: 2, gp: 7, gc: 5, sg: 2 },
      { pos: 3, name: 'The Strongest', pts: 7, pj: 6, vit: 2, emp: 1, der: 3, gp: 6, gc: 7, sg: -1 },
      { pos: 4, name: 'Huachipato', pts: 5, pj: 6, vit: 1, emp: 2, der: 3, gp: 3, gc: 7, sg: -4 },
    ],
  },
  {
    group: 'Grupo H',
    teams: [
      { pos: 1, name: 'Internacional', pts: 14, pj: 6, vit: 4, emp: 2, der: 0, gp: 12, gc: 4, sg: 8 },
      { pos: 2, name: 'Olimpia', pts: 9, pj: 6, vit: 3, emp: 0, der: 3, gp: 7, gc: 8, sg: -1 },
      { pos: 3, name: 'Dep. Táchira', pts: 6, pj: 6, vit: 2, emp: 0, der: 4, gp: 4, gc: 9, sg: -5 },
      { pos: 4, name: 'Always Ready', pts: 4, pj: 6, vit: 1, emp: 1, der: 4, gp: 3, gc: 5, sg: -2 },
    ],
  },
];
