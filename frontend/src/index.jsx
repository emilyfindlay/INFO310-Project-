import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";             // Load main component
import "./styles/main.css";         // Optional: global styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);