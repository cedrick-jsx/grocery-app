import { useContext, useEffect } from "react";
import Card from "../components/Card";
import { GroceryContext, UserContext } from "../contexts/CreatedContext";
import axios from "axios";

export default function Home() {
  const { user, URL, setIsError } = useContext(UserContext);
  const { dispatch, groceryStatus } = useContext(GroceryContext);

  useEffect(() => {
    setIsError("");

    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

    axios
      .get(URL + "account/" + user.email)
      .then((response) => {
        dispatch({ type: groceryStatus.USER_GROCERY, payload: response.data });
      })
      .catch((err) => {
        setIsError(err.response.data.error);
      });
  }, []);

  return (
    <section
      className={
        "flex flex-wrap w-full p-[150px_5%] place-content-evenly place-items-center"
      }
    >
      <Card value="view">View Grocery</Card>
      <Card value="add">Add Grocery</Card>
      <Card value="details">Account Details</Card>
    </section>
  );
}
