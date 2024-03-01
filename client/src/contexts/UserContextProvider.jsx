import { useEffect, useReducer, useState } from "react";
import { UserReducer } from "../hooks/UserReducer";
import { UserContext } from "./CreatedContext";

export const UserContextProvider = (props) => {
  const URL = "https://grocery-app-server.vercel.app/api/";

  const [isError, setIsError] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const [state, dispatch] = useReducer(UserReducer, {
    user: null,
  });

  const userStatus = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
  };

  useEffect(() => {
    setIsFetching(true);

    const userLog = JSON.parse(sessionStorage.getItem("userLog"));

    if (userLog) {
      dispatch({ type: userStatus.LOGIN, payload: userLog });
      setIsFetching(false);
    } else {
      setIsFetching(false);
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
        isFetching,
        setIsFetching,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
