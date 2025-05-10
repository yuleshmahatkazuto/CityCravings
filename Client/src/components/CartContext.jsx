import React, { useState, createContext, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  function addToCart(item) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === item.name); //check if items already exists
      if (existing) {
        //update previous if exists
        const updated = prev.map((f) =>
          f.name === item.name
            ? {
                ...f,
                quantity: f.quantity + 1,
                price: ((f.quantity + 1) * f.unitPrice).toFixed(2),
              }
            : f
        );
        return updated;
      } else {
        return [
          ...prev,
          {
            name: item.name,
            quantity: 1,
            price: item.price,
            unitPrice: item.price,
          },
        ];
      }
    });

    setTotal((prevTotal) => prevTotal + item.price);
  }

  function reduceFromCart(item) {
    setCartItems((prev) => {
      return prev.map((arrayItem) => {
        if (arrayItem.name === item.name && arrayItem.quantity > 0) {
          return {
            ...arrayItem,
            quantity: arrayItem.quantity - 1,
            price: (arrayItem.price - arrayItem.unitPrice).toFixed(2),
          };
        } else return arrayItem;
      });
    });
  }

  function removeFromCart(item) {
    setTotal((prev) => {
      const f = cartItems.find((i) => i.name === i.item);
      if (f) return total - Number(f.price);
    });
    setCartItems((prev) => {
      return prev.filter((f) => f.name != item.name);
    });
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        reduceFromCart,
        removeFromCart,
        unitPrice,
        setUnitPrice,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

//making a helper function to simplify for children components to use.
export function useCart() {
  return useContext(CartContext);
}
