import { useState } from "react";

import styles from "./AuthForm.module.css";

const Signin = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginDetails);
  };

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className={styles.input}
          placeholder="Email"
          value={loginDetails.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className={styles.input}
          placeholder="Password"
          value={loginDetails.password}
          onChange={handleChange}
        />

        <input type="submit" className={styles.button} value="Login" />
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
