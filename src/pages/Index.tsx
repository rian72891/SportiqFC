import { useState, useMemo } from 'react';
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

type View = 'feed' | 'article' | 'standings';

const Index = () => {
  const [view, setView] = useState<View>('feed');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
          {/* Hero */}
          {heroNews && <HeroNews news={heroNews} onClick={openArticle} />}

          {/* News Section */}
          <div>
            <div className="flex justify-between items-center mb-5 pb-2 border-b-[3px] border-primary">
              <h2 className="text-lg font-extrabold uppercase flex items-center gap-2">
                🔥 Últimas Notícias
              </h2>
              <span className="text-primary text-sm font-semibold">{filteredNews.length} notícias</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {restNews.map((news, i) => (
                <NewsCard key={news.id} news={news} onClick={openArticle} featured={i === 0} />
              ))}
            </div>
          </div>

          {/* Upcoming Games Section */}
          <div>
            <div className="flex justify-between items-center mb-5 pb-2 border-b-[3px] border-primary">
              <h2 className="text-lg font-extrabold uppercase flex items-center gap-2">
                📅 Jogos da Semana
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { home: 'Flamengo', away: 'Palmeiras', league: 'Brasileirão', date: 'Dom, 17:00', status: 'scheduled' },
                { home: 'Real Madrid', away: 'Barcelona', league: 'La Liga', date: 'Sáb, 16:00', status: 'scheduled' },
                { home: 'Lakers', away: 'Celtics', league: 'NBA', date: 'Sex, 21:30', status: 'scheduled' },
                { home: 'Alex Pereira', away: 'Ankalaev', league: 'UFC', date: 'Sáb, 23:00', status: 'scheduled' },
                { home: 'Liverpool', away: 'Arsenal', league: 'Premier League', date: 'Dom, 13:30', status: 'scheduled' },
                { home: 'Inter', away: 'Juventus', league: 'Serie A', date: 'Dom, 15:45', status: 'scheduled' },
              ].map((game, i) => (
                <div key={i} className="bg-card rounded-xl p-4 border border-border hover:border-primary transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{game.league}</span>
                    <span className="text-info text-xs font-bold">{game.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{game.home}</span>
                    <span className="text-xs text-muted-foreground font-bold px-3">VS</span>
                    <span className="font-bold text-sm">{game.away}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Sidebar onArticleClick={openArticle} />
      </main>

      <Footer />

      {/* Back to top */}
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
