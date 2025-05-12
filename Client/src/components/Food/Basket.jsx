import React, { useState } from "react";
import styles from "./Basket.module.css";
import FoodComponent from "../Cart/FoodComponent.jsx";
import { useCart } from "../CartContext.jsx";
import axios from "axios";

export default function Basket() {
  async function handleSubmit() {
    try {
      const result = await axios.post(
        "http://localhost:4000/handleSubmit",
        {
          total: cart.total,
          items: cart.items,
        },
        { withCredentials: true }
      );

      if (result.data.message === "Success") {
        updateCart();
      }
    } catch (error) {}
  }
  const { cart, updateCart } = useCart();
  return (
    <div className={styles.container}>
      <h1 className={styles.basket}>Basket</h1>
      <div className={styles.items}>
        {cart.items.length === 0 ? (
          <div className={styles.emptyBasket}>
            <img src="/assets/basket.svg" alt="Basket icon" />
            <h1>Fill your Basket</h1>
            <h2>Your Basket is Empty</h2>
          </div>
        ) : (
          cart.items.map((item) => (
            <FoodComponent name={item.name} money={item.price} />
          ))
        )}
      </div>
      <div className={styles.total}>
        <p className={styles.label}>Total: </p>
        <p className={styles.totalValue}>${cart.total}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.confirm} onClick={handleSubmit}>
          Confirm Order
        </button>
      </div>
    </div>
  );
}
