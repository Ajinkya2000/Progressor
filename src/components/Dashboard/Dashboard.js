import { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import { Context as UtilsContext } from "../../context/utilsContext";
import { Context as AuthContext } from "../../context/authContext";

const Dashboard = () => {
  const { state: authState, getUserFromToken } = useContext(AuthContext);
  const { hideLoading } = useContext(UtilsContext);

  useEffect(() => {
    getUserFromToken();
    hideLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!authState.user && <Redirect to="/" />}
      {authState.user && !authState.user.handle_verified && (
        <Redirect to="/gethandle" />
      )}
      <div>Dashboard</div>
    </>
  );
};

export default Dashboard;
