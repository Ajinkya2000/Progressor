import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

// Contexts
import { Context as AuthContext } from "../../context/authContext";
import { Context as UtilsContext } from "../../context/utilsContext";

// Component Imports
import Signup from "./Signup";
import Signin from "./Signin";
import LoadingScreen from "../utils/LoadingScreen";

// CSS Import
import styles from "./AuthForm.module.css";

// Image Imports
import logo from "../../images/logo.png";

const AuthForm = () => {
  const [signupForm, setsignupForm] = useState(true);

  const { state } = useContext(AuthContext);
  const { state: utilsState } = useContext(UtilsContext);

  return (
    <>
      {state.user ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className={styles.formOuter}>
          {!state.user && (
            <div
              style={
                utilsState.showAuthLoading
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <LoadingScreen authForm={true} />
            </div>
          )}

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
      )}
    </>
  );
};

export default AuthForm;
