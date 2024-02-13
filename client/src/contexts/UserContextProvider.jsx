import { createContext, useEffect, useReducer } from "react";
import { UserReducer, userStatus } from "../hooks/UserReducer";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const URL = "http://localhost:4000/api/user/";

  const [state, dispatch] = useReducer(UserReducer, {
    user: null,
  });

  useEffect(() => {
    try {
      const userLog = JSON.parse(sessionStorage.getItem("userLog"));

      if (userLog) {
        dispatch({ type: userStatus.LOGIN, payload: userLog });
      }
    } catch (error) {
      console.log("error");
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch, URL }}>
      {props.children}
    </UserContext.Provider>
  );
};
