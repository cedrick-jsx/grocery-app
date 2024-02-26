import axios from "axios";

export const SaveUserDetails = (
  userDetails,
  name,
  password,
  setEditUser,
  URL,
  user,
  groceryDispatch,
  groceryStatus,
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
      groceryDispatch({
        type: groceryStatus.USER_GROCERY,
        payload: response.data,
      });

      setIsError("Success");

      setTimeout(() => {
        setEditUser(false);
        setIsError("");
        setPassword("");
      }, 300);
    })
    .catch((err) => {
      setIsError(err.response.data.error);
    });
};
