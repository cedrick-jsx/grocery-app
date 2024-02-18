import { useContext, useEffect } from "react";
import { GroceryContext, UserContext } from "../contexts/CreatedContext";
import axios from "axios";
import Header from "../components/Header";
import { formatDistanceToNow } from "date-fns";

export const ViewGroceryList = () => {
  const { user, URL, setIsError } = useContext(UserContext);

  const { grocery, userGrocery, dispatch, groceryStatus } =
    useContext(GroceryContext);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

    axios
      .get(URL + "grocery/" + userGrocery._id)
      .then((response) => {
        dispatch({
          type: groceryStatus.GET_GROCERY,
          payload: response.data,
        });
      })
      .catch((err) => {
        setIsError(err.response.data.error);
      });
  }, []);

  return (
    <section
      className={
        "flex flex-col place-content-center place-items-center p-[150px_5%]"
      }
    >
      <Header value="navbar">{user.name}'s Grocery List</Header>

      <div className="flex flex-wrap w-full mt-12 gap-10">
        {grocery ? (
          grocery.map((grocery) => (
            <div
              key={grocery._id}
              className={
                "w-[500px] h-[220px] text-3xl [box-shadow:0_0_2px_2px_black] p-5"
              }
            >
              <Sample>Product: {grocery.product}</Sample>
              <Sample>Volume: {grocery.volume}</Sample>
              <Sample>Quantity: {grocery.quantity}</Sample>
              <Sample>Desciption: {grocery.description}</Sample>
              <Sample>
                {formatDistanceToNow(new Date(grocery.createdAt), {
                  addSuffix: true,
                })}
              </Sample>
            </div>
          ))
        ) : (
          <Header value="none">No Grocery Found</Header>
        )}
      </div>
    </section>
  );
};

const Sample = (props) => {
  return <p className={"w-full"}>{props.children}</p>;
};
