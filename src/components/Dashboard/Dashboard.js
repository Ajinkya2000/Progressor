import { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import { Context as UtilsContext } from "../../context/utilsContext";
import { Context as AuthContext } from "../../context/authContext";

const Dashboard = () => {
  const { state: authState } = useContext(AuthContext);
  const { hideLoading } = useContext(UtilsContext);

  useEffect(() => {
    hideLoading();
  }, [hideLoading]);

  return (
    <>
      {authState.user && !authState.user.handle_verified && (
        <Redirect to="/gethandle" />
      )}
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
