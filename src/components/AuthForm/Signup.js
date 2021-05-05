import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context as AuthContext } from "../../context/authContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CSS Import
import styles from "./AuthForm.module.css";

toast.configure();

const Signup = () => {
  const history = useHistory();
  const { state, signup, removeAuthError } = useContext(AuthContext);

  const [signupDetails, setSignupDetails] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(signupDetails, () => {
      history.push("/dashboard");
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
        <input type="submit" className={styles.button} value="Sign Up" />
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
