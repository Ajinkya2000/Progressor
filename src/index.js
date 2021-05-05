import React from "react";
import ReactDOM from "react-dom";

import { Provider as AuthProvider} from "./context/authContext";

import App from "./components/App";

import "./index.css";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
