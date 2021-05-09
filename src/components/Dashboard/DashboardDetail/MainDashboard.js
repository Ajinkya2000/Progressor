import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { Context as UtilsContext } from "../../../context/utilsContext";
import { Context as AuthContext } from "../../../context/authContext";

// Styles Import
import styles from "../Dashboard.module.css";

const MainDashboard = () => {
  const { signout } = useContext(AuthContext);
  const { hideAuthLoadingScreen } = useContext(UtilsContext);
  const history = useHistory();

  const handleLogout = () => {
    signout(() => {
      hideAuthLoadingScreen();
      history.push("/");
    });
  };

  return (
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
  );
};

export default MainDashboard;
