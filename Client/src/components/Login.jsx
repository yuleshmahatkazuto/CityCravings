import React, { useState } from "react";
import styles from "./Login.module.css";
import Navbar from "./nav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  function handleChange(event) {
    setCredentials({ ...credentials, [event.target.type]: event.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin();
  }

  async function handleLogin() {
    try {
      console.log("backend api url", process.env.REACT_APP_API_URL);
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/login",
        {
          email: credentials.email,
          password: credentials.password,
        },
        { withCredentials: true }
      );
      if (response.data.verified) {
        if (response.data.role === "customer") {
          navigate("/home");
        } else {
          navigate("/adminPage");
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("Error navigating to home page.");
    }
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.elementContainer}>
        <div className={styles.form}>
          <div className={styles.title}>
            <h1>Log in</h1>
          </div>
          <div className={styles.google}>
            <img
              src="/assets/google%20logo.svg"
              alt="Google logo"
              className={styles.googleImg}
            />
            <span className={styles.buttonText}>Continue with Google</span>
          </div>
          <div className={styles.divider}>
            <hr />
            <span>or</span>
            <hr />
          </div>
          <form className={styles.form2} onSubmit={handleSubmit}>
            <div className={styles.head2}>
              <span>Email</span>
            </div>
            <div className={styles.emailFieldContainer}>
              <input
                className={styles.emailField}
                placeholder="Email"
                type="email"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.head2}>
              <span>Password</span>
            </div>
            <div className={styles.passwordFieldContainer}>
              <input
                className={styles.passwordField}
                placeholder="Password"
                type="password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <span className={styles.forgotPassword}>
                <Link to="/forgot">Forgot password?</Link>
              </span>
            </div>
            <div>
              <button type="submit" className={styles.loginButton}>
                Log in
              </button>
            </div>
          </form>
          <div className={styles.divider}>
            <hr />
            <span className={styles.notRegistered}>Not registered yet?</span>
            <hr />
          </div>
          <div>
            <Link to="/register">
              <button type="submit" className={styles.createAccountButton}>
                Create an account
              </button>
            </Link>
          </div>
          <div className={styles.disclaimer}>
            By loggin in, you're confirming that you agree to our privacy
            policy, terms of use, and cookie policy.
          </div>
        </div>
      </div>
    </div>
  );
}
