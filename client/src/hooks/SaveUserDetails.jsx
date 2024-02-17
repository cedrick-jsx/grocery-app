import axios from "axios";

export const SaveUserDetails = (
  userDetails,
  name,
  password,
  setEditUser,
  URL,
  user,
  dispatch,
  userStatus,
  setIsError,
  setPassword
) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  axios
    .patch(URL + "account/" + userDetails._id, {
      name,
      password,
    })
    .then((response) => {
      const tempUser = JSON.parse(sessionStorage.getItem("userLog"));
      const updateUser = {
        email: tempUser.email,
        name: response.data,
        token: tempUser.token,
      };

      dispatch({ type: userStatus.LOGIN, payload: updateUser });

      sessionStorage.setItem("userLog", JSON.stringify(updateUser));

      setIsError("Success");
      setTimeout(() => {
        setEditUser(false);
        setIsError("");
        setPassword("");
      }, 1000);
    })
    .catch((err) => {
      setIsError(err.response.data.error);
    });
};
