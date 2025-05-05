import react, { useState } from "react";
import styles from "./FoodComponent.module.css";
import { useCart } from "../CartContext";

export default function FoodComponent(name, money) {
  const { addToCart, reduceFromCart, removeFromCart, cartItems } = useCart();
  const quantity = cartItems.find((item) => item.name === name).quantity;
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span>{name}</span>
        <span>${money}</span>
      </div>
      <div className={styles.quantity}>
        <span onClick={() => removeFromCart({ name: name, price: money })}>
          -
        </span>
        <span>{quantity}</span>
        <span onClick={() => addToCart({ name: name, price: money })}>+</span>
      </div>
    </div>
  );
}
