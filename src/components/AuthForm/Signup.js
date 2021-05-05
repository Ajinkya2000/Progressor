import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Context as AuthContext } from "../../context/authContext";
import { Context as UtilsContext } from "../../context/utilsContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CSS Import
import styles from "./AuthForm.module.css";

toast.configure();

const Signup = () => {
  const history = useHistory();
  const { state, signup, removeAuthError } = useContext(AuthContext);
  const { state: utilsState, showLoading } = useContext(UtilsContext);

  const [signupDetails, setSignupDetails] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();
    signup(signupDetails, () => {
      history.push('/gethandle')
    });
  };

  const handleChange = (e) => {
    setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (state.errors) {
      toast.error("Something went Wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      removeAuthError();
    }
  }, [state.errors, removeAuthError]);

  return (
    <div
      id="signup-tab-content"
      className={styles.active}
      onSubmit={handleSubmit}
    >
      <form className={styles.signupForm}>
        <input
          name="email"
          type="email"
          className={styles.input}
          placeholder="Email"
          value={signupDetails.email}
          onChange={handleChange}
        />
        <input
          name="name"
          type="text"
          className={styles.input}
          placeholder="Name"
          value={signupDetails.name}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          className={styles.input}
          placeholder="Password"
          value={signupDetails.password}
          onChange={handleChange}
        />
        <button type="submit" className={styles.button}>
          <span
            className={
              !utilsState.showAuthLoading
                ? styles.buttonText
                : styles.hideDisplay
            }
          >
            Sign Up
          </span>
          <span
            className={`${styles.load} ${styles.open} ${
              utilsState.showAuthLoading ? styles.showDisplay : ""
            }`}
          ></span>
        </button>
      </form>
      <div className={styles.helpText}>
        <p>By signing up, you agree to our</p>
        <p>
          <a href="#/">Terms of service</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
