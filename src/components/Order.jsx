import React from "react";
import styles from "./Order.module.css";
import Nav from "./nav";
import Basket from "./Food/Basket.jsx";
import FoodCard from "./Food/FoodCard.jsx";
import Foods from "./Food/Food.js";

export default function Order() {
  return (
    <div>
      <Nav />
      {/* category bar */}
      <div className={styles.categoryBar}>
        <div className={styles.categories}>
          <img
            src="/assets/nepal%20flag.svg"
            alt="flag of Nepal"
            className={styles.flags}
          />
          <span>Nepali</span>
        </div>
        <div className={styles.categories}>
          <img
            src="/assets/india%20flag.svg"
            alt="flag of India"
            className={styles.flags}
          />
          <span>Indian</span>
        </div>
        <div className={styles.categories}>
          <img
            src="/assets/bangladesh%20flag.svg"
            alt="flag of Bangladesh"
            className={styles.flags}
          />
          <span>Bangladeshi</span>
        </div>
        <div className={styles.categories}>
          <img
            src="/assets/tibet%20flag.svg"
            alt="flag of Tibet"
            className={styles.flags}
          />
          <span>Tibetian</span>
        </div>
      </div>
      {/* category bar */}
      <section className={styles.foodNBasket}>
        <div className={styles.foodSection}>
          {Foods.map((food, index) => {
            return (
              <FoodCard
                key={index}
                title={food.title}
                price={food.price}
                information={food.information}
              />
            );
          })}
        </div>
        <Basket />
      </section>
    </div>
  );
}
