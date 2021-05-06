import { useState, useEffect, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";

import { Context as AuthContext } from "../../context/authContext";
import { Context as UtilsContext } from "../../context/utilsContext";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./GetHandle.module.css";

toast.configure()

const GetHandle = () => {
  const history = useHistory();
  const [platform, setPlatform] = useState("leetcode");
  const [handle, setHandle] = useState("");

  const { state: authState, addHandleData, removeAuthError } = useContext(
    AuthContext
  );
  const { hideLoading } = useContext(UtilsContext);

  useEffect(() => {
    hideLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authState.errors) {
      let keys = Object.keys(authState.errors);
      keys.forEach((key) => {
        toast.error(authState.errors[key][0], {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
      removeAuthError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addHandleData({ platform, handle }, () => {
      history.push("/dashboard");
    });
  };

  return (
    <>
      {!authState.user ? (
        <Redirect to="/" />
      ) : (
        <div className={styles.outer}>
          <form className={styles.wrapper} onSubmit={handleSubmit}>
            <div className={styles.formTitle}>
              Enter your Handle or Username!
            </div>
            <div className={styles.radioButtons}>
              <p>Choose your Platform</p>
              <div>
                <input
                  type="radio"
                  id="f-option"
                  name="selector"
                  onChange={() => setPlatform("gfg")}
                />
                <label htmlFor="f-option">Geeks for Geeks</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="s-option"
                  required
                  name="selector"
                  defaultChecked
                  onChange={() => setPlatform("leetcode")}
                />
                <label htmlFor="s-option">Leetcode</label>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                id="txt1"
                required
                placeholder="Handle or Username"
                value={handle}
                onChange={(e) => {
                  setHandle(e.target.value);
                }}
              />
            </div>
            <div className={styles.buttonWrapper}>
              <button className={styles.button} type="submit">
                Verify Handle
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default GetHandle;
