import React from "react";
import Nav from "./nav";
import Hero from "./hero";
import SideKick from "./sideKick";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="mainContainer">
      <Nav />
      <Hero />
      <SideKick />
      <Footer />
    </div>
  );
}
