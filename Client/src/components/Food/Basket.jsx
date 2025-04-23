import React, { useState } from "react";
import styles from "./Basket.module.css";

export default function Basket() {
  const [filled, setFilled] = useState(false);
  return (
    <div className={styles.container}>
      <h1 className={styles.basket}>Basket</h1>
      <div className={styles.emptyBasket}>
        <img src="/assets/basket.svg" alt="Basket icon" />
        <h1>Fill your Basket</h1>
        <h2>Your Basket is Empty</h2>
      </div>
    </div>
  );
}
