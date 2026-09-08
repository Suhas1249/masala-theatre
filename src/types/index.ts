export type ActType = 'overture' | 'fire' | 'spice' | 'journey' | 'repertoire' | 'encore';

export interface SpiceOption {
  id: string;
  name: string;
  hindiName: string;
  icon: string;
  color: string;
  flavorNote: string;
  intensity: number; // 1-10
}

export interface UnlockedDish {
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  spicesUsed: string[];
  flavorProfile: string;
}

export interface MenuItem {
  id: string;
  name: string;
  hindiName: string;
  category: 'starters' | 'mains' | 'biryani' | 'desserts' | 'elixirs';
  price: number;
  description: string;
  ingredients: string[];
  spiceLevel: number; // 1-4
  isVegetarian: boolean;
  isChefSpecial?: boolean;
  image: string;
  pairing: string;
  calories?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  customSpiceLevel?: number;
  notes?: string;
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  seatingArea: 'chefs-table' | 'royal-booth' | 'garden-courtyard';
  dietaryNotes?: string;
  ticketId?: string;
}
