import { BrowserRouter as Router } from "react-router-dom";

import AuthForm from "./AuthForm/AuthForm";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthForm />
      </Router>
    </div>
  );
}

export default App;
