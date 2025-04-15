import React from "react";
import styles from "./FoodImage.module.css";

export default function FoodImage({ imageUrl }) {
  return (
    <div className={styles.container}>
      <img src={imageUrl} alt={imageUrl} />
      <button type="button" className={styles.addToCart}>
        +
      </button>
    </div>
  );
}
