import React from "react";
import styles from "./Login.module.css";
import Navbar from "./nav";
import { Link } from "react-router-dom";

export default function () {
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
          <div className={styles.head2}>
            <span>Email</span>
          </div>
          <div className={styles.emailFieldContainer}>
            <input
              className={styles.emailField}
              placeholder="Email"
              type="email"
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
          <div className={styles.divider}>
            <hr />
            <span className={styles.notRegistered}>Not registered yet?</span>
            <hr />
          </div>
          <div>
            <button type="submit" className={styles.createAccountButton}>
              Create an account
            </button>
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
