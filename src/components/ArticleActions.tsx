import { useState, useEffect } from 'react';
import { Heart, Share2, Bookmark } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ArticleActionsProps {
  articleId: string;
}

const ArticleActions = ({ articleId }: ArticleActionsProps) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch like count
    supabase
      .from('likes')
      .select('id', { count: 'exact', head: true })
      .eq('article_id', articleId)
      .then(({ count }) => setLikeCount(count || 0));

    // Check user's like/bookmark status
    if (user) {
      supabase
        .from('likes')
        .select('id')
        .eq('article_id', articleId)
        .eq('user_id', user.id)
        .maybeSingle()
        .then(({ data }) => setLiked(!!data));

      supabase
        .from('bookmarks')
        .select('id')
        .eq('article_id', articleId)
        .eq('user_id', user.id)
        .maybeSingle()
        .then(({ data }) => setBookmarked(!!data));
    }
  }, [articleId, user]);

  const toggleLike = async () => {
    if (!user) {
      toast.error('Faça login para curtir');
      return;
    }
    setLoading(true);
    if (liked) {
      await supabase.from('likes').delete().eq('article_id', articleId).eq('user_id', user.id);
      setLiked(false);
      setLikeCount((p) => p - 1);
    } else {
      await supabase.from('likes').insert({ article_id: articleId, user_id: user.id });
      setLiked(true);
      setLikeCount((p) => p + 1);
    }
    setLoading(false);
  };

  const toggleBookmark = async () => {
    if (!user) {
      toast.error('Faça login para salvar');
      return;
    }
    setLoading(true);
    if (bookmarked) {
      await supabase.from('bookmarks').delete().eq('article_id', articleId).eq('user_id', user.id);
      setBookmarked(false);
      toast.success('Removido dos salvos');
    } else {
      await supabase.from('bookmarks').insert({ article_id: articleId, user_id: user.id });
      setBookmarked(true);
      toast.success('Salvo com sucesso!');
    }
    setLoading(false);
  };

  const handleShare = async () => {
    const url = window.location.origin + '/?article=' + articleId;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'SportiqFC', url });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copiado!');
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={toggleLike}
        disabled={loading}
        className={`px-4 py-2 rounded-full border text-sm font-semibold flex items-center gap-1.5 transition-all ${
          liked
            ? 'bg-primary text-primary-foreground border-primary'
            : 'bg-background border-border hover:bg-primary hover:text-primary-foreground hover:border-primary'
        }`}
      >
        <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
        {likeCount > 0 ? likeCount : 'Curtir'}
      </button>
      <button
        onClick={handleShare}
        className="px-4 py-2 rounded-full bg-background border border-border text-sm font-semibold flex items-center gap-1.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
      >
        <Share2 size={14} /> Compartilhar
      </button>
      <button
        onClick={toggleBookmark}
        disabled={loading}
        className={`px-4 py-2 rounded-full border text-sm font-semibold flex items-center gap-1.5 transition-all ${
          bookmarked
            ? 'bg-primary text-primary-foreground border-primary'
            : 'bg-background border-border hover:bg-primary hover:text-primary-foreground hover:border-primary'
        }`}
      >
        <Bookmark size={14} fill={bookmarked ? 'currentColor' : 'none'} /> Salvar
      </button>
    </div>
  );
};

export default ArticleActions;
