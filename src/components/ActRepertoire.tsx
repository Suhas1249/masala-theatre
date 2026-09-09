import React, { useState } from 'react';
import { Utensils, Search, Filter, Flame, Plus, Eye, Award, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface ActRepertoireProps {
  onAddToCart: (item: MenuItem) => void;
  onOpenDishModal: (item: MenuItem) => void;
  onNextAct: () => void;
}

export const ActRepertoire: React.FC<ActRepertoireProps> = ({
  onAddToCart,
  onOpenDishModal,
  onNextAct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [vegetarianOnly, setVegetarianOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const menuItems: MenuItem[] = [
    {
      id: 'm1',
      name: 'Saffron Smoked Lamb Raan',
      hindiName: 'केसरी रान-ए-ख़ास',
      category: 'mains',
      price: 48,
      description: '14-hour charcoal smoked leg of lamb with 24k edible gold leaf, Kashmiri saffron sauce, and pomegranate pearls.',
      ingredients: ['Prime Lamb Shank', 'Kashmiri Saffron', 'Edible 24k Gold', 'Whole Spices'],
      spiceLevel: 3,
      isVegetarian: false,
      isChefSpecial: true,
      image: './images/hero-lamb.jpg',
      pairing: 'Pair with 2018 Barolo or Reserve Saffron Dum Biryani',
    },
    {
      id: 'm2',
      name: 'Velvet Dal Makhani Dum',
      hindiName: 'शाही दाल मखनी',
      category: 'mains',
      price: 28,
      description: 'Slow-simmered black lentils for 18 hours over charcoal with cultured white butter and fresh green cardamom pods.',
      ingredients: ['Black Urad Dal', 'Cultured White Butter', 'Green Elaichi', 'Fenugreek'],
      spiceLevel: 1,
      isVegetarian: true,
      isChefSpecial: true,
      image: './images/dal-makhani.jpg',
      pairing: 'Pair with Truffle Garlic Butter Naan',
    },
    {
      id: 'm3',
      name: 'Charcoal Tandoori Murgh',
      hindiName: 'अंगारी तंदूरी मुर्ग',
      category: 'starters',
      price: 32,
      description: 'Organic spring chicken marinated in hung curd, Kashmiri red chili oil, and roasted cumin seared in 450°C clay oven.',
      ingredients: ['Spring Chicken', 'Hung Yogurt', 'Red Chili Oil', 'Charcoal Smoke'],
      spiceLevel: 4,
      isVegetarian: false,
      isChefSpecial: false,
      image: './images/tandoori-murgh.jpg',
      pairing: 'Pair with Mint Coriander Chutney & Spiced Old Fashioned',
    },
    {
      id: 'm4',
      name: 'Royal Heritage Spice Mortar Gravy',
      hindiName: 'सिलबट्टा पनीर शबनम',
      category: 'mains',
      price: 30,
      description: 'Hand-pressed cottage cheese cubes bathed in stone-ground tomato onion gravy with toasted whole spices.',
      ingredients: ['Artisan Paneer', 'Stone-Ground Tomatoes', 'Star Anise', 'Cashew Cream'],
      spiceLevel: 2,
      isVegetarian: true,
      isChefSpecial: false,
      image: './images/paneer-shabnam.jpg',
      pairing: 'Pair with Laccha Paratha & Saffron Lassi',
    },
    {
      id: 'm5',
      name: 'Truffle & Garlic Butter Naan',
      hindiName: 'ट्रफ़ल लहसुनी नान',
      category: 'biryani',
      price: 12,
      description: 'Hand-stretched tandoori naan brushed with black truffle butter, roasted garlic flakes, and fresh cilantro.',
      ingredients: ['Organic Wheat Flour', 'Black Truffle Butter', 'Garlic Flakes', 'Cilantro'],
      spiceLevel: 1,
      isVegetarian: true,
      isChefSpecial: false,
      image: './images/garlic-naan.jpg',
      pairing: 'Essential accompaniment for Royal Mains',
    },
    {
      id: 'm6',
      name: 'Kesar Pista Shahi Phirni',
      hindiName: 'केसर पिस्ता फिरनी',
      category: 'desserts',
      price: 16,
      description: 'Chilled ground rice pudding cooked with buffalo milk, saffron strands, pistachios, served in handcrafted earthen pots.',
      ingredients: ['Basmati Rice', 'Saffron Strands', 'Pistachios', 'Silver Vark'],
      spiceLevel: 1,
      isVegetarian: true,
      isChefSpecial: true,
      image: './images/shahi-phirni.jpg',
      pairing: 'Pair with Smoked Cardamom Chai',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Performances' },
    { id: 'starters', label: 'Act I: Starters' },
    { id: 'mains', label: 'Act II: Royal Mains' },
    { id: 'biryani', label: 'Act III: Breads & Rice' },
    { id: 'desserts', label: 'Act IV: Sweet Finale' },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesVeg = vegetarianOnly ? item.isVegetarian : true;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesVeg && matchesSearch;
  });

  return (
    <section id="repertoire" className="relative min-h-screen w-full py-24 bg-obsidian-900 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-800 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest">
            <Utensils className="w-4 h-4 text-gold" />
            ACT IV — THE REPERTOIRE (INTERACTIVE MENU)
          </div>

          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-cream">
            EXPLORE THE <span className="gold-text-gradient">REPERTOIRE</span>
          </h2>

          <p className="text-amber-100/90 font-display italic text-lg">
            Discover our curated dishes, each crafted with heritage recipes and modern theatrical flair.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-gold/25 flex flex-wrap items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-full text-xs font-serif uppercase tracking-wider transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gold-gradient text-obsidian-900 font-bold shadow-md'
                    : 'bg-obsidian-800 text-cream/70 hover:text-gold hover:bg-obsidian-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Veg Toggle */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" />
              <input
                type="text"
                placeholder="Search dish or spice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full bg-obsidian-800 border border-gold/20 text-xs text-cream focus:outline-none focus:border-gold"
              />
            </div>

            {/* Veg Toggle */}
            <button
              onClick={() => setVegetarianOnly(!vegetarianOnly)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-2 transition-all ${
                vegetarianOnly
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                  : 'bg-obsidian-800 border-gold/20 text-cream/60 hover:border-gold/40'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Veg Only</span>
            </button>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-2xl border border-gold/20 hover:border-gold/60 p-4 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 shadow-xl"
            >
              <div className="space-y-4">
                {/* Dish Image Preview */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-gold/15">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent opacity-60" />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex items-center gap-2">
                    {item.isChefSpecial && (
                      <span className="px-2 py-0.5 rounded-full bg-obsidian-900/90 border border-gold text-[9px] font-bold text-gold uppercase tracking-wider backdrop-blur-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-gold" /> Chef Special
                      </span>
                    )}
                    {item.isVegetarian && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500 text-[9px] font-bold text-emerald-400 uppercase tracking-wider backdrop-blur-md">
                        Vegetarian
                      </span>
                    )}
                  </div>

                  {/* Quick View Eye Button */}
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      onOpenDishModal(item);
                    }}
                    className="absolute bottom-2 right-2 p-2 rounded-full bg-obsidian-900/90 border border-gold/40 text-gold hover:bg-gold hover:text-obsidian-900 transition-colors shadow-lg"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-mono text-gold/70">{item.hindiName}</p>
                      <h3 className="font-serif font-bold text-lg text-cream group-hover:text-gold transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <span className="font-serif font-bold text-lg text-gold">${item.price}</span>
                  </div>

                  <p className="text-xs text-cream/70 mt-2 line-clamp-2">{item.description}</p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 mt-4 border-t border-gold/15 flex items-center justify-between">
                {/* Spice Level Indicator */}
                <div className="flex items-center gap-1">
                  <span className="text-[10px] uppercase text-cream/50 mr-1 font-mono">Spice:</span>
                  {[...Array(4)].map((_, i) => (
                    <Flame
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < item.spiceLevel ? 'text-ember-500 fill-ember-500' : 'text-obsidian-700'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    onAddToCart(item);
                  }}
                  className="px-4 py-2 rounded-full bg-gold/15 border border-gold/40 text-gold hover:bg-gold hover:text-obsidian-900 font-serif font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add To Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Transition */}
        <div className="text-center pt-8">
          <button
            onClick={() => {
              soundEngine.playClick();
              onNextAct();
            }}
            className="px-8 py-4 rounded-full bg-gold-gradient text-obsidian-900 font-serif font-bold text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-transform"
          >
            Final Act: Book Your Seat (Encore)
          </button>
        </div>
      </div>
    </section>
  );
};
