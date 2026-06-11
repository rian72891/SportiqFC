import { useState } from 'react';
import { newsData } from '@/data/newsData';
import { TrendingUp, Mail, Share2, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface SidebarProps {
  onArticleClick: (id: string) => void;
}

const Sidebar = ({ onArticleClick }: SidebarProps) => {
  const trending = newsData.slice(0, 5);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    const trimmed = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      toast({ title: 'Invalid email', description: 'Please enter a valid email address.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', { body: { email: trimmed } });
      if (error) throw error;
      toast({
        title: 'Subscribed! 🎉',
        description: data?.emailSent ? 'Check your inbox for a welcome email.' : "You're on the list. We'll be in touch soon!",
      });
      setEmail('');
    } catch (e) {
      toast({ title: 'Something went wrong', description: 'Please try again in a moment.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="flex flex-col gap-6">
      {/* Trending */}
      <div className="bg-card rounded-xl p-5 border border-border">
        <h3 className="text-lg font-extrabold mb-4 pb-2 border-b-2 border-primary flex items-center gap-2">
          <TrendingUp size={18} className="text-primary" /> Trending
        </h3>
        <ul className="space-y-4">
          {trending.map((news, i) => (
            <li
              key={news.id}
              className="flex gap-3 cursor-pointer p-2 rounded-lg hover:bg-background transition-colors"
              onClick={() => onArticleClick(news.id)}
            >
              <span className="text-2xl font-black text-primary/50 min-w-[30px]">
                {i + 1}
              </span>
              <div>
                <p className="font-bold text-sm leading-tight mb-1 line-clamp-2">{news.title}</p>
                <span className="text-xs text-muted-foreground">{news.time} · {news.views}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter */}
      <div className="bg-card rounded-xl p-5 border border-border">
        <h3 className="text-lg font-extrabold mb-4 pb-2 border-b-2 border-primary flex items-center gap-2">
          <Mail size={18} className="text-primary" /> Newsletter
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          Get the best news delivered straight to your inbox!
        </p>
        <div className="space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && handleSubscribe()}
            disabled={loading}
            placeholder="Your best email"
            className="w-full px-4 py-3 bg-background border-2 border-border rounded-lg text-sm text-foreground outline-none focus:border-primary transition-colors disabled:opacity-60"
          />
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full gradient-primary text-primary-foreground py-3 rounded-lg font-bold text-sm uppercase hover:-translate-y-0.5 hover:shadow-red transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <><Loader2 size={14} className="animate-spin" /> Subscribing...</> : 'Subscribe'}
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground text-center mt-2">
          No spam. Unsubscribe anytime.
        </p>
      </div>

      {/* Social */}
      <div className="bg-card rounded-xl p-5 border border-border">
        <h3 className="text-lg font-extrabold mb-4 pb-2 border-b-2 border-primary flex items-center gap-2">
          <Share2 size={18} className="text-primary" /> Social Media
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Facebook', color: 'bg-[#1877F2]', icon: 'f' },
            { name: 'Twitter', color: 'bg-[#1DA1F2]', icon: '𝕏' },
            { name: 'Instagram', color: 'bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]', icon: '📸' },
            { name: 'YouTube', color: 'bg-primary', icon: '▶' },
          ].map((s) => (
            <a
              key={s.name}
              href="#"
              className={`${s.color} text-white rounded-lg py-2.5 px-3 text-center font-semibold text-sm hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5`}
            >
              <span>{s.icon}</span> {s.name}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
