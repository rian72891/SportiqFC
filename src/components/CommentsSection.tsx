import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { MessageCircle, Send, Trash2, User } from 'lucide-react';
import { toast } from 'sonner';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profile?: { display_name: string | null; avatar_url: string | null };
}

interface CommentsSectionProps {
  articleId: string;
}

const CommentsSection = ({ articleId }: CommentsSectionProps) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('article_id', articleId)
      .order('created_at', { ascending: false });

    if (data) {
      const userIds = [...new Set(data.map((c) => c.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, display_name, avatar_url')
        .in('user_id', userIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p]));
      const commentsWithProfiles = data.map((c) => ({
        ...c,
        profile: profileMap.get(c.user_id) || null,
      }));
      setComments(commentsWithProfiles as Comment[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Log in to comment');
      return;
    }
    if (!newComment.trim()) return;

    setSubmitting(true);
    const { error } = await supabase.from('comments').insert({
      article_id: articleId,
      user_id: user.id,
      content: newComment.trim(),
    });

    if (error) {
      toast.error('Error posting comment');
    } else {
      setNewComment('');
      toast.success('Comment added!');
      fetchComments();
    }
    setSubmitting(false);
  };

  const handleDelete = async (commentId: string) => {
    const { error } = await supabase.from('comments').delete().eq('id', commentId);
    if (!error) {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      toast.success('Comment deleted');
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <h3 className="text-lg font-extrabold mb-4 flex items-center gap-2">
        <MessageCircle size={20} className="text-primary" />
        Comments ({comments.length})
      </h3>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground shrink-0">
            <User size={16} />
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={user ? 'Write a comment...' : 'Log in to comment'}
              disabled={!user}
              className="w-full bg-background border-2 border-border rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:border-primary outline-none transition-colors min-h-[80px]"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={submitting || !user || !newComment.trim()}
                className="gradient-primary text-primary-foreground px-5 py-2 rounded-full font-bold text-sm flex items-center gap-1.5 hover:-translate-y-0.5 shadow-red transition-all disabled:opacity-50 disabled:hover:translate-y-0"
              >
                <Send size={14} />
                {submitting ? 'Sending...' : 'Comment'}
              </button>
            </div>
          </div>
        </div>
      </form>

      {loading ? (
        <p className="text-muted-foreground text-sm text-center py-4">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-4">
          No comments yet. Be the first!
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 p-3 rounded-xl bg-background border border-border">
              {comment.profile?.avatar_url ? (
                <img src={comment.profile.avatar_url} alt="" className="w-9 h-9 rounded-full shrink-0" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <User size={14} className="text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm">
                    {comment.profile?.display_name || 'User'}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {new Date(comment.created_at).toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  {user?.id === comment.user_id && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
