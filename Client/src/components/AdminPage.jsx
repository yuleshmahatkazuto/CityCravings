import react, { useEffect, useState } from "react";
import styles from "./AdminPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const [userName, setUserName] = useState("");
  const [orderList, setOrderList] = useState([]);
  const navigate = useNavigate();
  const [buttonClickId, setOpenStatus] = useState(null);

  function handleClick(orderId) {
    setOpenStatus((prevId) => (orderId === prevId ? null : orderId));
  }
  async function logOut() {
    try {
      await axios.post(
        "http://localhost:4000/logOut",
        {},
        {
          withCredentials: true,
        }
      );
      setUserName(null);
      navigate("/home");
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
        const result = await axios.get("http://localhost:4000/getOrder", {
          withCredentials: true,
        });
        if (result.data) {
          setOrderList(result.data.groupedItems);
        }
      } catch (error) {
        console.log("Error on the server side!!!");
      }
    }
    checkStatus();
    getOrders();
  }, []);

  async function changeStatus(event) {
    const newStatus = event.target.innerText;
    const orderId = event.target.getAttribute("name");

    setOrderList((prev) =>
      prev.map((order) =>
        order.order_id == orderId ? { ...order, status: newStatus } : order
      )
    );

    await axios.patch(
      "http://localhost:4000/updateStatus",
      { order_id: orderId },
      { withCredentials: true }
    );
  }
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
          <span className={styles.logOut} onClick={logOut}>
            Logout
          </span>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.orderContainer}>
          <div
            style={{
              fontFamily: "var(--font-bubble)",
              fontSize: "40px",
              color: "var(--color-primary)",
              width: " 60%",
              textAlign: "center",
            }}
          >
            HAPPY COOKING
          </div>
          {orderList.map((order) => (
            <div className={styles.orderCard} key={order.order_id}>
              <span>User Id: {order.user_id}</span>
              <span>OrderId: {order.order_id}</span>
              <div>
                {order.items.map((item, index) => {
                  return (
                    <div key={index} className={styles.items}>
                      <span>{item.name}</span>
                      <span>{item.quantity}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Total Price: </span>
                <span>${order.total_price}</span>
              </div>

              {/* dropdown button */}
              <div className={styles.dropDownContainer}>
                <button
                  className={styles.clickMe}
                  onClick={() => handleClick(order.order_id)}
                >
                  {order.status}
                  <img src="/assets/dropdown.svg" />
                </button>

                {buttonClickId === order.order_id && (
                  <div className={styles.openMenu}>
                    <ul>
                      <li
                        className={styles.customDropDown}
                        name={order.order_id}
                        onClick={(e) => {
                          changeStatus(e);
                          handleClick(order.order_id);
                        }}
                      >
                        Cooking
                      </li>
                      <li
                        className={styles.customDropDown}
                        name={order.order_id}
                        onClick={(e) => {
                          changeStatus(e);
                          handleClick(order.order_id);
                        }}
                      >
                        Ready
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
