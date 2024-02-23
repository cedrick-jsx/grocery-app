import axios from "axios";

export const DeleteGroceryList = ({
  user,
  URL,
  deleteId: id,
  UpdateList,
  setIsError,
  setIsFetching,
  items,
  groceryDispatch,
  groceryStatus,
  setTempId,
}) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  axios
    .delete(URL + "grocery/" + id)
    .then(() => {
      if (items.length > 1) {
        UpdateList();
        setIsError("");
        setTempId("");
      } else {
        setIsFetching(true);

        groceryDispatch({
          type: groceryStatus.GET_GROCERY,
          payload: null,
        });

        setTimeout(() => {
          setIsFetching(false);
          setIsError("");
          setTempId("");
        }, 1000);
      }
      setIsError("");
    })
    .catch((err) => console.log(err));
};
