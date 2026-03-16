import { NewsItem } from '@/data/newsData';
import { Bookmark, Clock, Eye } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
  onClick: (id: string) => void;
  featured?: boolean;
}

const NewsCard = ({ news, onClick, featured }: NewsCardProps) => {
  return (
    <article
      className={`bg-card rounded-xl overflow-hidden cursor-pointer transition-all border border-border hover:-translate-y-1 hover:shadow-red hover:border-primary group ${
        featured ? 'sm:col-span-2' : ''
      }`}
      onClick={() => onClick(news.id)}
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span
          className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase z-10 ${
            news.exclusive
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
              : 'gradient-primary text-primary-foreground'
          }`}
        >
          {news.exclusive ? 'EXCLUSIVO' : news.category}
        </span>
        <button
          className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-primary transition-all z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <Bookmark size={16} />
        </button>
      </div>
      <div className="p-4">
        <span className="text-primary font-extrabold text-xs uppercase tracking-wide mb-1.5 block">
          {news.category}
        </span>
        <h3 className="font-bold text-sm leading-snug text-foreground mb-2 line-clamp-2">
          {news.title}
        </h3>
        <p className="text-muted-foreground text-xs line-clamp-2 mb-3">{news.excerpt}</p>
        <div className="flex justify-between items-center pt-3 border-t border-border">
          <div className="flex gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock size={12} /> {news.time}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={12} /> {news.views}
            </span>
          </div>
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[11px] font-semibold">
            {news.readTime}
          </span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
