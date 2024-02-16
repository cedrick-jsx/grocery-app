import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/CreatedContext";

export const SaveUserDeatails = () => {
  const { user, dispatch, URL } = useContext(UserContext);
  const [isError, setIsError] = useState("");
  const tempUser = JSON.parse(sessionStorage.getItem("userLog"));

  const saveDetails = (userDetails, name, password, setEditUser) => {
    setIsError("");

    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

    axios
      .patch(URL + `account/${userDetails._id}`, {
        name,
        password,
      })
      .then((response) => {
        const updateUser = {
          email: tempUser.email,
          name: response.data,
          token: tempUser.token,
        };

        setEditUser(() => false);

        dispatch({ type: "LOGIN", payload: updateUser });

        sessionStorage.setItem("userLog", JSON.stringify(updateUser));
        setIsError("Success");
      })
      .catch((err) => {
        setIsError(err.response.data.error);
      });
  };

  return { saveDetails, isError, setIsError };
};
