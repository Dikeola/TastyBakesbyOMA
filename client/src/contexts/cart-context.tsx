
import React, { createContext, useContext } from 'react';
import { useCart } from '@/hooks/use-cart';

const CartContext = createContext<ReturnType<typeof useCart> | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cartValue = useCart();
  
  return (
    <CartContext.Provider value={cartValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}
