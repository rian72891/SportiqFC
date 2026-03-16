import { NewsItem } from '@/data/newsData';

interface HeroNewsProps {
  news: NewsItem;
  onClick: (id: string) => void;
}

const HeroNews = ({ news, onClick }: HeroNewsProps) => {
  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-red-lg cursor-pointer hover:-translate-y-1 transition-transform group"
      onClick={() => onClick(news.id)}
    >
      <img
        src={news.image}
        alt={news.title}
        className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <span className="gradient-primary text-primary-foreground px-3 py-1.5 rounded-full font-extrabold text-xs uppercase inline-block mb-3 animate-pulse">
          {news.exclusive ? '🔥 EXCLUSIVO' : news.category}
        </span>
        <h2 className="text-2xl md:text-3xl font-black leading-tight mb-3 text-white drop-shadow-lg">
          {news.title}
        </h2>
        <div className="flex gap-4 text-sm text-gray-300 items-center">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-white">
              {news.author.charAt(0)}
            </div>
            <span className="font-medium">{news.author}</span>
          </div>
          <span>⏰ {news.time}</span>
          <span>👁️ {news.views}</span>
        </div>
      </div>
    </div>
  );
};

export default HeroNews;
