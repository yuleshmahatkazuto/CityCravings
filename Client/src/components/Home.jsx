import React from "react";
import Nav from "./nav";
import Hero from "./hero";
import SideKick from "./sideKick";
import Footer from "./Footer";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <Nav />
      <Hero />
      <SideKick />
      <Footer />
    </div>
  );
}
