import { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import { Context as UtilsContext } from "../../context/utilsContext";
import { Context as AuthContext } from "../../context/authContext";

// Component Imports
import Sidebar from "./Sidebar";
import MainDashboard from "./DashboardDetail/MainDashboard";

// Styles Import
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { state: authState, getUserFromToken } = useContext(
    AuthContext
  );
  const { hideLoadingButton } = useContext(UtilsContext);

  useEffect(() => {
    getUserFromToken();
    hideLoadingButton();
  }, []);

  return (
    <>
      {!authState.user && <Redirect to="/" />}
      {authState.user && !authState.user.handle_verified && (
        <Redirect to="/gethandle" />
      )}
      <div className={styles.dashboardOuter}>
        <div className={styles.dashboardWrapper}>
          <Sidebar />
          <MainDashboard />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
