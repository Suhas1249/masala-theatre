import React, { useState } from 'react';
import { Compass, Flame, ArrowRight, Sparkles, Award } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface ActJourneyProps {
  onNextAct: () => void;
}

export const ActJourney: React.FC<ActJourneyProps> = ({ onNextAct }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      stage: '01',
      title: 'FARM & TERROIR',
      subtitle: 'Himalayan Organic Soil',
      description: 'Our black lentils (Urad Dal) and Kashmiri red peppers are cultivated in high-altitude organic soil fed by Himalayan glacial streams.',
      image: '/images/spice-mortar.jpg',
      technique: 'Biodynamic Glacial Soil Cultivation',
      sensory: 'Earthy, minerals, crisp alpine air',
    },
    {
      stage: '02',
      title: 'ROYAL HARVEST',
      subtitle: 'Sun-Drying & Sorting',
      description: 'Each spice pod is hand-picked at dawn to maximize essential oils before being sun-dried on organic jute mats.',
      image: '/images/spice-mortar.jpg',
      technique: 'Dawn Selection & Solar Curing',
      sensory: 'Bright solar warmth, citrus peel notes',
    },
    {
      stage: '03',
      title: 'STONE MORTAR GRINDING',
      subtitle: 'Cold-Pressed Spice Milling',
      description: 'Spices are never high-speed pulverized. We grind in hand-carved granite mortars to avoid thermal oil destruction.',
      image: '/images/spice-mortar.jpg',
      technique: 'Slow Granite Mortar Friction',
      sensory: 'Aromatic essential oil release, nutty pungency',
    },
    {
      stage: '04',
      title: 'TANDOOR CHARCOAL SEAR',
      subtitle: 'Kashmiri Charcoal Embers',
      description: 'Ingredients are seared at 450°C over hardwood charcoal and dried coconut husks to impart clean natural smoke.',
      image: '/images/tandoor-fire.jpg',
      technique: '450°C Clay Oven Searing',
      sensory: 'Charred smokiness, caramelized sugars',
    },
    {
      stage: '05',
      title: '18-HOUR DUM COOKING',
      subtitle: 'Sealed Copper Handi Simmer',
      description: 'Sealed with dough (Dum), the dish simmers overnight over low coal embers, allowing flavors to fuse into velvet perfection.',
      image: '/images/dal-makhani.jpg',
      technique: 'Dough-Sealed Sub-Boil Simmer',
      sensory: 'Velvety cream, deep Umami, rich butter',
    },
    {
      stage: '06',
      title: '24K GOLD PLATING',
      subtitle: 'Mughal Culinary Artistry',
      description: 'Plated on hand-hammered obsidian stoneware, adorned with edible 24k gold leaf, pomegranate pearls, and fresh cilantro microgreens.',
      image: '/images/hero-lamb.jpg',
      technique: 'Edible Gold Foil & Microgreen Dressing',
      sensory: 'Luxurious gold shimmer, crisp fresh herb contrast',
    },
  ];

  const current = steps[activeStep];

  const handleSelectStep = (idx: number) => {
    soundEngine.playClick();
    setActiveStep(idx);
  };

  return (
    <section id="journey" className="relative min-h-screen w-full py-24 flex flex-col justify-between bg-obsidian-900 border-t border-gold/20 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/10 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-800 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest">
            <Compass className="w-4 h-4 text-gold" />
            ACT III — THE DISH ("ONE MEAL, ONE JOURNEY")
          </div>

          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-cream">
            THE PHYSICAL <span className="gold-text-gradient">JOURNEY</span> OF A DISH
          </h2>

          <p className="text-amber-100/90 font-display italic text-lg">
            Follow the physical transformation of raw Himalayan ingredients as they travel from farm to flame to gold-rimmed plate.
          </p>
        </div>

        {/* Step Progress Line */}
        <div className="relative flex items-center justify-between max-w-4xl mx-auto px-4 overflow-x-auto pb-4">
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-gold/20 z-0 hidden md:block" />

          {steps.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={s.stage}
                onClick={() => handleSelectStep(idx)}
                className={`relative z-10 flex flex-col items-center gap-2 group transition-all duration-300 ${
                  isActive ? 'scale-110' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-xs border transition-all ${
                    isActive
                      ? 'bg-gold border-gold text-obsidian-900 shadow-[0_0_20px_rgba(212,175,55,0.6)]'
                      : 'bg-obsidian-800 border-gold/40 text-cream group-hover:border-gold'
                  }`}
                >
                  {s.stage}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-cream/90 hidden sm:block">
                  {s.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Step Showcase Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Left Visual Image */}
          <div className="lg:col-span-6 relative">
            <div className="glass-panel p-3 rounded-3xl border border-gold/40 shadow-2xl overflow-hidden group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent opacity-60" />

                <div className="absolute top-4 left-4 bg-obsidian-900/90 border border-gold px-3 py-1 rounded-full text-xs font-serif font-bold text-gold flex items-center gap-1.5 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  Stage {current.stage} of 06
                </div>
              </div>
            </div>
          </div>

          {/* Right Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-ember-400 font-bold">
                {current.subtitle}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-cream gold-text-gradient">
                {current.title}
              </h3>
            </div>

            <p className="text-sm text-cream/80 leading-relaxed font-sans">
              {current.description}
            </p>

            {/* Technique & Sensory Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="glass-panel p-4 rounded-xl border border-gold/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gold tracking-widest flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> Culinary Craft
                </span>
                <p className="text-xs font-semibold text-cream">{current.technique}</p>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-gold/20 space-y-1">
                <span className="text-[10px] uppercase font-bold text-ember-400 tracking-widest flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" /> Sensory Profile
                </span>
                <p className="text-xs font-semibold text-amber-200">{current.sensory}</p>
              </div>
            </div>

            {/* Step Navigation Controls */}
            <div className="flex items-center justify-between pt-4">
              <button
                disabled={activeStep === 0}
                onClick={() => handleSelectStep(activeStep - 1)}
                className="px-4 py-2 rounded-full border border-gold/30 text-xs font-serif text-cream disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold transition-colors"
              >
                ← Previous Stage
              </button>

              {activeStep < steps.length - 1 ? (
                <button
                  onClick={() => handleSelectStep(activeStep + 1)}
                  className="px-6 py-2.5 rounded-full bg-gold-gradient text-obsidian-900 font-serif font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <span>Next Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    onNextAct();
                  }}
                  className="px-6 py-2.5 rounded-full bg-ember-600 text-cream font-serif font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-ember-500 transition-colors flex items-center gap-2"
                >
                  <span>Proceed to Act IV: Repertoire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
