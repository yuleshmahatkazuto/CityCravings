import React from "react";
import styles from "./FoodCard.module.css";
import FoodImg from "./FoodImage";

export default function FoodCard({ title, price, information, imageUrl }) {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1 className={styles.FoodTitle}>{title}</h1>
        <h2 className={styles.FoodPrice}>{price}</h2>
        <p className={styles.information}>{information}</p>
      </div>
      <FoodImg
        className={styles.image}
        imageUrl={imageUrl}
        name={title}
        price={price}
      />
    </div>
  );
}
