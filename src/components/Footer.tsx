import React from 'react';
import { Flame, MapPin, Clock, Phone, Mail, Instagram, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-obsidian-900 border-t border-gold/30 text-cream pt-16 pb-12 overflow-hidden">
      {/* Background Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-gold/20">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-obsidian-800 border border-gold flex items-center justify-center">
                <Flame className="w-5 h-5 text-ember-500" />
              </div>
              <span className="font-serif font-bold text-2xl tracking-wider text-cream gold-text-gradient">
                MASALA THEATRE
              </span>
            </div>

            <p className="text-xs text-cream/70 leading-relaxed max-w-sm font-sans">
              A flagship culinary performance concept for AURAWEBS portfolio. Reimagining high Indian dining as a 5-Act live gastronomic story featuring charcoal alchemy, stone-ground spices, and Mughal gold-leaf plating.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                className="w-8 h-8 rounded-full bg-obsidian-800 border border-gold/30 flex items-center justify-center text-gold hover:border-gold hover:bg-gold hover:text-obsidian-900 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#mail"
                className="w-8 h-8 rounded-full bg-obsidian-800 border border-gold/30 flex items-center justify-center text-gold hover:border-gold hover:bg-gold hover:text-obsidian-900 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Performance Timings */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-gold uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" /> Performance Times
            </h4>
            <ul className="text-xs space-y-2 text-cream/70 font-mono">
              <li className="flex justify-between border-b border-gold/10 pb-1">
                <span>Act I: Early Dinner</span>
                <span className="text-cream">17:30 - 19:15</span>
              </li>
              <li className="flex justify-between border-b border-gold/10 pb-1">
                <span>Act II: Prime Show</span>
                <span className="text-gold font-bold">19:30 - 21:15</span>
              </li>
              <li className="flex justify-between border-b border-gold/10 pb-1">
                <span>Act III: Late Night</span>
                <span className="text-cream">21:30 - 23:30</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Location */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-sm text-gold uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" /> Theater Stage Location
            </h4>
            <p className="text-xs text-cream/70 font-sans leading-relaxed">
              77 Royal Spice Avenue, Mayfair & Manhattan Culinary District
            </p>
            <p className="text-xs text-gold font-mono flex items-center gap-2 pt-1">
              <Phone className="w-3.5 h-3.5" /> +1 (800) MASALA-THEATRE
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-mono text-cream/50 block mb-1">
                Join The Royal Circle
              </span>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email for VIP invitations"
                  className="px-3 py-1.5 rounded-full bg-obsidian-800 border border-gold/20 text-xs text-cream focus:outline-none focus:border-gold flex-1"
                />
                <button
                  onClick={() => soundEngine.playClick()}
                  className="px-4 py-1.5 rounded-full bg-gold-gradient text-obsidian-900 font-serif font-bold text-xs uppercase"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-cream/50 pt-4">
          <p>© 2026 MASALA THEATRE — All Rights Reserved.</p>
          <div className="flex items-center gap-2 text-gold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Designed & Engineered for AURAWEBS Flagship Portfolio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
