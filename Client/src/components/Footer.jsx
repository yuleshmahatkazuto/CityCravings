import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.nameNLogo}>
        <img src="/assets/logo%20main.png" alt="city cravings logo" />
        <h1>CityCravings</h1>
      </div>
      <div className={styles.clickables}>
        <div>
          <a href="/about.html">About Us</a>
        </div>
        <div>
          <a href="/contact.html">Contact Us</a>
        </div>
        <div>
          <a href="/about.html">About Us</a>
        </div>
        <div>
          <a href="/news.html">Newsroom</a>
        </div>
        <div>
          <a href="/about.html">About Us</a>
        </div>
        <div>
          <a href="/privacy.html">Privary Statement</a>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>©️ 2025 CityCravings</p>
      </div>
    </div>
  );
}
