import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./contexts/UserContextProvider.jsx";
import { GroceryProvider } from "./contexts/GroceryProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <GroceryProvider>
        <App />
      </GroceryProvider>
    </UserContextProvider>
  </React.StrictMode>
);
