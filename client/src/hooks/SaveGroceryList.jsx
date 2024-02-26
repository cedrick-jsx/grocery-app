import axios from "axios";

export const SaveGroceryList = (
  userDetails,
  product,
  volume,
  quantity,
  description,
  URL,
  user,
  setIsError,
  setProduct,
  setVolume,
  setQuantity,
  setDescription
) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  axios
    .post(URL + "grocery/", {
      product,
      volume,
      quantity,
      description,
      user_id: userDetails._id,
      is_done: false,
    })
    .then(() => {
      setIsError("Success");

      setTimeout(() => {
        setProduct("");
        setVolume("");
        setQuantity("");
        setDescription("");
        setIsError("");
      }, 300);
    })
    .catch((err) => {
      setIsError(err.response.data.error);
    });
};
