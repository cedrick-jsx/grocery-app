import axios from "axios";

export const LoginUser = (
  email,
  name,
  password,
  isLogin,
  navigate,
  dispatch,
  URL,
  userStatus,
  setIsError
) => {
  axios
    .post(
      URL + "user/" + `${isLogin ? "login" : !isLogin && "signup"}`,
      isLogin ? { email, password } : !isLogin && { email, name, password }
    )
    .then((response) => {
      if (isLogin) {
        dispatch({
          type: userStatus.LOGIN,
          payload: response.data,
        });

        sessionStorage.setItem("userLog", JSON.stringify(response.data));
      } else if (!isLogin) {
        setIsError("Success");

        setTimeout(() => {
          setIsError("");
          navigate("/");
        }, 1000);
      }
    })
    .catch((err) => {
      setIsError(err.response.data.error);
    });
};
