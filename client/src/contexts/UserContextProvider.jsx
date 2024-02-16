import { useEffect, useReducer } from "react";
import { UserReducer } from "../hooks/UserReducer";
import { UserContext } from "./CreatedContext";

export const UserContextProvider = (props) => {
  // const URL = "https://grocery-app-server.vercel.app/api/";
  const URL = "http://localhost:4000/api/";

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
    <UserContext.Provider value={{ ...state, dispatch, URL }}>
      {props.children}
    </UserContext.Provider>
  );
};
