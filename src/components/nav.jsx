import React, { useState } from "react";
import styles from "./nav.module.css";
import { Link } from "react-router-dom";

export default function Nav() {
  const [loginStatus, setLoginStatus] = useState(false);
  return (
    <div className={styles.navContainer}>
      <Link to="/" className={styles.customLink}>
        <div className={styles.leftSide}>
          <div>
            <img src="/assets/logo%20main.png" className={styles.navLogo} />
          </div>
          <div>
            <h1 className={styles.title}>CITYCRAVINGS</h1>
          </div>
        </div>
      </Link>
      <div className={styles.rightSide}>
        <div className={styles.rightLeftSide}>
          <div>
            <img src="/assets/plate%20image.png" className={styles.plate} />
          </div>
          <div>
            <p className={styles.navText}>
              <Link to="/order">Order</Link>
            </p>
          </div>
        </div>
        {loginStatus ? (
          <div className={styles.hamburgerMenu}>
            <img src="/assets/hamburger.svg" alt="Menu" />
          </div>
        ) : (
          <div className={styles.rightLeftSide}>
            <div>
              <img src="/assets/login.png" className={styles.loginImg} />
            </div>
            <div>
              <p className={styles.navText}>
                <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
