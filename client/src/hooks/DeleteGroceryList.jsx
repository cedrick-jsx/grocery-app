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
  setEditGrocery,
}) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  axios
    .delete(URL + "grocery/" + id)
    .then(() => {
      if (items.length > 1) {
        UpdateList();
        // setEditGrocery("Connecting");
        // UpdateList();
      } else {
        // setIsFetching(true);

        groceryDispatch({
          type: groceryStatus.GET_GROCERY,
          payload: null,
        });

        UpdateList();
        // setTimeout(() => {
        //   setIsFetching(false);

        //   setIsError("");

        //   setEditGrocery("");
        // }, 300);
      }
    })
    .catch((err) => console.log(err));
};
