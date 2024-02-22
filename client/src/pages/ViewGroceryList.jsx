import { useContext, useEffect, useState } from "react";
import { GroceryContext, UserContext } from "../contexts/CreatedContext";
import axios from "axios";
import Header from "../components/Header";
import { formatDistanceToNow } from "date-fns";
import { FetchingData } from "../components/FetchingData";
import LabelForm from "../components/LabelForm";
import FormAccount from "../components/FormAccount";
import InputForm from "../components/InputForm";

export const ViewGroceryList = () => {
  const { user, URL, isError, setIsError, isFetching } =
    useContext(UserContext);

  const {
    grocery,
    userGrocery,
    dispatch: groceryDispatch,
    groceryStatus,
  } = useContext(GroceryContext);

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState("");
  const [volume, setVolume] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [editUser, setEditUser] = useState(false);

  useEffect(() => {
    if (!isFetching && userGrocery) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

      axios
        .get(URL + "grocery/" + userGrocery._id)
        .then((response) => {
          groceryDispatch({
            type: groceryStatus.GET_GROCERY,
            payload: response.data,
          });
          setIsLoading(false);
        })
        .catch((err) => {
          setIsError(err.response.data.error);
        });
    }
  }, [groceryDispatch, userGrocery]);

  return (
    <>
      {isLoading && !isError ? (
        <FetchingData />
      ) : (
        <section
          className={
            "flex flex-col place-content-center place-items-center p-[5%]"
          }
        >
          <Header value="navbar">{userGrocery.name}'s Grocery List</Header>

          <div
            className={`${
              !grocery
                ? "flex place-content-center place-items-center"
                : "grid grid-cols-3"
            } w-[1050px] mt-12 gap-10`}
          >
            {grocery &&
              !isFetching &&
              grocery.map((items) => (
                <FormAccount
                  key={items._id}
                  value="view"
                  editUser={editUser}
                  setEditUser={setEditUser}
                >
                  <div>
                    <LabelForm>Product</LabelForm>
                    <InputForm
                      type="text"
                      placeholder="KitKat"
                      text="product"
                      user={editUser ? product : items.product}
                      setUser={setProduct}
                      isError={isError}
                      editUser={editUser}
                    />

                    <div
                      className={
                        "flex place-content-between place-items-center"
                      }
                    >
                      <div className={"w-2/4"}>
                        <LabelForm>Volume</LabelForm>
                        <InputForm
                          type="text"
                          placeholder="45g"
                          text="volume"
                          user={editUser ? volume : items.volume}
                          setUser={setVolume}
                          isError={isError}
                          editUser={editUser}
                        />
                      </div>

                      <div className={"w-2/6"}>
                        <LabelForm>Quantity</LabelForm>
                        <InputForm
                          type="number"
                          placeholder="10"
                          text="many"
                          user={editUser ? quantity : items.quantity}
                          setUser={setQuantity}
                          isError={isError}
                          editUser={editUser}
                        />
                      </div>
                    </div>

                    <LabelForm>Description</LabelForm>
                    <InputForm
                      type="text"
                      placeholder="Milk Chocolate"
                      text="info"
                      user={editUser ? description : items.description}
                      setUser={setDescription}
                      isError={isError}
                      editUser={editUser}
                    />

                    <br />
                    <LabelForm>
                      {formatDistanceToNow(new Date(items.createdAt), {
                        addSuffix: true,
                      })}
                    </LabelForm>
                  </div>

                  <div
                    className={
                      "flex place-content-between place-items-center w-full"
                    }
                  >
                    <input type="submit" value="Edit" />
                    <input type="submit" value="Done" />
                    <input type="submit" value="Delete" />
                  </div>
                </FormAccount>
              ))}

            {!grocery && <Header value="none">{isError}</Header>}
          </div>
        </section>
      )}
    </>
  );
};
