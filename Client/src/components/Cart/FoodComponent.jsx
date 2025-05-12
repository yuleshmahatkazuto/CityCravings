import react, { useState } from "react";
import styles from "./FoodComponent.module.css";
import { useCart } from "../CartContext";

export default function FoodComponent({ name, money }) {
  const { addToCart, reduceFromCart, removeFromCart, cart } = useCart();
  const item = cart.items.find((item) => item.name === name);
  const quantity = item ? item.quantity : 0;
  const price = item ? item.price : money;
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span>{item.name}</span>
        <span>${price}</span>
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
            onClick={() => reduceFromCart({ name: name })}
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
