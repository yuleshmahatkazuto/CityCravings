import React, { useState, createContext, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({
    items: [],
    total: 0,
  });

  function addToCart(itemToAdd) {
    setCart((prev) => {
      const existing = prev.items.find((i) => i.name === itemToAdd.name);

      if (existing) {
        const updatedItems = prev.items.map((cartItem) =>
          cartItem.name === itemToAdd.name
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                price: Number(
                  ((cartItem.quantity + 1) * cartItem.unitPrice).toFixed(2)
                ),
              }
            : cartItem
        );

        return {
          items: updatedItems,
          total: Number((prev.total + existing.unitPrice).toFixed(2)),
        };
      } else {
        return {
          items: [
            ...prev.items,
            {
              name: itemToAdd.name,
              quantity: 1,
              price: Number(itemToAdd.price),
              unitPrice: Number(itemToAdd.price),
            },
          ],
          total: Number((prev.total + Number(itemToAdd.price)).toFixed(2)),
        };
      }
    });
  }

  function reduceFromCart(item) {
    setCart((prev) => {
      const existing = prev.items.find((i) => i.name === item.name);

      if (!existing || existing.quantity <= 0) {
        return prev;
      }

      const unitPrice = existing.unitPrice;

      if (existing.quantity === 1) {
        return {
          items: prev.items.filter((i) => i.name != item.name),
          total: Number((prev.total - unitPrice).toFixed(2)),
        };
      }

      const updatedItems = prev.items.map((arrayItem) => {
        if (arrayItem.name === item.name) {
          return {
            ...arrayItem,
            quantity: arrayItem.quantity - 1,
            price: (arrayItem.price - arrayItem.unitPrice).toFixed(2),
          };
        } else return arrayItem;
      });
      return {
        items: updatedItems,
        total: Number((prev.total - unitPrice).toFixed(2)),
      };
    });
  }

  function removeFromCart(item) {
    setCart((prev) => {
      const existing = prev.items.find((i) => i.name === item.name);

      if (!existing) {
        return prev;
      }

      const updatedItems = prev.items.filter((i) => i.name !== existing.name);
      return {
        items: updatedItems,
        total: Number((prev.total - existing.price).toFixed(2)),
      };
    });
  }

  function updateCart() {
    setCart({
      items: [],
      total: 0,
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        reduceFromCart,
        removeFromCart,
        updateCart,
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
