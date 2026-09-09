import React, { useState, useEffect, useRef } from 'react';
import { Flame, Thermometer, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface ActFireProps {
  onNextAct: () => void;
}

export const ActFire: React.FC<ActFireProps> = ({ onNextAct }) => {
  const [temperature, setTemperature] = useState(380);
  const [isSizzling, setIsSizzling] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  // Flame & Heat Particle Physics Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let h = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      w = canvas.width = canvas.parentElement.clientWidth;
      h = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const flames: Array<{
      x: number;
      y: number;
      radius: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ['#FF4500', '#FF8C00', '#FFD700', '#DC143C'];

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Spawn flame particles based on temperature
      const spawnCount = Math.floor(temperature / 80);
      for (let i = 0; i < spawnCount; i++) {
        const offset = (Math.random() - 0.5) * (w * 0.5);
        flames.push({
          x: w / 2 + offset + (mousePos.current.x - w / 2) * 0.1,
          y: h - 20,
          radius: Math.random() * 18 + 8,
          speedY: Math.random() * (temperature / 100) + 2,
          opacity: 0.9,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      // Update & Draw Flames
      for (let i = flames.length - 1; i >= 0; i--) {
        const f = flames[i];
        f.y -= f.speedY;
        f.radius *= 0.96;
        f.opacity -= 0.02;

        if (f.opacity <= 0 || f.radius <= 1) {
          flames.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = f.opacity;
        ctx.fillStyle = f.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = f.color;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [temperature]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleTempChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setTemperature(val);
    if (!isSizzling && val > 350) {
      setIsSizzling(true);
      soundEngine.playClick();
    }
  };

  return (
    <section id="fire" className="relative min-h-screen w-full py-24 flex items-center justify-center bg-gradient-to-b from-obsidian-900 via-[#1A0505] to-obsidian-900 border-t border-ember-800/40 overflow-hidden">
      {/* Background Ambient Glow */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full bg-ember-600/15 blur-[160px] pointer-events-none transition-opacity duration-300"
        style={{ opacity: temperature / 500 }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Narrative */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ember-900/60 border border-ember-500/40 text-ember-400 text-xs font-semibold uppercase tracking-widest">
            <Flame className="w-4 h-4 text-ember-500" />
            ACT I — FIRE & SMOKE
          </div>

          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-cream leading-tight">
            "BEFORE THE PLATE, <br />
            THERE IS <span className="ember-text-gradient">FIRE</span>."
          </h2>

          <p className="text-amber-100/90 font-display italic text-lg">
            Inside our clay tandoors, temperatures reach 450°C. Meats are seared instantaneously to seal in juices, while marinations infused with mustard oil char to perfection.
          </p>

          <p className="text-sm text-cream/70 leading-relaxed font-sans">
            Move your cursor over the interactive furnace below to control the flame direction, or slide the temperature regulator to intensify the heat physics.
          </p>

          {/* Temperature Controls */}
          <div className="glass-panel-ember p-6 rounded-2xl border border-ember-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-ember-400" />
                <span className="font-serif font-bold text-sm text-cream">Tandoor Heat Controller</span>
              </div>
              <span className="text-xl font-mono font-bold text-gold">
                {temperature}°C
              </span>
            </div>

            <input
              type="range"
              min="200"
              max="500"
              step="10"
              value={temperature}
              onChange={handleTempChange}
              className="w-full h-2 bg-obsidian-800 rounded-lg appearance-none cursor-pointer accent-ember-500"
            />

            <div className="flex items-center justify-between text-[11px] text-cream/60 uppercase tracking-widest font-mono">
              <span>200°C (Slow Dum)</span>
              <span>350°C (Sear)</span>
              <span>500°C (Roaring Charcoal)</span>
            </div>
          </div>

          {/* Action to Next Act */}
          <div className="pt-2">
            <button
              onClick={() => {
                soundEngine.playClick();
                onNextAct();
              }}
              className="px-6 py-3 rounded-full bg-ember-700/80 border border-gold/40 text-cream font-serif text-xs uppercase tracking-widest hover:border-gold hover:bg-ember-600 transition-all flex items-center gap-2"
            >
              <span>Proceed to Act II: Spice Alchemy</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Tandoor Flame Visualizer */}
        <div className="lg:col-span-6 relative flex justify-center">
          <div
            onMouseMove={handleMouseMove}
            className="relative w-full max-w-lg aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-ember-500/40 p-2 shadow-2xl group cursor-crosshair"
          >
            {/* Tandoor Photo Layer */}
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <img
                src="./images/tandoor-fire.jpg"
                alt="Roaring Tandoor Fire"
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Flame Physics Canvas Overlay */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none mix-blend-screen"
              />

              {/* Heat Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-obsidian-900/40 pointer-events-none" />

              {/* Interactive Tooltip Badge */}
              <div className="absolute top-4 left-4 bg-obsidian-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-ember-500/40 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-gold animate-spin-slow" />
                <span className="text-[10px] uppercase font-bold text-amber-200 tracking-wider">
                  Hover canvas to bend flames
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
