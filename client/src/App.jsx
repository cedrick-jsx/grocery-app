import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import NavBar from "./components/NavBar";
import { useContext } from "react";
import { UserContext } from "./contexts/CreatedContext";
import { AddGrocery } from "./pages/AddGrocery";
import AccountDetails from "./pages/AccountDetails";
import { ViewGroceryList } from "./pages/ViewGroceryList";

export default function App() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      {user && <NavBar />}

      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/account" />}
        />

        <Route
          path="/account"
          element={!user ? <Account /> : <Navigate to="/" />}
        />

        <Route
          path="/view"
          element={user ? <ViewGroceryList /> : <Navigate to="/" />}
        />

        <Route
          path="/add"
          element={user ? <AddGrocery /> : <Navigate to="/" />}
        />

        <Route
          path="/information"
          element={user ? <AccountDetails /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
