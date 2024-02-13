import { createContext, useEffect, useReducer } from "react";
import UserReducer from "../hooks/UserReducer";

export const userLogin = createContext();

export default function UserContextProvider(props) {
  const URL = "http://localhost:4000/api/user/";

  const [state, dispatch] = useReducer(UserReducer, {
    user: null,
  });

  useEffect(() => {
    const userLog = JSON.parse(sessionStorage.getItem("userLog"));

    if (userLog) {
      dispatch({ type: "LOGIN", payload: userLog });
    }
  }, []);

  return (
    <userLogin.Provider value={{ ...state, dispatch, URL }}>
      {props.children}
    </userLogin.Provider>
  );
}
