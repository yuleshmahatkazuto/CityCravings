import React from "react";
import styles from "./sideKick.module.css";

export default function sideKick() {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.head1}>How to make an Order?</h2>
      </div>
      <div>
        <h1 className={styles.head2}>This is all it takes</h1>
      </div>
      <div className={styles.card}>
        <div className={styles.card1}>
          <div>
            <img src="/assets/location.svg" className={styles.icons} />
          </div>
          <div className={styles.head3}>Search your Location</div>
          <div className={styles.head4}>Tell us where you live</div>
        </div>
        <div className={styles.card1}>
          <div>
            <img src="/assets/food.svg" className={styles.icons} />
          </div>
          <div className={styles.head3}>Grab what you're craving for</div>
          <div className={styles.head4}>Select your food</div>
        </div>
        <div className={styles.card1}>
          <div>
            <img src="/assets/check.svg" className={styles.icons} />
          </div>
          <div className={styles.head3}>Grab it or get it sent</div>
          <div className={styles.head4}>
            You'll get progress update as we go
          </div>
        </div>
      </div>
    </div>
  );
}
