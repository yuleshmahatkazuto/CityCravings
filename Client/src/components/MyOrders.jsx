import React, { useState, useEffect } from "react";
import Nav from "./nav";
import styles from "./MyOrders.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orderList, setOrderList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getOrders() {
      try {
        const result = await axios.get(
          process.env.REACT_APP_API_URL + "/getOrderCustomer",
          {
            withCredentials: true,
          }
        );
        if (result.data && !result.data.verified) {
          navigate("/login");
        } else if (result.data && result.data.verified) {
          console.log(result.data);
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
          <span className={styles.title}>Orders</span>
          {orderList.map((order, index) => (
            <div key={index} className={styles.orderCard}>
              <span>UserId: {order.user_id}</span>
              <span>OrderId: {order.order_id}</span>
              {order.items.map((item, index) => (
                <div className={styles.nameAndQuantity} key={index}>
                  <span>{item.name}</span>
                  <span>{item.quantity}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Total: </p>
                <span>${order.total_price}</span>
              </div>
              <p>
                Status:{" "}
                <span
                  className={
                    order.status === "Ready" ? styles.ready : styles.cooking
                  }
                >
                  {order.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
