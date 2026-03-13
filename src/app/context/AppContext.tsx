import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ru' | 'uz';
export type Theme = 'dark' | 'light';

export interface Watch {
  id: number;
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  mechanism: string;
  material: string;
  color: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
  description: string;
  specifications: Record<string, string>;
  inStock: boolean;
}

export interface CartItem {
  watch: Watch;
  quantity: number;
}

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  cart: CartItem[];
  addToCart: (watch: Watch, quantity?: number) => void;
  removeFromCart: (watchId: number) => void;
  updateQuantity: (watchId: number, quantity: number) => void;
  cartTotal: number;
  cartCount: number;
  wishlist: number[];
  toggleWishlist: (watchId: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('en');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const addToCart = (watch: Watch, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.watch.id === watch.id);
      if (existing) {
        return prev.map(item =>
          item.watch.id === watch.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { watch, quantity }];
    });
  };

  const removeFromCart = (watchId: number) => {
    setCart(prev => prev.filter(item => item.watch.id !== watchId));
  };

  const updateQuantity = (watchId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(watchId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.watch.id === watchId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.watch.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleWishlist = (watchId: number) => {
    setWishlist(prev =>
      prev.includes(watchId) ? prev.filter(id => id !== watchId) : [...prev, watchId]
    );
  };

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      language, setLanguage,
      cart, addToCart, removeFromCart, updateQuantity,
      cartTotal, cartCount,
      wishlist, toggleWishlist
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
