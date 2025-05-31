import { useState, useCallback } from "react";
import { CartItem, CartState } from "@/types";
import { Product } from "@shared/schema";

const initialState: CartState = {
  items: [],
  isOpen: false,
  total: 0,
  itemCount: 0,
};

export function useCart() {
  const [cart, setCart] = useState<CartState>(initialState);

  const calculateTotals = useCallback((items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return { total, itemCount };
  }, []);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev.items.find(item => item.id === product.id);
      let newItems: CartItem[];

      if (existingItem) {
        newItems = prev.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prev.items, {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          imageUrl: product.imageUrl,
        }];
      }

      const { total, itemCount } = calculateTotals(newItems);
      return { ...prev, items: newItems, total, itemCount };
    });
  }, [calculateTotals]);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prev => {
      const newItems = prev.items.filter(item => item.id !== productId);
      const { total, itemCount } = calculateTotals(newItems);
      return { ...prev, items: newItems, total, itemCount };
    });
  }, [calculateTotals]);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prev => {
      const newItems = prev.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      const { total, itemCount } = calculateTotals(newItems);
      return { ...prev, items: newItems, total, itemCount };
    });
  }, [calculateTotals, removeFromCart]);

  const openCart = useCallback(() => {
    setCart(prev => ({ ...prev, isOpen: true }));
  }, []);

  const closeCart = useCallback(() => {
    setCart(prev => ({ ...prev, isOpen: false }));
  }, []);

  const clearCart = useCallback(() => {
    setCart(initialState);
  }, []);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    openCart,
    closeCart,
    clearCart,
  };
}
