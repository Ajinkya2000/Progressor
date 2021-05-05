import { useState } from "react";

// Component Imports
import Signup from "./Signup";
import Signin from "./Signin";

// CSS Import
import styles from "./AuthForm.module.css";

// Image Imports
import logo from "../../images/logo.png";

const AuthForm = () => {
  const [signupForm, setsignupForm] = useState(true);

  return (
    <div className={styles.formOuter}>
      <div className={styles.logoWrapper}>
        <img src={logo} alt="logo" />
        <h1>Progressor</h1>
      </div>
      <div className={styles.formWrap}>
        <div className={styles.tabs}>
          <button
            className={signupForm ? styles.active : ""}
            onClick={() => setsignupForm(true)}
          >
            Sign Up
          </button>
          <button
            className={!signupForm ? styles.active : ""}
            onClick={() => setsignupForm(false)}
          >
            Sign In
          </button>
        </div>

        <div className={styles.tabsContent}>
          {signupForm && <Signup />}
          {!signupForm && <Signin />}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
