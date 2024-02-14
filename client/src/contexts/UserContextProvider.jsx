import { useEffect, useReducer } from "react";
import { UserReducer, userStatus } from "../hooks/UserReducer";
import { UserContext } from "./CreatedContext";

export const UserContextProvider = (props) => {
  const URL = "https://grocery-app-server.vercel.app/api/user/";

  const [state, dispatch] = useReducer(UserReducer, {
    user: null,
  });

  useEffect(() => {
    const userLog = JSON.parse(sessionStorage.getItem("userLog"));

    if (userLog) {
      dispatch({ type: userStatus.LOGIN, payload: userLog });
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch, URL }}>
      {props.children}
    </UserContext.Provider>
  );
};
