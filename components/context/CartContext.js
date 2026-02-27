import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'carCart';

const CartContext = createContext(null);

function safeParseCart(value) {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function normalizeCart(items) {
  if (!Array.isArray(items)) return [];

  return items
    .filter(Boolean)
    .map((item) => {
      const quantity = Number(item.quantity ?? 1);
      return {
        ...item,
        quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
      };
    });
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initial = normalizeCart(safeParseCart(localStorage.getItem(STORAGE_KEY) || '[]'));
    setItems(initial);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (typeof window === 'undefined') return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isReady]);

  const notify = (message, type = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const toast = { id, message, type };

    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2200);
  };

  const addItem = (car) => {
    if (!car || car.id == null) return;

    setItems((prev) => {
      const existing = prev.find((x) => x.id === car.id);
      if (existing) {
        return prev.map((x) => (x.id === car.id ? { ...x, quantity: x.quantity + 1 } : x));
      }
      return [...prev, { ...car, quantity: 1 }];
    });

    notify('Added to cart');
  };

  const decreaseItem = (carId) => {
    setItems((prev) => {
      const existing = prev.find((x) => x.id === carId);
      if (!existing) return prev;
      if (existing.quantity <= 1) return prev.filter((x) => x.id !== carId);
      return prev.map((x) => (x.id === carId ? { ...x, quantity: x.quantity - 1 } : x));
    });
  };

  const removeItem = (carId) => {
    setItems((prev) => prev.filter((x) => x.id !== carId));
    notify('Removed from cart', 'info');
  };

  const clear = () => {
    setItems([]);
    notify('Cart cleared', 'info');
  };

  const totalCount = useMemo(() => items.reduce((sum, x) => sum + (x.quantity || 0), 0), [items]);
  const totalPrice = useMemo(
    () => items.reduce((sum, x) => sum + (Number(x.price) || 0) * (x.quantity || 0), 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      isReady,
      totalCount,
      totalPrice,
      addItem,
      decreaseItem,
      removeItem,
      clear,
      notify,
      toasts,
    }),
    [items, isReady, totalCount, totalPrice, toasts]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
