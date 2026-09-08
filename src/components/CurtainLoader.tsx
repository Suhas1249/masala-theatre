import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Flame } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface CurtainLoaderProps {
  onEnter: () => void;
}

export const CurtainLoader: React.FC<CurtainLoaderProps> = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  const handleOpenCurtain = () => {
    setIsOpening(true);
    soundEngine.playCurtainChime();
    soundEngine.startAmbientDrone();
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isNowMuted = soundEngine.toggleMute();
    setMuted(isNowMuted);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-all duration-1000 ${
        isOpening ? 'pointer-events-none opacity-0 scale-105' : 'opacity-100'
      }`}
    >
      {/* Left Curtain */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#1A0303] via-[#4A0000] to-[#2B0000] border-r-2 border-gold/40 shadow-2xl transition-transform duration-1000 ease-in-out ${
          isOpening ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="absolute inset-0 bg-curtain-pattern opacity-30" />
        <div className="absolute top-0 right-4 w-4 h-full bg-gradient-to-l from-gold/20 to-transparent" />
      </div>

      {/* Right Curtain */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1A0303] via-[#4A0000] to-[#2B0000] border-l-2 border-gold/40 shadow-2xl transition-transform duration-1000 ease-in-out ${
          isOpening ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="absolute inset-0 bg-curtain-pattern opacity-30" />
        <div className="absolute top-0 left-4 w-4 h-full bg-gradient-to-r from-gold/20 to-transparent" />
      </div>

      {/* Center Royal Crest & Controls */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-lg">
        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className="absolute -top-20 right-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-obsidian-800/80 border border-gold/30 text-xs uppercase tracking-widest text-gold hover:border-gold transition-colors"
        >
          {muted ? <VolumeX className="w-3.5 h-3.5 text-ember-400" /> : <Volume2 className="w-3.5 h-3.5 text-gold" />}
          <span>{muted ? 'Sound Off' : 'Sound On'}</span>
        </button>

        {/* Emblem */}
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-gold/40 animate-spin-slow" />
          <div className="w-20 h-20 rounded-full bg-obsidian-900 border border-gold flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            <Flame className="w-10 h-10 text-ember-500 animate-pulse" />
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-gold/80 mb-2 font-semibold flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          AURAWEBS Culinary Flagship
          <Sparkles className="w-3.5 h-3.5 text-gold" />
        </p>

        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wider text-cream mb-2 gold-text-gradient">
          MASALA THEATRE
        </h1>
        <p className="text-sm font-display italic text-amber-200/90 mb-8">
          "Where Every Dish Tells a 5-Act Story"
        </p>

        {/* Progress or Enter Button */}
        {!isReady ? (
          <div className="w-64 space-y-2">
            <div className="h-1.5 w-full bg-obsidian-800 rounded-full overflow-hidden border border-gold/20">
              <div
                className="h-full bg-gold-gradient transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-cream/50">
              Igniting Charcoal & Tuning Saffron... {progress}%
            </p>
          </div>
        ) : (
          <button
            onClick={handleOpenCurtain}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-ember-700 via-ember-600 to-amber-600 border border-gold/60 text-cream font-serif font-bold uppercase tracking-widest text-sm shadow-[0_0_35px_rgba(230,57,70,0.5)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-3">
              Enter The Performance
              <Flame className="w-4 h-4 text-gold group-hover:rotate-12 transition-transform" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
