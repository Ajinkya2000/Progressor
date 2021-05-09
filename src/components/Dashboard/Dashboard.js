import { useEffect, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";

import { Context as UtilsContext } from "../../context/utilsContext";
import { Context as AuthContext } from "../../context/authContext";

// Styles Import
import styles from "./Dashboard.module.css";

// Image Import
import logo from "../../images/logo.png";

const Dashboard = () => {
  const { state: authState, getUserFromToken, signout } = useContext(
    AuthContext
  );
  const { hideLoadingButton, hideAuthLoadingScreen } = useContext(UtilsContext);
  const history = useHistory();

  useEffect(() => {
    getUserFromToken();
    hideLoadingButton();
  }, []);

  const handleLogout = () => {
    signout(() => {
      hideAuthLoadingScreen();
      history.push("/");
    });
  };

  return (
    <>
      {!authState.user && <Redirect to="/" />}
      {authState.user && !authState.user.handle_verified && (
        <Redirect to="/gethandle" />
      )}
      <div className={styles.dashboardOuter}>
        <div className={styles.dashboardWrapper}>
          <div className={styles.sideBar}>
            <div className={styles.logoWrapper}>
              <img src={logo} alt="logo" />
              <h2>Progressor</h2>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.topBar}>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                <span>Sign Out</span>
                <span>
                  <i className="fas fa-sign-out-alt"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
