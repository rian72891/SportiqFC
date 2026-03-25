import { useState, useMemo, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import CategoryNav from '@/components/CategoryNav';
import LiveScores from '@/components/LiveScores';
import HeroNews from '@/components/HeroNews';
import NewsCard from '@/components/NewsCard';
import Sidebar from '@/components/Sidebar';
import ArticleView from '@/components/ArticleView';
import StandingsView from '@/components/StandingsView';
import MobileMenu from '@/components/MobileMenu';
import SearchOverlay from '@/components/SearchOverlay';
import Footer from '@/components/Footer';
import { newsData } from '@/data/newsData';
import { RefreshCw } from 'lucide-react';

type View = 'feed' | 'article' | 'standings';

interface UpcomingGame {
  id: string;
  home: string;
  away: string;
  league: string;
  date: string;
  commence: string;
  icon: string;
}

const SPORT_ICONS: Record<string, string> = {
  'Brasileirão': '🇧🇷',
  'Champions League': '🏆',
  'Premier League': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'La Liga': '🇪🇸',
  'NBA': '🏀',
  'UFC': '🥊',
};

const UPCOMING_SPORTS = [
  { key: 'soccer_brazil_campeonato', name: 'Brasileirão' },
  { key: 'soccer_epl', name: 'Premier League' },
  { key: 'soccer_spain_la_liga', name: 'La Liga' },
  { key: 'soccer_uefa_champs_league', name: 'Champions League' },
  { key: 'basketball_nba', name: 'NBA' },
  { key: 'mma_mixed_martial_arts', name: 'UFC' },
];

const API_KEY = 'f28768e29f8725ea120da36191ee08fe';

const Index = () => {
  const [view, setView] = useState<View>('feed');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [upcomingGames, setUpcomingGames] = useState<UpcomingGame[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);

  const filteredNews = useMemo(() => {
    if (activeCategory === 'all') return newsData;
    return newsData.filter(
      (n) =>
        n.categorySlug === activeCategory ||
        n.category.toLowerCase().includes(activeCategory)
    );
  }, [activeCategory]);

  const heroNews = filteredNews[0];
  const restNews = filteredNews.slice(1);

  const openArticle = (id: string) => {
    setSelectedArticleId(id);
    setView('article');
    window.scrollTo(0, 0);
  };

  const fetchUpcomingGames = useCallback(async () => {
    setGamesLoading(true);
    try {
      const results = await Promise.allSettled(
        UPCOMING_SPORTS.map(async (sport) => {
          const res = await fetch(
            `https://api.the-odds-api.com/v4/sports/${sport.key}/scores/?apiKey=${API_KEY}&daysFrom=3`
          );
          if (!res.ok) return [];
          const data = await res.json();
          return data
            .filter((g: any) => !g.completed && !g.scores)
            .slice(0, 4)
            .map((g: any) => ({
              id: g.id,
              home: g.home_team,
              away: g.away_team,
              league: sport.name,
              date: new Date(g.commence_time).toLocaleDateString('en-US', {
                weekday: 'short',
                hour: '2-digit',
                minute: '2-digit',
              }),
              commence: g.commence_time,
              icon: SPORT_ICONS[sport.name] || '⚽',
            }));
        })
      );

      const allGames = results
        .filter((r): r is PromiseFulfilledResult<UpcomingGame[]> => r.status === 'fulfilled')
        .flatMap((r) => r.value)
        .sort((a, b) => new Date(a.commence).getTime() - new Date(b.commence).getTime())
        .slice(0, 12);

      setUpcomingGames(allGames);
    } catch {
      // Keep empty
    } finally {
      setGamesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUpcomingGames();
  }, [fetchUpcomingGames]);

  const selectedArticle = newsData.find((n) => n.id === selectedArticleId);

  if (view === 'article' && selectedArticle) {
    return (
      <ArticleView
        article={selectedArticle}
        onBack={() => setView('feed')}
      />
    );
  }

  if (view === 'standings') {
    return <StandingsView onBack={() => setView('feed')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onCategoryChange={(cat) => {
          setActiveCategory(cat);
          setView('feed');
        }}
        onShowTables={() => setView('standings')}
      />

      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onArticleClick={openArticle}
      />

      <Header
        onMenuToggle={() => setMenuOpen(true)}
        onSearchToggle={() => setSearchOpen(true)}
      />

      <LiveScores />

      <CategoryNav
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onShowTables={() => setView('standings')}
      />

      <main className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 px-4 py-6">
        <div className="space-y-8">
          {heroNews && <HeroNews news={heroNews} onClick={openArticle} />}

          <div>
            <div className="flex justify-between items-center mb-5 pb-2 border-b-[3px] border-primary">
              <h2 className="text-lg font-extrabold uppercase flex items-center gap-2">
                🔥 Latest News
              </h2>
              <span className="text-primary text-sm font-semibold">{filteredNews.length} articles</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {restNews.map((news, i) => (
                <NewsCard key={news.id} news={news} onClick={openArticle} featured={i === 0} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-5 pb-2 border-b-[3px] border-primary">
              <h2 className="text-lg font-extrabold uppercase flex items-center gap-2">
                📅 This Week's Games
              </h2>
              <button
                onClick={fetchUpcomingGames}
                className="text-primary text-xs font-semibold flex items-center gap-1 hover:underline"
              >
                <RefreshCw size={12} className={gamesLoading ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
            {gamesLoading && upcomingGames.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <RefreshCw size={16} className="animate-spin mr-2" />
                Loading games...
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {upcomingGames.map((game) => (
                  <div key={game.id} className="bg-card rounded-xl p-4 border border-border hover:border-primary transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                        {game.icon} {game.league}
                      </span>
                      <span className="text-info text-xs font-bold">{game.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm truncate max-w-[40%]">{game.home}</span>
                      <span className="text-xs text-muted-foreground font-bold px-3">VS</span>
                      <span className="font-bold text-sm truncate max-w-[40%] text-right">{game.away}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Sidebar onArticleClick={openArticle} />
      </main>

      <Footer />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full gradient-primary text-primary-foreground flex items-center justify-center shadow-red hover:-translate-y-1 transition-all z-40 text-lg"
      >
        ↑
      </button>
    </div>
  );
};

export default Index;
