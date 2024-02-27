import { useContext, useEffect, useRef, useState } from "react";
import { GroceryContext, UserContext } from "../contexts/CreatedContext";
import axios from "axios";
import Header from "../components/Header";
import { formatDistanceToNow } from "date-fns";
import { FetchingData } from "../components/FetchingData";
import LabelForm from "../components/LabelForm";
import FormAccount from "../components/FormAccount";
import InputForm from "../components/InputForm";
import SpanError from "../components/SpanError";
import { DeleteGroceryList } from "../hooks/DeleteGroceryList";
import { Buttons } from "../components/Buttons";
import { DoneGroceryList } from "../hooks/DoneGroceryList";

export const ViewGroceryList = () => {
  const { user, URL, isError, setIsError, isFetching, setIsFetching } =
    useContext(UserContext);

  const {
    grocery,
    userGrocery,
    dispatch: groceryDispatch,
    groceryStatus,
  } = useContext(GroceryContext);

  const [tempId, setTempId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState("");
  const [volume, setVolume] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [editUser, setEditUser] = useState(false);
  const [editGrocery, setEditGrocery] = useState("");
  const [editId, setEditId] = useState(null);

  const doneDelete = useRef(false);

  const UpdateList = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

    axios
      .get(URL + "grocery/" + userGrocery._id)
      .then((response) => {
        groceryDispatch({
          type: groceryStatus.GET_GROCERY,
          payload: response.data,
        });

        setIsLoading(false);

        if (editUser && tempId && !doneDelete.current) {
          setEditUser(false);
          setIsError("");
          setTempId("");
        } else if (doneDelete.current) {
          setEditGrocery("");
          setEditId(null);
          doneDelete.current = false;
        }
      })
      .catch((err) => {
        setIsError(err.response.data.error);
      });
  };

  useEffect(() => {
    if (!isFetching && userGrocery) {
      UpdateList();
    }
  }, [userGrocery]);

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
            } w-[1100px] mt-12 gap-10`}
          >
            {grocery &&
              !isFetching &&
              grocery.map((items) => (
                <FormAccount
                  key={items._id}
                  value="view"
                  items={items}
                  editUser={editUser}
                  setEditUser={setEditUser}
                  tempId={tempId}
                  currentId={items._id}
                  product={product}
                  volume={volume}
                  quantity={quantity}
                  description={description}
                  UpdateList={UpdateList}
                  setTempId={setTempId}
                  editGrocery={editGrocery}
                  setEditGrocery={setEditGrocery}
                >
                  <LabelForm>Product</LabelForm>
                  <InputForm
                    type="text"
                    placeholder="KitKat"
                    text="product"
                    user={
                      editUser && tempId === items._id ? product : items.product
                    }
                    setUser={setProduct}
                    isError={isError}
                    editUser={editUser && tempId === items._id ? true : false}
                  />

                  <div
                    className={"flex place-content-between place-items-center"}
                  >
                    <div className={"w-2/4"}>
                      <LabelForm>Volume</LabelForm>
                      <InputForm
                        type="text"
                        placeholder="45g"
                        text="volume"
                        user={
                          editUser && tempId === items._id
                            ? volume
                            : items.volume
                        }
                        setUser={setVolume}
                        isError={isError}
                        editUser={
                          editUser && tempId === items._id ? true : false
                        }
                      />
                    </div>

                    <div className={"w-2/6"}>
                      <LabelForm>Quantity</LabelForm>
                      <InputForm
                        type="number"
                        placeholder="10"
                        text="many"
                        user={
                          editUser && tempId === items._id
                            ? quantity
                            : items.quantity
                        }
                        setUser={setQuantity}
                        isError={isError}
                        editUser={
                          editUser && tempId === items._id ? true : false
                        }
                      />
                    </div>
                  </div>

                  <LabelForm>Description</LabelForm>
                  <InputForm
                    type="text"
                    placeholder="Milk Chocolate"
                    text="info"
                    user={
                      editUser && tempId === items._id
                        ? description
                        : items.description
                    }
                    setUser={setDescription}
                    isError={isError}
                    editUser={editUser && tempId === items._id ? true : false}
                  />

                  {(!editUser || tempId !== items._id) && (
                    <div className={`m-[15px_0_31.5px_0] text-center`}>
                      <LabelForm
                        value={editGrocery}
                        editId={editId}
                        itemId={items._id}
                      >
                        {editGrocery && editId === items._id
                          ? editGrocery
                          : formatDistanceToNow(new Date(items.createdAt), {
                              addSuffix: true,
                            })}
                      </LabelForm>
                    </div>
                  )}

                  {editUser && tempId === items._id && (
                    <>
                      <InputForm type="submit" value="save" isError={isError} />

                      {isError && <SpanError type="error">{isError}</SpanError>}
                    </>
                  )}

                  {tempId !== items._id && (
                    <div
                      className={`${
                        items.is_done
                          ? "place-content-end"
                          : "place-content-evenly"
                      } flex place-items-center w-full absolute bottom-2 left-0 px-5`}
                    >
                      {!items.is_done && editId !== items._id && (
                        <>
                          <Buttons
                            type="edit"
                            submit={() => {
                              setIsError("");
                              setTempId(items._id);
                              setProduct(items.product);
                              setVolume(items.volume);
                              setQuantity(items.quantity);
                              setDescription(items.description);
                              setEditUser(true);
                            }}
                          ></Buttons>

                          <Buttons
                            type="done"
                            submit={() => {
                              setEditGrocery("Connecting");
                              setEditId(items._id);
                              doneDelete.current = true;

                              DoneGroceryList({
                                user,
                                URL,
                                temp: items._id,
                                is_done: true,
                                UpdateList,
                                editGrocery,
                              });
                            }}
                          ></Buttons>
                        </>
                      )}

                      {editId !== items._id && (
                        <Buttons
                          type="delete"
                          submit={() => {
                            setEditGrocery("Connecting");
                            setEditId(items._id);
                            doneDelete.current = true;

                            DeleteGroceryList({
                              user,
                              URL,
                              deleteId: items._id,
                              UpdateList,
                              setIsError,
                              setIsFetching,
                              items: grocery,
                              groceryDispatch,
                              groceryStatus,
                              setEditGrocery,
                              setEditId,
                              doneDelete,
                            });
                          }}
                        >
                          Del
                        </Buttons>
                      )}
                    </div>
                  )}
                </FormAccount>
              ))}

            {!grocery && <Header value="none">{isError}</Header>}
          </div>
        </section>
      )}
    </>
  );
};
