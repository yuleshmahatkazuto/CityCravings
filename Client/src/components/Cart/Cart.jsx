import React from "react";
import Nav from "../nav";
import styles from "./Cart.module.css";
import FoodComponent from "./FoodComponent.jsx";
import Footer from "../Footer.jsx";
import { useCart } from "../CartContext.jsx";
import axios from "axios";

export default function Cart() {
  async function handleSubmit() {
    try {
      const result = await axios.post(
        process.env.REACT_APP_API_URL + "/handleSubmit",
        {
          total: cart.total,
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
      <Nav />
      <div className={styles.container2}>
        <div className={styles.cartContainer}>
          {cart.items.map((item) => (
            <FoodComponent name={item.name} money={item.price} />
          ))}
          <div className={styles.total}>
            <p className={styles.label}>Total: </p>
            <p className={styles.totalValue}>${cart.total}</p>
          </div>
          <button className={styles.confirm} onClick={handleSubmit}>
            Place Order
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
