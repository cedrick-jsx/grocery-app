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
  setEditId,
  doneDelete,
}) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  axios
    .delete(URL + "grocery/" + id)
    .then(() => {
      if (items.length > 1) {
        UpdateList();
      } else {
        setIsFetching(true);

        groceryDispatch({
          type: groceryStatus.GET_GROCERY,
          payload: null,
        });

        setTimeout(() => {
          setIsFetching(false);
          setIsError("");
          setEditGrocery("");
          setEditId("");
          doneDelete.current = false;
        }, 300);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
