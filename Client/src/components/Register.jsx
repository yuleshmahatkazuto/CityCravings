import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import Nav from "./nav.jsx";
import InputField from "./InputField.jsx";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
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
    handleRegister();
  }

  async function handleRegister() {
    try {
      const result = await axios.post(
        "http://localhost:4000/register",
        details
      );
      setDetails((prevDetails) => {
        const newDetails = {};
        Object.keys(prevDetails).forEach((key) => {
          newDetails[key] = "";
        });
        return newDetails;
      });
      console.log(result.message);
      navigate("/home");
    } catch (error) {
      console.log("Something went wrong with the registration process.");
    }
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
              className={styles.inputFields}
            />
            <InputField
              label="Email: "
              name="email"
              value={details.email}
              placeHolder="Email Address"
              onChange={handleChange}
              className={styles.inputFields}
              autoComplete="on"
            />
            <InputField
              label="Password: "
              name="password"
              value={details.password}
              placeHolder="Password"
              type="password"
              onChange={handleChange}
              className={styles.inputFields}
            />
            <InputField
              label="Address: "
              name="address"
              value={details.address}
              placeHolder="Address"
              onChange={handleChange}
              className={styles.inputFields}
            />
            <InputField
              label="Phone Number: "
              name="phone"
              value={details.phone}
              placeHolder="Contact Number"
              onChange={handleChange}
              className={styles.inputFields}
            />
            <button type="submit" className={styles.registerButton}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
