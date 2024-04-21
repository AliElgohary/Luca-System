// start file
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import the translation
import "./locale/i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  // <ErrorBoundary>
  <App />
  // </ErrorBoundary>
  // </React.StrictMode>
);
