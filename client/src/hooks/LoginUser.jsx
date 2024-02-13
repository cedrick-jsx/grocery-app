import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContextProvider";
import { userStatus } from "./UserReducer";

export default function LoginUser() {
  const navigate = useNavigate("");

  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const { dispatch, URL } = useContext(UserContext);

  const login = (email, name, password, isLogin) => {
    setIsError("");
    setIsLoading(true);

    axios
      .post(
        URL + `${isLogin ? "login" : !isLogin && "signup"}`,
        isLogin ? { email, password } : !isLogin && { email, name, password }
      )
      .then((response) => {
        if (isLogin) {
          dispatch({
            type: userStatus.LOGIN,
            payload: response.data,
          });

          sessionStorage.setItem("userLog", JSON.stringify(response.data));

          setIsLoading(false);
        } else if (!isLogin) {
          setIsError("Success");

          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      })
      .catch((err) => {
        setIsError(err.response.data.error);
        setIsLoading(false);
      });
  };

  return { login, isError, setIsError, isLoading };
}
