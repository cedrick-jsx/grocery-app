import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import NavBar from "./components/NavBar";
import { useContext } from "react";
import { userContext } from "./contexts/UserContext";

export default function App() {
  const login = useContext(userContext);

  return (
    <>
      {login.user && <NavBar />}

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={login.user ? <Home /> : <Navigate to="/account" />}
          />
          <Route
            path="/account"
            element={!login.user ? <Account /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
