import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import Nav from "./nav.jsx";
import InputField from "./InputField.jsx";

export default function Register() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  function handleChange(event) {
    setDetails({ ...details, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className={styles.container}>
      <Nav />
      <div className={styles.mainArea}>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1>Register</h1>
            <InputField
              label="Name: "
              name="name"
              value={details.name}
              placeHolder="Your Name"
              onChange={handleChange}
            />
            <InputField
              label="Email: "
              name="email"
              value={details.email}
              placeHolder="Email Address"
              onChange={handleChange}
            />
            <InputField
              label="Password "
              name="password"
              value={details.password}
              placeHolder="Password"
              type="password"
              onChange={handleChange}
            />
            <InputField
              label="Address: "
              name="address"
              value={details.address}
              placeHolder="Address"
              onChange={handleChange}
            />
            <InputField
              label="Phone Number: "
              name="phone"
              value={details.phone}
              placeHolder="Contact Number"
              onChange={handleChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
