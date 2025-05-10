import React, { useState } from "react";
import styles from "./Basket.module.css";
import FoodComponent from "../Cart/FoodComponent.jsx";
import { useCart } from "../CartContext.jsx";

export default function Basket() {
  const [filled, setFilled] = useState(false);
  const { cartItems, total } = useCart();
  return (
    <div className={styles.container}>
      <h1 className={styles.basket}>Basket</h1>
      <div className={styles.items}>
        {cartItems.length === 0 ? (
          <div className={styles.emptyBasket}>
            <img src="/assets/basket.svg" alt="Basket icon" />
            <h1>Fill your Basket</h1>
            <h2>Your Basket is Empty</h2>
          </div>
        ) : (
          cartItems.map((item) => (
            <FoodComponent name={item.name} money={item.price} />
          ))
        )}
      </div>
      <div className={styles.total}>
        <p className={styles.label}>Total: </p>
        <p className={styles.totalValue}>{total}</p>
      </div>
    </div>
  );
}
