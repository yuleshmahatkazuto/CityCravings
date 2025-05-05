import React from "react";
import Nav from "../nav";
import styles from "./Cart.module.css";
import FoodComponent from "./FoodComponent.jsx";
import Footer from "../Footer.jsx";
import { useCart } from "../CartContext.jsx";

export default function Cart() {
  const { cartItems } = useCart();
  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.container2}>
        <div className={styles.cartContainer}>
          {cartItems.map((item) => (
            <FoodComponent name={item.name} money={item.price} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
