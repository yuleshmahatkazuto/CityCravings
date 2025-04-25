import React, { useState } from "react";
import styles from "./Order.module.css";
import Nav from "./nav.jsx";
import Basket from "./Food/Basket.jsx";
import FoodCard from "./Food/FoodCard.jsx";
import Nepali from "./Food/Nepali.js";
import Indian from "./Food/Indian.js";
import Bangladeshi from "./Food/Bangladeshi.js";
import Tibetian from "./Food/Tibetian.js";
import Footer from "./Footer.jsx";

export default function Order() {
  const [selectedCategory, setSelectedCategory] = useState("nepali");

  const foodCategory = () => {
    switch (selectedCategory) {
      case "nepali":
        return Nepali;
        break;

      case "indian":
        return Indian;
        break;

      case "bangladeshi":
        return Bangladeshi;
        break;

      case "tibetian":
        return Tibetian;
        break;

      default:
        return [];
        break;
    }
  };

  function handleClick(category) {
    setSelectedCategory(category);
  }

  return (
    <div>
      <Nav />
      {/* category bar */}
      <div className={styles.categoryBar}>
        <div
          className={`${styles.categories} ${
            selectedCategory === "nepali" ? styles.selectedCategory : ""
          }`}
          onClick={() => handleClick("nepali")}
        >
          <img
            src="/assets/nepal%20flag.svg"
            alt="flag of Nepal"
            className={styles.flags}
          />
          <span>Nepali</span>
        </div>
        <div
          className={`${styles.categories} ${
            selectedCategory === "indian" ? styles.selectedCategory : ""
          }`}
          onClick={() => handleClick("indian")}
        >
          <img
            src="/assets/india%20flag.svg"
            alt="flag of India"
            className={styles.flags}
          />
          <span>Indian</span>
        </div>
        <div
          className={`${styles.categories} ${
            selectedCategory === "bangladeshi" ? styles.selectedCategory : ""
          }`}
          onClick={() => handleClick("bangladeshi")}
        >
          <img
            src="/assets/bangladesh%20flag.svg"
            alt="flag of Bangladesh"
            className={styles.flags}
          />
          <span>Bangladeshi</span>
        </div>
        <div
          className={`${styles.categories} ${
            selectedCategory === "tibetian" ? styles.selectedCategory : ""
          }`}
          onClick={() => handleClick("tibetian")}
        >
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
          {foodCategory().map((food, index) => {
            return (
              <FoodCard
                key={index}
                title={food.title}
                price={food.price}
                information={food.information}
                imageUrl={food.imgSrc}
              />
            );
          })}
        </div>
        <Basket />
      </section>
      <Footer />
    </div>
  );
}
