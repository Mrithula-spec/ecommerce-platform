"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

/* ------------------ Types ------------------ */

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string; // ADD THIS
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

/* ------------------ Context ------------------ */

const CartContext = createContext<CartContextType | undefined>(undefined);

/* ------------------ Provider ------------------ */

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  // 🔹 Persist cart on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  function addToCart(item: CartItem) {
    setItems(prev => {
      const existing = prev.find(p => p.productId === item.productId);

      if (existing) {
        return prev.map(p =>
          p.productId === item.productId
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      }

      return [...prev, item];
    });
  }

   function updateQuantity(productId: string, quantity: number) {
    setItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  }

  function removeFromCart(productId: string) {
    setItems(prev => prev.filter(item => item.productId !== productId));
  }

  function clearCart() {
    setItems([]);
    localStorage.removeItem("cart");
  }

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

/* ------------------ Hook ------------------ */

export function useCart(): CartContextType {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
