import React, { useState } from 'react';
import { Sparkles, Plus, Check, ShoppingBag, ArrowRight, Flame } from 'lucide-react';
import { SpiceOption, UnlockedDish, MenuItem } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface ActSpiceProps {
  onNextAct: () => void;
  onAddToCart: (item: MenuItem) => void;
}

export const ActSpice: React.FC<ActSpiceProps> = ({ onNextAct, onAddToCart }) => {
  const [selectedSpices, setSelectedSpices] = useState<string[]>(['saffron', 'cardamom']);

  const spices: SpiceOption[] = [
    {
      id: 'chili',
      name: 'Kashmiri Red Chili',
      hindiName: 'लाल मिर्च',
      icon: '🌶️',
      color: '#E63946',
      flavorNote: 'Smoky Heat & Vibrant Crimson Color',
      intensity: 8,
    },
    {
      id: 'cardamom',
      name: 'Green Elaichi',
      hindiName: 'छोटी इलायची',
      icon: '🌿',
      color: '#60A905',
      flavorNote: 'Fragrant Citrus & Botanical Sweetness',
      intensity: 5,
    },
    {
      id: 'saffron',
      name: 'Royal Saffron (Kesar)',
      hindiName: 'केसर',
      icon: '⭐',
      color: '#FFD700',
      flavorNote: 'Honeyed Earthiness & Golden Hue',
      intensity: 9,
    },
    {
      id: 'star-anise',
      name: 'Star Anise (Badiyan)',
      hindiName: 'चक्र फूल',
      icon: '🌸',
      color: '#D4AF37',
      flavorNote: 'Warm Aniseed & Aromatic Mystery',
      intensity: 6,
    },
    {
      id: 'cumin',
      name: 'Bhuna Cumin (Jeera)',
      hindiName: 'भुना जीरा',
      icon: '🌾',
      color: '#FFA500',
      flavorNote: 'Nutty Warmth & Smoky Earth',
      intensity: 4,
    },
    {
      id: 'clove',
      name: 'Laung (Cloves)',
      hindiName: 'लौंग',
      icon: '🌺',
      color: '#C41E3A',
      flavorNote: 'Pungent Aroma & Deep Heat',
      intensity: 7,
    },
  ];

  const toggleSpice = (id: string) => {
    soundEngine.playSpiceUnlock();
    setSelectedSpices((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one spice
        return prev.filter((s) => s !== id);
      }
      return [...prev, id];
    });
  };

  // Determine Unlocked Dish Based on Selected Spices
  const getUnlockedDish = (): UnlockedDish => {
    const hasSaffron = selectedSpices.includes('saffron');
    const hasChili = selectedSpices.includes('chili');
    const hasCardamom = selectedSpices.includes('cardamom');

    if (hasSaffron && hasChili) {
      return {
        name: 'Saffron Smoked Royal Lamb Raan',
        tagline: 'SMOKY · ROYAL · INTENSE',
        description: 'Leg of lamb braised over charcoal with Kashmir red chili oil and 24k gold saffron infusion.',
        price: 48,
        image: '/images/hero-lamb.jpg',
        spicesUsed: ['Royal Saffron', 'Kashmiri Red Chili'],
        flavorProfile: 'Vibrant, smoky fire balanced by honeyed saffron elegance.',
      };
    } else if (hasCardamom) {
      return {
        name: 'Velvet Dal Makhani & Cardamom Dum',
        tagline: 'CREAMY · BOTANICAL · COMFORT',
        description: 'Black lentils slow-cooked for 18 hours with cultured butter and crushed cardamom pod oil.',
        price: 28,
        image: '/images/dal-makhani.jpg',
        spicesUsed: ['Green Elaichi', 'Bhuna Cumin'],
        flavorProfile: 'Silky smooth velvet with a uplifting herbal aroma.',
      };
    } else {
      return {
        name: 'Royal Spice Mortar Curry',
        tagline: 'AROMATIC · EARTHY · BOLD',
        description: 'Hand-ground spices in stone mortar cooked with artisan heritage gravy.',
        price: 36,
        image: '/images/spice-mortar.jpg',
        spicesUsed: selectedSpices.map((s) => spices.find((item) => item.id === s)?.name || s),
        flavorProfile: 'Custom blended by your spice selection.',
      };
    }
  };

  const unlockedDish = getUnlockedDish();

  const handleAddUnlockedToCart = () => {
    soundEngine.playClick();
    const menuItem: MenuItem = {
      id: `custom-${selectedSpices.join('-')}`,
      name: unlockedDish.name,
      hindiName: 'शाही मसाला व्यंजन',
      category: 'mains',
      price: unlockedDish.price,
      description: unlockedDish.description,
      ingredients: unlockedDish.spicesUsed,
      spiceLevel: selectedSpices.length > 3 ? 4 : 2,
      isVegetarian: !unlockedDish.name.includes('Lamb'),
      isChefSpecial: true,
      image: unlockedDish.image,
      pairing: 'Pair with Saffron Garlic Naan & Aged Basmati Dum',
    };
    onAddToCart(menuItem);
  };

  return (
    <section id="spice" className="relative min-h-screen w-full py-24 flex items-center justify-center bg-obsidian-900 border-t border-gold/20 overflow-hidden">
      {/* Background Graphic Pattern */}
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-800 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-gold" />
            ACT II — SPICE & ALCHEMY
          </div>

          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-cream">
            "EVERY SPICE <span className="gold-text-gradient">CHANGES</span> THE STORY."
          </h2>

          <p className="text-amber-100/90 font-display italic text-lg">
            Tap and combine spices in the alchemy wheel below to blend your custom flavor profile and unlock signature dishes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Spice Selection Wheel / Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {spices.map((spice) => {
                const isSelected = selectedSpices.includes(spice.id);
                return (
                  <button
                    key={spice.id}
                    onClick={() => toggleSpice(spice.id)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 relative group ${
                      isSelected
                        ? 'bg-obsidian-800 border-gold shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-[1.02]'
                        : 'bg-obsidian-800/40 border-gold/15 hover:border-gold/40 hover:bg-obsidian-800/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{spice.icon}</span>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs transition-colors ${
                          isSelected
                            ? 'bg-gold border-gold text-obsidian-900 font-bold'
                            : 'border-gold/30 text-transparent group-hover:border-gold'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-cream group-hover:text-gold transition-colors">
                      {spice.name}
                    </h4>
                    <p className="text-[10px] font-mono text-gold/70">{spice.hindiName}</p>
                    <p className="text-xs text-cream/60 mt-2 line-clamp-2">{spice.flavorNote}</p>
                  </button>
                );
              })}
            </div>

            {/* Current Active Blend Summary */}
            <div className="glass-panel p-4 rounded-xl border border-gold/30 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                  Active Spice Alchemy Blend ({selectedSpices.length} Selected)
                </span>
                <p className="text-xs text-cream/80 font-mono mt-0.5">
                  {selectedSpices
                    .map((id) => spices.find((s) => s.id === id)?.name)
                    .join(' + ')}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-widest text-ember-400 font-bold">
                  Flavor Result
                </span>
                <p className="text-sm font-serif font-bold text-cream gold-text-gradient">
                  {unlockedDish.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Unlocked Culinary Dish Display */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel p-6 rounded-3xl border border-gold/40 shadow-2xl space-y-5">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-gold/20">
                <img
                  src={unlockedDish.image}
                  alt={unlockedDish.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-obsidian-900/90 border border-gold px-3 py-1 rounded-full text-[10px] font-bold text-gold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  Unlocked Dish
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-gold font-mono font-semibold">
                  {unlockedDish.tagline}
                </p>
                <h3 className="font-serif text-2xl font-bold text-cream mt-1">
                  {unlockedDish.name}
                </h3>
                <p className="text-xs text-cream/70 mt-2 leading-relaxed">
                  {unlockedDish.description}
                </p>
              </div>

              <div className="pt-2 border-t border-gold/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-cream/50">Experience Price</span>
                  <p className="text-2xl font-serif font-bold text-gold">${unlockedDish.price}</p>
                </div>

                <button
                  onClick={handleAddUnlockedToCart}
                  className="px-6 py-3 rounded-full bg-gold-gradient text-obsidian-900 font-serif font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Order</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Transition */}
        <div className="text-center pt-6">
          <button
            onClick={() => {
              soundEngine.playClick();
              onNextAct();
            }}
            className="px-6 py-3 rounded-full bg-obsidian-800 border border-gold/40 text-cream font-serif text-xs uppercase tracking-widest hover:border-gold hover:bg-white/5 transition-all inline-flex items-center gap-2"
          >
            <span>Proceed to Act III: The Journey ("The Dish")</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </button>
        </div>
      </div>
    </section>
  );
};
