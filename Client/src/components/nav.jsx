import React, { useState, useEffect } from "react";
import styles from "./nav.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Nav() {
  const [userName, setUsername] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  function displayInfo() {
    setMenuOpen((preState) => !preState);
  }

  async function logOut() {
    try {
      await axios.post("http://localhost:4000/logOut", {
        withCredentials: true,
      });
      setUsername(null);
    } catch (error) {
      alert("Server error. Error logging out!");
    }
  }

  useEffect(() => {
    async function checkStatus() {
      try {
        const response = await axios.get(
          "http://localhost:4000/check-session",
          {
            withCredentials: true,
          }
        );
        if (response.data.user) {
          setUsername(response.data.user);
        }
      } catch (error) {
        console.log("Error fetchin session:", error);
      }
    }
    checkStatus();
  }, []);

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
        {userName !== null ? (
          <div className={styles.hamburgerMenu}>
            <span className={styles.userDetail}>{userName}</span>
            <img src="/assets/hamburger.svg" alt="Menu" onClick={displayInfo} />
            {menuOpen && (
              <div className={styles.dropDown}>
                <p>
                  <Link to="/cart">Cart</Link>
                </p>
                <p>Account</p>
                <p onClick={logOut}>Logout</p>
              </div>
            )}
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
