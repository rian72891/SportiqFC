import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { lovable } from '@/integrations/lovable/index';
import { LogIn, LogOut, User } from 'lucide-react';

const AuthButton = () => {
  const { user, profile, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth('google', {
        redirect_uri: window.location.origin,
      });
      if (error) console.error('Login error:', error);
    } catch (e) {
      console.error('Login error:', e);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-2">
        {profile?.avatar_url ? (
          <img src={profile.avatar_url} alt="" className="w-8 h-8 rounded-full border-2 border-primary" />
        ) : (
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
            <User size={14} />
          </div>
        )}
        <span className="hidden md:block text-xs font-semibold truncate max-w-[80px]">
          {profile?.display_name || user.email?.split('@')[0]}
        </span>
        <button
          onClick={signOut}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
          title="Sair"
        >
          <LogOut size={16} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className="flex items-center gap-1.5 gradient-primary text-primary-foreground px-3 py-2 rounded-full font-bold text-xs uppercase shadow-red hover:-translate-y-0.5 transition-all disabled:opacity-50"
    >
      <LogIn size={14} />
      {loading ? '...' : 'Entrar'}
    </button>
  );
};

export default AuthButton;
