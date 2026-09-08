import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, Flame, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + tax;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-obsidian-900/80 backdrop-blur-sm animate-fade-in"
      />

      {/* Slide-out Drawer */}
      <div className="relative z-10 w-full max-w-md h-full bg-obsidian-900 border-l border-gold/30 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gold/20">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <h3 className="font-serif font-bold text-lg text-cream gold-text-gradient">
                YOUR PERFORMANCE ORDER
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-obsidian-800 text-cream/70 hover:text-gold hover:bg-obsidian-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-gold/30 mx-auto" />
              <p className="font-serif text-cream/60 text-sm">Your culinary tray is empty.</p>
              <p className="text-xs text-cream/40 max-w-xs mx-auto">
                Explore Act II Spice Alchemy or Act IV Repertoire to select signature dishes.
              </p>
            </div>
          ) : (
            <div className="py-4 space-y-4">
              {items.map((cartItem) => (
                <div
                  key={cartItem.item.id}
                  className="glass-panel p-3 rounded-xl border border-gold/20 flex items-center gap-3"
                >
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-16 h-16 rounded-lg object-cover border border-gold/20"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-xs text-cream truncate">
                      {cartItem.item.name}
                    </h4>
                    <p className="text-[10px] text-gold font-mono">${cartItem.item.price} each</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                        className="w-5 h-5 rounded bg-obsidian-800 text-gold flex items-center justify-center border border-gold/30 hover:border-gold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold font-mono text-cream">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                        className="w-5 h-5 rounded bg-obsidian-800 text-gold flex items-center justify-center border border-gold/30 hover:border-gold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-serif font-bold text-sm text-cream">
                      ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => onRemoveItem(cartItem.item.id)}
                      className="text-ember-400 hover:text-ember-500 p-1 mt-1"
                      title="Remove Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer Summary */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-gold/20 space-y-3">
            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between text-cream/70">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-cream/70">
                <span>Royal Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-serif font-bold text-cream pt-2 border-t border-gold/15">
                <span>Grand Total</span>
                <span className="text-gold">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playClick();
                onCheckout();
              }}
              className="w-full py-3.5 rounded-full bg-gold-gradient text-obsidian-900 font-serif font-bold uppercase text-xs tracking-widest shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <span>Confirm & Send To Kitchen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
