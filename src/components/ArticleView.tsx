import { NewsItem } from '@/data/newsData';
import { ArrowLeft, Heart, Share2, Bookmark, Clock, Eye } from 'lucide-react';

interface ArticleViewProps {
  article: NewsItem;
  onBack: () => void;
}

const ArticleView = ({ article, onBack }: ArticleViewProps) => {
  return (
    <div className="min-h-screen bg-background animate-in fade-in duration-300">
      {/* Back button */}
      <button
        onClick={onBack}
        className="fixed top-4 left-4 z-50 w-11 h-11 rounded-full bg-black/80 backdrop-blur text-white flex items-center justify-center hover:bg-primary transition-all border border-white/10"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Hero Image */}
      <div className="relative">
        <img src={article.image} alt={article.title} className="w-full h-[400px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Article Content */}
      <div className="max-w-[800px] mx-auto -mt-24 relative z-10 bg-card rounded-t-2xl">
        <div className="p-6 md:p-8">
          <span className="text-primary font-extrabold text-sm uppercase mb-3 inline-block">
            {article.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-black leading-tight mb-6">{article.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 items-center pb-6 border-b border-border mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-lg font-bold text-white">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-sm">{article.author}</p>
                <p className="text-muted-foreground text-xs">{article.time}</p>
              </div>
            </div>
            <div className="flex gap-2 ml-auto">
              <button className="px-4 py-2 rounded-full bg-background border border-border text-sm font-semibold flex items-center gap-1.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <Heart size={14} /> Curtir
              </button>
              <button className="px-4 py-2 rounded-full bg-background border border-border text-sm font-semibold flex items-center gap-1.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <Share2 size={14} /> Compartilhar
              </button>
              <button className="px-4 py-2 rounded-full bg-background border border-border text-sm font-semibold flex items-center gap-1.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <Bookmark size={14} /> Salvar
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 mb-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Clock size={14} /> {article.readTime} de leitura</span>
            <span className="flex items-center gap-1"><Eye size={14} /> {article.views} visualizações</span>
          </div>

          {/* Body */}
          <div
            className="prose prose-invert max-w-none text-foreground leading-relaxed
            [&>p]:mb-6 [&>p]:text-base [&>p]:leading-relaxed
            [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:bg-card [&>blockquote]:p-4 [&>blockquote]:rounded-r-lg [&>blockquote]:my-6 [&>blockquote]:italic [&>blockquote]:text-muted-foreground
            [&>h2]:text-xl [&>h2]:font-extrabold [&>h2]:mt-8 [&>h2]:mb-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
            {['Futebol', 'Esportes', article.category, 'Notícias'].map((tag) => (
              <span
                key={tag}
                className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
