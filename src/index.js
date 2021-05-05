import React from "react";
import ReactDOM from "react-dom";

import { Provider as AuthProvider } from "./context/authContext";
import { Provider as UtilsProvider } from "./context/utilsContext";

import App from "./components/App";

import "./index.css";

ReactDOM.render(
  <AuthProvider>
    <UtilsProvider>
      <App />
    </UtilsProvider>
  </AuthProvider>,
  document.getElementById("root")
);
