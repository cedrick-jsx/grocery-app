import axios from "axios";

export const DoneGroceryList = ({ user, URL, temp, is_done, UpdateList }) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  axios
    .patch(URL + "grocery/" + temp, { is_done })
    .then(() => {
      UpdateList();
    })
    .catch((err) => {
      console.log(err);
    });
};
