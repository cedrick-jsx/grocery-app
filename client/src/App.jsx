import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import NavBar from "./components/NavBar";
import { useContext } from "react";
import { UserContext } from "./contexts/CreatedContext";
import { AddGrocery } from "./pages/AddGrocery";
import AccountDetails from "./pages/AccountDetails";

export default function App() {
  const login = useContext(UserContext);

  return (
    <BrowserRouter>
      {login.user && <NavBar />}

      <Routes>
        <Route
          path="/"
          element={login.user ? <Home /> : <Navigate to="/account" />}
        />

        <Route
          path="/account"
          element={!login.user ? <Account /> : <Navigate to="/" />}
        />

        <Route
          path="/add"
          element={login.user ? <AddGrocery /> : <Navigate to="/" />}
        />

        <Route
          path="/information"
          element={login.user ? <AccountDetails /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
