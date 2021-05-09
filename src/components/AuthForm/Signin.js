import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Context as AuthContext } from "../../context/authContext";
import { Context as UtilsContext } from "../../context/utilsContext";

import { toast } from "react-toastify";

import styles from "./AuthForm.module.css";

toast.configure();

const Signin = () => {
  const history = useHistory();
  const { state, signin, removeAuthError } = useContext(AuthContext);
  const {
    state: utilsState,
    showLoadingButton,
    hideLoadingButton,
  } = useContext(UtilsContext);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    showLoadingButton();
    signin(loginDetails, () => {
      history.push("/dashboard");
    });
  };

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (state.errors) {
      let keys = Object.keys(state.errors);
      keys.forEach((key) => {
        toast.error(state.errors[key][0], {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
      removeAuthError();
      hideLoadingButton();
    }
  }, [state.errors]);

  return (
    <div>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          required
          className={styles.input}
          placeholder="Email"
          value={loginDetails.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          required
          className={styles.input}
          placeholder="Password"
          value={loginDetails.password}
          onChange={handleChange}
        />
        <button type="submit" className={styles.button}>
          <span
            className={
              !utilsState.showButtonLoading
                ? styles.buttonText
                : styles.hideDisplay
            }
          >
            Sign In
          </span>
          <span
            className={`${styles.load} ${styles.open} ${
              utilsState.showButtonLoading ? styles.showDisplay : ""
            }`}
          ></span>
        </button>
      </form>
      <div className={styles.helpText}>
        <p>
          <a href="/">Forget your password?</a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
