import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const API_KEY = Deno.env.get("ODDS_API_KEY");
    if (!API_KEY) {
      console.warn("ODDS_API_KEY not configured, returning empty matches");
      return new Response(JSON.stringify({ matches: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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
          homeScore: game.scores?.find((s: any) => s.name === game.home_team)?.score != null
            ? parseInt(game.scores.find((s: any) => s.name === game.home_team).score)
            : null,
          awayScore: game.scores?.find((s: any) => s.name === game.away_team)?.score != null
            ? parseInt(game.scores.find((s: any) => s.name === game.away_team).score)
            : null,
          status: game.completed ? 'finished' : game.scores ? 'live' : 'scheduled',
          time: game.completed
            ? 'FT'
            : game.scores
              ? 'LIVE'
              : new Date(game.commence_time).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
          commence: game.commence_time,
        }));
      })
    );

    const allMatches = results
      .filter((r): r is PromiseFulfilledResult<any[]> => r.status === 'fulfilled')
      .flatMap((r) => r.value)
      .sort((a, b) => {
        if (a.status === 'live' && b.status !== 'live') return -1;
        if (a.status !== 'live' && b.status === 'live') return 1;
        if (a.status === 'finished' && b.status === 'scheduled') return -1;
        if (a.status === 'scheduled' && b.status === 'finished') return 1;
        return new Date(a.commence).getTime() - new Date(b.commence).getTime();
      });

    return new Response(JSON.stringify({ matches: allMatches }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error fetching scores:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ matches: [], error: errorMessage }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
