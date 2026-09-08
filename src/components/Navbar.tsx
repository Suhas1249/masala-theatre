import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ShoppingBag, Calendar, Flame } from 'lucide-react';
import { ActType } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface NavbarProps {
  activeAct: ActType;
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onNavigateAct: (act: ActType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeAct,
  cartCount,
  onOpenCart,
  onOpenReservation,
  onNavigateAct,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [muted, setMuted] = useState(soundEngine.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const isMuted = soundEngine.toggleMute();
    setMuted(isMuted);
  };

  const acts: { id: ActType; label: string; number: string }[] = [
    { id: 'overture', label: 'Overture', number: '0' },
    { id: 'fire', label: 'I. Fire', number: '1' },
    { id: 'spice', label: 'II. Spice', number: '2' },
    { id: 'journey', label: 'III. Journey', number: '3' },
    { id: 'repertoire', label: 'IV. Repertoire', number: '4' },
    { id: 'encore', label: 'Encore', number: '5' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-obsidian-900/90 backdrop-blur-md py-3 border-b border-gold/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigateAct('overture')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-9 h-9 rounded-full bg-obsidian-800 border border-gold/50 flex items-center justify-center group-hover:border-gold transition-colors">
            <Flame className="w-5 h-5 text-ember-500 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <span className="block font-serif font-bold text-lg tracking-wider text-cream gold-text-gradient">
              MASALA THEATRE
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-gold/70">
              Indian Culinary Performance
            </span>
          </div>
        </button>

        {/* Act Navigation Tracker (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-obsidian-800/80 px-3 py-1.5 rounded-full border border-gold/20 backdrop-blur-sm">
          {acts.map((act) => {
            const isActive = activeAct === act.id;
            return (
              <button
                key={act.id}
                onClick={() => {
                  soundEngine.playClick();
                  onNavigateAct(act.id);
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-ember-700 to-amber-600 text-cream shadow-[0_0_15px_rgba(230,57,70,0.5)] font-bold'
                    : 'text-cream/60 hover:text-gold hover:bg-white/5'
                }`}
              >
                {act.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Audio Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-full bg-obsidian-800/80 border border-gold/30 text-gold hover:border-gold hover:bg-obsidian-700 transition-all"
            title={muted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {muted ? <VolumeX className="w-4 h-4 text-ember-400" /> : <Volume2 className="w-4 h-4 text-gold" />}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full bg-obsidian-800/80 border border-gold/30 text-gold hover:border-gold hover:bg-obsidian-700 transition-all"
            aria-label="Order Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-ember-600 text-cream text-[10px] font-bold flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Reservation CTA */}
          <button
            onClick={onOpenReservation}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold-dark via-gold to-amber-500 text-obsidian-900 font-serif font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] hover:scale-105 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reserve Seat</span>
          </button>
        </div>
      </div>
    </header>
  );
};
