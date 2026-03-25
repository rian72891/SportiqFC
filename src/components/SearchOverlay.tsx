import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { newsData } from '@/data/newsData';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onArticleClick: (id: string) => void;
}

const SearchOverlay = ({ isOpen, onClose, onArticleClick }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');

  const results = query.length > 2
    ? newsData.filter(
        (n) =>
          n.title.toLowerCase().includes(query.toLowerCase()) ||
          n.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[80] flex items-start justify-center pt-20">
      <div className="w-full max-w-[600px] px-4">
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news..."
              className="w-full pl-11 pr-4 py-4 bg-card border-2 border-border rounded-full text-foreground text-sm outline-none focus:border-primary transition-colors"
              autoFocus
            />
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {results.length > 0 && (
          <div className="bg-card rounded-xl border border-border max-h-[60vh] overflow-y-auto">
            {results.map((news) => (
              <div
                key={news.id}
                className="p-4 border-b border-border last:border-0 cursor-pointer hover:bg-background transition-colors"
                onClick={() => { onArticleClick(news.id); onClose(); }}
              >
                <span className="text-primary text-xs font-bold uppercase">{news.category}</span>
                <p className="font-bold text-sm mt-1">{news.title}</p>
              </div>
            ))}
          </div>
        )}

        {query.length > 2 && results.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-lg mb-1">😔</p>
            <p className="text-sm">No results for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
