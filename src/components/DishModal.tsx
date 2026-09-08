import React from 'react';
import { X, Flame, Sparkles, ShoppingBag, Award, HeartHandshake } from 'lucide-react';
import { MenuItem } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface DishModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
}

export const DishModal: React.FC<DishModalProps> = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-obsidian-900/80 backdrop-blur-md animate-fade-in"
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-2xl bg-obsidian-900 border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-obsidian-800 text-cream/70 hover:text-gold hover:bg-obsidian-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-gold/20">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent opacity-60" />

          <div className="absolute top-4 left-4 bg-obsidian-900/90 border border-gold px-3 py-1 rounded-full text-xs font-bold text-gold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            Culinary Feature
          </div>
        </div>

        {/* Header Details */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-gold/80">{item.hindiName}</p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream gold-text-gradient">
                {item.name}
              </h3>
            </div>
            <span className="font-serif font-bold text-2xl text-gold">${item.price}</span>
          </div>

          <p className="text-sm text-cream/80 mt-3 leading-relaxed font-sans">
            {item.description}
          </p>
        </div>

        {/* Ingredients & Pairings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-panel p-4 rounded-xl border border-gold/20 space-y-2">
            <span className="text-[10px] uppercase font-bold text-gold tracking-widest flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Key Ingredients
            </span>
            <div className="flex flex-wrap gap-1.5">
              {item.ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-full bg-obsidian-800 border border-gold/20 text-[11px] text-cream/90"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-gold/20 space-y-2">
            <span className="text-[10px] uppercase font-bold text-ember-400 tracking-widest flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5" /> Chef's Sommelier Pairing
            </span>
            <p className="text-xs text-amber-100 font-serif italic">{item.pairing}</p>
          </div>
        </div>

        {/* Spice Rating */}
        <div className="flex items-center justify-between pt-2 border-t border-gold/20">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono text-cream/60">Spice Profile:</span>
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <Flame
                  key={i}
                  className={`w-4 h-4 ${
                    i < item.spiceLevel ? 'text-ember-500 fill-ember-500' : 'text-obsidian-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onAddToCart(item);
              onClose();
            }}
            className="px-6 py-3 rounded-full bg-gold-gradient text-obsidian-900 font-serif font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add To Performance Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};
