import React from "react";
import styles from "./hero.module.css";

export default function Hero() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.leftSide}>
        <div className={styles.head1}>
          <h1>Grab your meal</h1>
        </div>
        <div className={styles.head2}>
          <h2>
            Get your meals delivered <br />
            at Home
          </h2>
        </div>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Where do we deliver?"></input>
          <button type="submit">Search</button>
        </div>
      </div>
      <div className={styles.rightSide}>
        <div>
          <img
            src="/assets/nepali%20thali.png"
            alt="image of nepali thali set"
            className={styles.heroImg}
          />
        </div>
        <div className={styles.title}>
          <div>
            <img
              src="/assets/logo%20main.png"
              alt="city cravings log"
              className={styles.logo}
            />
          </div>
          <div className={styles.head3}>
            <h3>CityCravings</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
