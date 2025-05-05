import React from "react";
import Nav from "../nav";
import styles from "./Cart.module.css";
import FoodComponent from "./FoodComponent.jsx";

export default function Cart() {
  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.container2}>
        <div className={styles.cartContainer}></div>
      </div>
    </div>
  );
}
