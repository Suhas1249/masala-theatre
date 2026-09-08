import React, { useState } from 'react';
import { Calendar, Clock, Users, Sparkles, Ticket, CheckCircle, Printer, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReservationData } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface ActEncoreProps {
  onReservationSubmitted?: (data: ReservationData) => void;
}

export const ActEncore: React.FC<ActEncoreProps> = () => {
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    email: '',
    phone: '',
    guests: 2,
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
    seatingArea: 'chefs-table',
    dietaryNotes: '',
  });

  const [ticket, setTicket] = useState<ReservationData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playSpiceUnlock();

    const ticketId = `VIP-MT-${Math.floor(100000 + Math.random() * 900000)}`;
    const createdTicket = { ...formData, ticketId };
    setTicket(createdTicket);

    // Fire Golden Confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#D4AF37', '#E63946', '#FFFFFF'],
    });
  };

  const seatingOptions = [
    {
      id: 'chefs-table',
      name: "Chef's Table (Front Row)",
      desc: 'Direct view of the roaring tandoors & spice alchemy stage.',
      badge: 'Interactive Front Row',
    },
    {
      id: 'royal-booth',
      name: 'Royal Booth Sanctuary',
      desc: 'Plush velvet alcove with private gold chandelier lighting.',
      badge: 'VIP Private Alcove',
    },
    {
      id: 'garden-courtyard',
      name: 'Garden Courtyard',
      desc: 'Open-air courtyard with jasmine blossoms & starlight.',
      badge: 'Al Fresco Romance',
    },
  ];

  return (
    <section id="encore" className="relative min-h-screen w-full py-24 bg-gradient-to-b from-obsidian-900 via-[#1A0303] to-obsidian-900 border-t border-gold/30 flex items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-ember-700/15 blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 md:px-8 w-full relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-800 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest">
            <Ticket className="w-4 h-4 text-gold" />
            FINAL ACT — ENCORE & RESERVATIONS
          </div>

          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-cream">
            BOOK YOUR SEAT FOR THE <span className="gold-text-gradient">PERFORMANCE</span>
          </h2>

          <p className="text-amber-100/90 font-display italic text-lg">
            Reserve your front-row seat at Masala Theatre. Experiences are limited to 35 guests per performance.
          </p>
        </div>

        {!ticket ? (
          /* Reservation Form */
          <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-gold/40 shadow-2xl space-y-8">
            {/* Seating Area Selector */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-serif font-bold text-gold tracking-widest block">
                Select Your Performance Zone
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {seatingOptions.map((seat) => {
                  const isSelected = formData.seatingArea === seat.id;
                  return (
                    <button
                      type="button"
                      key={seat.id}
                      onClick={() => setFormData({ ...formData, seatingArea: seat.id as any })}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-obsidian-800 border-gold shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                          : 'bg-obsidian-800/40 border-gold/15 hover:border-gold/40'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold text-ember-400 font-mono block mb-1">
                        {seat.badge}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-cream">{seat.name}</h4>
                      <p className="text-xs text-cream/60 mt-1 line-clamp-2">{seat.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label className="text-xs uppercase font-mono text-cream/70 mb-2 block">Guest Name</label>
                <input
                  required
                  type="text"
                  placeholder="Royal Guest Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-800 border border-gold/20 text-sm text-cream focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-mono text-cream/70 mb-2 block">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="guest@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-800 border border-gold/20 text-sm text-cream focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-mono text-cream/70 mb-2 block">Phone Number</label>
                <input
                  required
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-800 border border-gold/20 text-sm text-cream focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-mono text-cream/70 mb-2 block flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gold" /> Number of Guests
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-800 border border-gold/20 text-sm text-cream focus:border-gold focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'} (Performance Table)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs uppercase font-mono text-cream/70 mb-2 block flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold" /> Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-800 border border-gold/20 text-sm text-cream focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-mono text-cream/70 mb-2 block flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold" /> Performance Time
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-800 border border-gold/20 text-sm text-cream focus:border-gold focus:outline-none"
                >
                  <option value="17:30">17:30 - Early Overture Act</option>
                  <option value="19:30">19:30 - Prime Performance Act</option>
                  <option value="21:30">21:30 - Late Night Ember Act</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase font-mono text-cream/70 mb-2 block">
                Dietary Preferences or Special Anniversary Notes
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Nut allergies, Jain options, Anniversary celebration..."
                value={formData.dietaryNotes}
                onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-obsidian-800 border border-gold/20 text-sm text-cream focus:border-gold focus:outline-none"
              />
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="px-10 py-4 rounded-full bg-gold-gradient text-obsidian-900 font-serif font-bold uppercase text-xs tracking-widest shadow-[0_0_35px_rgba(212,175,55,0.5)] hover:scale-105 transition-transform"
              >
                Generate VIP Golden Ticket
              </button>
            </div>
          </form>
        ) : (
          /* Render Golden VIP Ticket Confirmation */
          <div className="glass-panel p-8 rounded-3xl border border-gold shadow-2xl max-w-2xl mx-auto text-center space-y-6 animate-float">
            <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold flex items-center justify-center mx-auto text-gold">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-gold font-bold">
                Ticket Reserved · {ticket.ticketId}
              </span>
              <h3 className="font-serif text-3xl font-bold text-cream gold-text-gradient mt-1">
                GOLDEN VIP PASS CONFIRMED
              </h3>
              <p className="text-xs text-cream/70 mt-1">
                We have saved your seat for the performance. A confirmation email has been dispatched.
              </p>
            </div>

            {/* Ticket Card View */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#2A2000] via-[#4A3B00] to-[#2A2000] border-2 border-gold text-left space-y-4 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-gold/30 pb-3">
                <span className="font-serif font-bold text-gold text-lg">MASALA THEATRE</span>
                <span className="text-xs font-mono text-gold font-bold">{ticket.ticketId}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-cream/50 uppercase text-[10px] block">Guest Name</span>
                  <span className="font-serif font-bold text-cream text-sm">{ticket.name}</span>
                </div>
                <div>
                  <span className="text-cream/50 uppercase text-[10px] block">Seating Zone</span>
                  <span className="font-serif font-bold text-gold text-sm uppercase">
                    {ticket.seatingArea.replace('-', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-cream/50 uppercase text-[10px] block">Date & Time</span>
                  <span className="font-bold text-cream">{ticket.date} @ {ticket.time}</span>
                </div>
                <div>
                  <span className="text-cream/50 uppercase text-[10px] block">Party Size</span>
                  <span className="font-bold text-cream">{ticket.guests} Guests</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gold/30 text-[10px] font-mono text-gold/80 flex items-center justify-between">
                <span>Presentation of this digital ticket grants immediate VIP entry.</span>
                <Sparkles className="w-3.5 h-3.5 text-gold" />
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-full bg-obsidian-800 border border-gold/40 text-cream text-xs uppercase font-serif tracking-wider hover:border-gold flex items-center gap-2"
              >
                <Printer className="w-3.5 h-3.5 text-gold" />
                <span>Print Ticket</span>
              </button>
              <button
                onClick={() => setTicket(null)}
                className="px-6 py-2.5 rounded-full bg-gold-gradient text-obsidian-900 font-serif font-bold text-xs uppercase tracking-wider"
              >
                Book Another Seat
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
