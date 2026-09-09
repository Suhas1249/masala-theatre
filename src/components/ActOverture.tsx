import React, { useEffect, useRef } from 'react';
import { Flame, Sparkles, ChevronDown, Award, Star } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface ActOvertureProps {
  onNextAct: () => void;
  onOpenReservation: () => void;
}

export const ActOverture: React.FC<ActOvertureProps> = ({ onNextAct, onOpenReservation }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Floating Ember Particles Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ['#FFD700', '#FF7B00', '#E63946', '#D4AF37'];

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedY: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="overture" className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-obsidian-900">
      {/* Background Ember Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-80" />

      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-ember-700/20 blur-[140px] pointer-events-none" />

      {/* Top Banner Tag */}
      <div className="relative z-10 text-center px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-800/90 border border-gold/30 text-gold text-xs uppercase tracking-[0.25em] mb-4">
          <Star className="w-3.5 h-3.5 text-gold fill-gold" />
          <span>AURAWEBS Flagship Culinary Presentation</span>
          <Star className="w-3.5 h-3.5 text-gold fill-gold" />
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        {/* Left Column: Big Editorial Typography */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <p className="text-ember-400 font-serif uppercase tracking-[0.3em] text-sm font-semibold flex items-center justify-center lg:justify-start gap-2">
            <Flame className="w-4 h-4 text-ember-500" />
            The Overture
          </p>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-black tracking-tight text-cream leading-[0.95]">
            MASALA <br />
            <span className="gold-text-gradient">THEATRE</span>
          </h1>

          <p className="text-xl sm:text-2xl font-display italic text-amber-100/90 max-w-2xl mx-auto lg:mx-0">
            "Where Indian spice alchemy is performed live on your palate."
          </p>

          <p className="text-sm text-cream/70 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
            Forget ordinary dining. Enter a 5-Act gastronomic performance featuring 18-hour smoked tandoori embers, interactive spice alchemy, and royal Mughal plating.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenReservation();
              }}
              className="px-8 py-4 rounded-full bg-gold-gradient text-obsidian-900 font-serif font-bold uppercase text-xs tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_45px_rgba(212,175,55,0.7)] hover:scale-105 transition-all"
            >
              Book Your Seat
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onNextAct();
              }}
              className="px-8 py-4 rounded-full bg-obsidian-800/80 border border-gold/40 text-cream font-serif uppercase text-xs tracking-widest hover:border-gold hover:bg-white/5 transition-all flex items-center gap-2"
            >
              <span>Begin Act I</span>
              <ChevronDown className="w-4 h-4 text-gold animate-bounce" />
            </button>
          </div>
        </div>

        {/* Right Column: Hero Dish Card */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden glass-panel border border-gold/30 p-3 shadow-2xl group hover:border-gold/60 transition-all duration-500">
            {/* Dish Image */}
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <img
                src="./images/hero-lamb.jpg"
                alt="Saffron Smoked Lamb Raan"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent opacity-80" />

              {/* Gold Leaf Badge */}
              <div className="absolute top-4 right-4 bg-obsidian-900/90 border border-gold px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-md shadow-lg">
                <Award className="w-4 h-4 text-gold" />
                <span className="text-[10px] uppercase font-bold text-gold tracking-wider">
                  24k Gold Leaf Signature
                </span>
              </div>

              {/* Bottom Card Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-left p-4 rounded-xl bg-obsidian-900/80 backdrop-blur-md border border-gold/20">
                <p className="text-[10px] uppercase tracking-widest text-ember-400 font-bold mb-1">
                  Signature Act Centerpiece
                </p>
                <h3 className="font-serif text-lg font-bold text-cream gold-text-gradient">
                  Saffron Smoked Lamb Raan
                </h3>
                <p className="text-xs text-cream/70 line-clamp-2 mt-1">
                  Slow-roasted for 14 hours over Kashmiri embers with saffron dum and edible gold leaf.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 text-center pt-8">
        <button
          onClick={onNextAct}
          className="inline-flex flex-col items-center text-xs uppercase tracking-widest text-gold/70 hover:text-gold transition-colors"
        >
          <span>Scroll to Experience Act I</span>
          <ChevronDown className="w-4 h-4 mt-1 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
