"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { useAuth } from "./AuthContext";

export interface Cart {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextProps {
  cart: Cart[];
  setCart: (cart: Cart[]) => void;
  addToCart: (product: Cart) => void;
  removeFromCart: (id: number) => void;
  emptyCart: () => void;
}

const CartContext = createContext<CartContextProps>({
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},

  emptyCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart[]>([]);
  const { user } = useAuth();
  const userId = user?.user?.id;

  useEffect(() => {
    if (userId) {
      const saved = localStorage.getItem(`cart-${userId}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);

          setCart(parsed.items || []);
        } catch {
          setCart([]);
        }
      } else {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const data = {
        items: cart,
      };
      localStorage.setItem(`cart-${userId}`, JSON.stringify(data));
    }
  }, [cart, userId]);

  const emptyCart = () => {
    if (userId) {
      localStorage.removeItem(`cart-${userId}`);
    }
    setCart([]);
  };

  const addToCart = (product: Cart) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prev, product];
    });
  };

    const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart,removeFromCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
