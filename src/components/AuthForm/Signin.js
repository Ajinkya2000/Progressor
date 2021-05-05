import { useState, useContext } from "react";
import {Context as AuthContext} from '../../context/authContext'
import {useHistory} from 'react-router-dom'

import styles from "./AuthForm.module.css";

const Signin = () => {
  const history = useHistory();
  const {signin} = useContext(AuthContext)

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(loginDetails, () => {
      history.push('/dashboard');
    })
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
