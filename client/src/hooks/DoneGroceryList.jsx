import axios from "axios";

export const DoneGroceryList = ({
  user,
  URL,
  temp,
  setIsError,
  is_done,
  UpdateList,
}) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  axios
    .patch(URL + "grocery/" + temp, { is_done })
    .then((response) => {
      UpdateList();
    })
    .catch((err) => {
      setIsError(err.response.data.error);
    });
};
