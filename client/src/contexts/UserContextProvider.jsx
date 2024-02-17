import { useEffect, useReducer, useState } from "react";
import { UserReducer } from "../hooks/UserReducer";
import { UserContext } from "./CreatedContext";

export const UserContextProvider = (props) => {
  const URL = "https://grocery-app-server.vercel.app/api/";
  // const URL = "http://localhost:4000/api/";

  const [isError, setIsError] = useState("");

  const [state, dispatch] = useReducer(UserReducer, {
    user: null,
  });

  const userStatus = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
  };

  useEffect(() => {
    const userLog = JSON.parse(sessionStorage.getItem("userLog"));

    if (userLog) {
      dispatch({ type: userStatus.LOGIN, payload: userLog });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...state,
        dispatch,
        URL,
        userStatus,
        isError,
        setIsError,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
