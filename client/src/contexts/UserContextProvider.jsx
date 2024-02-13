import { useEffect, useReducer } from "react";
import UserReducer from "../hooks/UserReducer";
import { userContext } from "./UserContext";

export default function UserContextProvider(props) {
  const URL = "http://localhost:4000/api/user/";

  const [state, dispatch] = useReducer(UserReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userLog"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <userContext.Provider value={{ ...state, dispatch, URL }}>
      {props.children}
    </userContext.Provider>
  );
}
