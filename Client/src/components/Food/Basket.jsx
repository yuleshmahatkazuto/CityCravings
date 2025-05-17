import React, { useState, useEffect } from "react";
import styles from "./Basket.module.css";
import FoodComponent from "../Cart/FoodComponent.jsx";
import { useCart } from "../CartContext.jsx";
import axios from "axios";

export default function Basket() {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (confirmed) {
      const timer = setTimeout(() => {
        setConfirmed(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [confirmed]);
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
        setConfirmed(true);
        updateCart();
      }
    } catch (error) {}
  }
  const { cart, updateCart } = useCart();
  return (
    <div className={styles.container}>
      {confirmed && (
        <div className={styles.confirmBox}>
          <p className={styles.title}>Thank you for placing your order.</p>
          <p className={styles.message}>
            Please keep the amount ready when receiving your order.
          </p>
        </div>
      )}
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
