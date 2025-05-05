import React, { useState, createContext, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(item) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((f) =>
          f.name === item.name ? { ...f, quantity: f.quantity + 1 } : f
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  }

  function reduceFromCart(item) {
    setCartItems((prev) => {
      return prev.map((arrayItem) => {
        if (arrayItem.name === item.name) {
          return { ...arrayItem, quantity: arrayItem.quantity - 1 };
        } else return arrayItem;
      });
    });
  }

  function removeFromCart(item) {
    setCartItems((prev) => {
      return prev.filter((f) => f.name != item.name);
    });
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, reduceFromCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

//making a helper function to simplify for children components to use.
export function useCart() {
  return useContext(CartContext);
}
