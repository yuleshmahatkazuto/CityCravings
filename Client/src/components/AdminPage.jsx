import react, { useEffect, useState } from "react";
import styles from "./AdminPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const [userName, setUserName] = useState(null);

  async function logOut() {
    try {
      await axios.post("http://localhost:4000/logOut", {
        withCredentials: true,
      });
      setUserName(null);
    } catch (error) {
      alert("Error logging out");
    }
  }

  useEffect(() => {
    async function checkStatus() {
      try {
        const result = await axios.get("http://localhost:4000/check-session", {
          withCredentials: true,
        });
        if (result.data.user) {
          setUserName(result.data.user);
        }
      } catch (error) {
        console.log("Error on the server side!!");
      }
    }

    async function getOrders() {
      try {
        const result = await axios.get("http://localhost:4000/getOrders", {
          withCredentials: true,
        });
      } catch {}
    }

    checkStatus();
  }, []);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.navContainer}>
        <div className={styles.leftSide}>
          <div>
            <img src="/assets/logo%20main.png" className={styles.navLogo} />
          </div>
          <div>
            <h1 className={styles.title}>CITYCRAVINGS</h1>
          </div>
        </div>
        <div className={styles.rightSide}>
          <span className={styles.userDetail}>{userName}</span>
          <span className={styles.logOut}>Logout</span>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.orderContainer}></div>
      </div>
    </div>
  );
}
