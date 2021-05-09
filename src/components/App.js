import { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Context as AuthContext } from "../context/authContext";
import { Context as UtilsContext } from "../context/utilsContext";

import AuthForm from "./AuthForm/AuthForm";
import GetHandle from "./AuthForm/GetHandle";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  const { getUserFromToken, state:authState } = useContext(AuthContext);
  const { hideAuthLoadingScreen } = useContext(UtilsContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !authState.errors) {
      getUserFromToken();
    } else {
      hideAuthLoadingScreen();
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (authState.errors) {
      hideAuthLoadingScreen();
    }
  }, [authState.errors])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={AuthForm} />
          <Route path="/gethandle" exact component={GetHandle} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
