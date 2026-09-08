import React, { useState, useEffect } from 'react';
import { CurtainLoader } from './components/CurtainLoader';
import { Navbar } from './components/Navbar';
import { ActOverture } from './components/ActOverture';
import { ActFire } from './components/ActFire';
import { ActSpice } from './components/ActSpice';
import { ActJourney } from './components/ActJourney';
import { ActRepertoire } from './components/ActRepertoire';
import { ActEncore } from './components/ActEncore';
import { CartDrawer } from './components/CartDrawer';
import { DishModal } from './components/DishModal';
import { Footer } from './components/Footer';

import { ActType, MenuItem, CartItem } from './types';
import { soundEngine } from './utils/soundEngine';

export function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeAct, setActiveAct] = useState<ActType>('overture');

  // Cart & Modals State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDishModal, setSelectedDishModal] = useState<MenuItem | null>(null);

  // Observer to update Navbar active Act while scrolling
  useEffect(() => {
    if (!hasEntered) return;

    const sections: ActType[] = ['overture', 'fire', 'spice', 'journey', 'repertoire', 'encore'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const act of sections) {
        const el = document.getElementById(act);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveAct(act);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered]);

  // Scroll Navigation Handler
  const handleNavigateAct = (actId: ActType) => {
    setActiveAct(actId);
    const element = document.getElementById(actId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart Management
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== id));
  };

  const handleCheckout = () => {
    soundEngine.playSpiceUnlock();
    alert('🔥 Order sent directly to the charcoal kitchen! Your chef is preparing the coals.');
    setCartItems([]);
    setIsCartOpen(false);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-obsidian-900 text-cream selection:bg-gold selection:text-obsidian-900">
      {/* Curtain Intro */}
      {!hasEntered && <CurtainLoader onEnter={() => setHasEntered(true)} />}

      {/* Floating Navigation */}
      {hasEntered && (
        <Navbar
          activeAct={activeAct}
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenReservation={() => handleNavigateAct('encore')}
          onNavigateAct={handleNavigateAct}
        />
      )}

      {/* The 5 Acts + Overture + Encore */}
      <main className="relative z-10">
        <ActOverture
          onNextAct={() => handleNavigateAct('fire')}
          onOpenReservation={() => handleNavigateAct('encore')}
        />

        <ActFire onNextAct={() => handleNavigateAct('spice')} />

        <ActSpice
          onNextAct={() => handleNavigateAct('journey')}
          onAddToCart={handleAddToCart}
        />

        <ActJourney onNextAct={() => handleNavigateAct('repertoire')} />

        <ActRepertoire
          onAddToCart={handleAddToCart}
          onOpenDishModal={(item) => setSelectedDishModal(item)}
          onNextAct={() => handleNavigateAct('encore')}
        />

        <ActEncore />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-out Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <DishModal
        item={selectedDishModal}
        onClose={() => setSelectedDishModal(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default App;
