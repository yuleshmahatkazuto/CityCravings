import react, { useState } from "react";
import styles from "./FoodComponent.module.css";
import { useCart } from "../CartContext";

export default function FoodComponent({ name, money }) {
  const { addToCart, reduceFromCart, removeFromCart, cartItems } = useCart();
  const item = cartItems.find((item) => item.name === name);
  let quantity = 0;
  if (item) {
    quantity = item.quantity;
  }
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span>{name}</span>
        <span>${money}</span>
      </div>
      <div className={styles.dNQ}>
        <div
          className={styles.delete}
          onClick={() => removeFromCart({ name: name })}
        >
          <img src="/assets/delete.svg" />
        </div>
        <div className={styles.quantity}>
          <span
            onClick={() => reduceFromCart({ name: name, price: money })}
            className={styles.buttons}
          >
            -
          </span>
          <span>{quantity}</span>
          <span
            onClick={() => addToCart({ name: name, price: money })}
            className={styles.buttons}
          >
            +
          </span>
        </div>
      </div>
    </div>
  );
}
