import axios from "axios";

export const UpdateGroceryList = ({
  user,
  URL,
  temp,
  setIsError,
  product,
  volume,
  quantity,
  description,
  is_done,
  setEditUser,
  UpdateList,
  setTempId,
}) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  axios
    .patch(URL + "grocery/" + temp, {
      product,
      volume,
      quantity,
      description,
      is_done,
    })
    .then((response) => {
      UpdateList();

      setIsError("Success");

      setTimeout(() => {
        setEditUser(false);
        setIsError("");
        setTempId("");
      }, 300);
    })
    .catch((err) => {
      setIsError(err.response.data.error);
    });
};
