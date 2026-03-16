import { useState } from 'react';
import { Search, Bell, Menu, X, Trophy } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  onSearchToggle: () => void;
}

const Header = ({ onMenuToggle, onSearchToggle }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-card border-b-[3px] border-primary shadow-red">
      {/* Breaking News Bar */}
      <div className="gradient-primary px-4 py-2 text-sm font-semibold flex justify-between items-center text-primary-foreground">
        <div className="flex items-center gap-2">
          <span className="bg-primary-foreground text-primary px-2 py-0.5 rounded text-xs font-extrabold uppercase animate-pulse-live">
            AO VIVO
          </span>
          <span className="text-sm">Últimas notícias do mundo esportivo</span>
        </div>
        <span className="hidden sm:block text-xs opacity-90">
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </span>
      </div>

      {/* Main Header */}
      <div className="flex justify-between items-center px-4 py-3 max-w-[1200px] mx-auto">
        <button
          onClick={onMenuToggle}
          className="w-11 h-11 rounded-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <Menu size={24} />
        </button>

        <a href="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
          <div className="gradient-primary text-primary-foreground w-11 h-11 rounded-xl flex items-center justify-center font-black text-xl shadow-red animate-float">
            <Trophy size={24} />
          </div>
          <div className="font-black text-xl text-foreground">
            Sportiq<span className="text-primary">FC</span>
          </div>
        </a>

        <div className="flex items-center gap-1">
          <button
            onClick={onSearchToggle}
            className="w-11 h-11 rounded-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Search size={20} />
          </button>
          <button className="w-11 h-11 rounded-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>
          <button className="hidden md:flex gradient-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm uppercase shadow-red hover:-translate-y-0.5 transition-all items-center gap-1.5">
            <Trophy size={14} /> Assinar
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
