import React, { useState, useEffect } from "react";
import Nav from "./nav";
import styles from "./MyOrders.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orderList, setOrderList] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    async function getOrders() {
      try {
        const result = await axios.get(
          "http://localhost:4000/getOrderCustomer",
          {
            withCredentials: true,
          }
        );
        if (result.data && !result.data.verified) {
          navigate("/login");
        } else if (result.data && result.data.verified) {
          setOrderList(result.data.groupedItems);
        }
      } catch (error) {
        console.log("Error on the server side!!!");
      }
    }

    getOrders();
  }, []);

  return (
    <div className={styles.bigContainer}>
      <Nav />
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <span className={styles.title}>Orders </span>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
