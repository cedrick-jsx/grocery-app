import { createContext, useEffect, useReducer } from "react";
import { UserReducer, userStatus } from "../hooks/UserReducer";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const URL = "http://localhost:4000/api/user/";

  const [state, dispatch] = useReducer(UserReducer, {
    user: null,
  });

  useEffect(() => {
    if (sessionStorage.userLog) {
      const userLog = JSON.parse(sessionStorage.getItem("userLog"));
      dispatch({ type: userStatus.LOGIN, payload: userLog });
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch, URL }}>
      {props.children}
    </UserContext.Provider>
  );
};
