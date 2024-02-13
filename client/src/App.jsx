import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import NavBar from "./components/NavBar";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContextProvider";

export default function App() {
  const login = useContext(UserContext);

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
