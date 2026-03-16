import { X, Home, Trophy, Star, Shield, Flame } from 'lucide-react';
import { categories } from '@/data/newsData';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryChange: (cat: string) => void;
  onShowTables: () => void;
}

const MobileMenu = ({ isOpen, onClose, onCategoryChange, onShowTables }: MobileMenuProps) => {
  const handleNav = (cat: string) => {
    onCategoryChange(cat);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Menu */}
      <div
        className={`fixed top-0 left-0 w-[85%] max-w-[350px] h-screen bg-card z-[70] transition-transform duration-300 overflow-y-auto shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="gradient-primary p-6 text-primary-foreground relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white text-primary flex items-center justify-center text-2xl font-black">
              <Trophy size={24} />
            </div>
            <div>
              <h3 className="font-extrabold text-lg">SportiqFC</h3>
              <p className="text-sm opacity-90">Esportes em tempo real</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="mb-4">
            <p className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              ⚽ ESPORTES
            </p>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleNav(cat.id)}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-all flex items-center gap-2"
                  >
                    <span>{cat.icon}</span> {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <p className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-2">
              📊 DADOS
            </p>
            <button
              onClick={() => { onShowTables(); onClose(); }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-all"
            >
              📊 Tabelas e Classificações
            </button>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border mt-4">
          <p className="text-xs text-muted-foreground text-center">
            © 2026 SportiqFC. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
