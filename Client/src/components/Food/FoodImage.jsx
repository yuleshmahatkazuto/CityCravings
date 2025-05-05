import React from "react";
import styles from "./FoodImage.module.css";
import { useCart } from "../CartContext";

export default function FoodImage({ imageUrl, name, price }) {
  const { addToCart } = useCart();
  return (
    <div className={styles.container}>
      <img src={imageUrl} alt={imageUrl} />
      <button
        type="button"
        className={styles.addToCart}
        onClick={() => addToCart({ name: name, price: price })}
      >
        +
      </button>
    </div>
  );
}
