import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { CartItem } from '@/types/shop';

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, weightLabel: string, flavorLabel: string) => void;
  updateQuantity: (productId: string, weightLabel: string, flavorLabel: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalTND: number;
}

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = 'fromagerie_cart';

const sameItem = (a: CartItem, b: CartItem) =>
  a.productId === b.productId && a.weightLabel === b.weightLabel && a.flavorLabel === b.flavorLabel;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems(prev => {
      const exists = prev.find(i => sameItem(i, newItem));
      if (exists) {
        return prev.map(i => sameItem(i, newItem) ? { ...i, quantity: i.quantity + newItem.quantity } : i);
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (productId: string, weightLabel: string, flavorLabel: string) => {
    setItems(prev => prev.filter(i => !(i.productId === productId && i.weightLabel === weightLabel && i.flavorLabel === flavorLabel)));
  };

  const updateQuantity = (productId: string, weightLabel: string, flavorLabel: string, quantity: number) => {
    if (quantity <= 0) { removeItem(productId, weightLabel, flavorLabel); return; }
    setItems(prev =>
      prev.map(i =>
        i.productId === productId && i.weightLabel === weightLabel && i.flavorLabel === flavorLabel
          ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setItems([]);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalTND = items.reduce((s, i) => s + i.priceInTND * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalTND }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
