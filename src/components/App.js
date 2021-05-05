import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthForm from "./AuthForm/AuthForm";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={AuthForm} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
