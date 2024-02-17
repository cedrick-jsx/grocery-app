import { useContext, useEffect, useState } from "react";
import FormAccount from "../components/FormAccount";
import Header from "../components/Header";
import InputForm from "../components/InputForm";
import LabelForm from "../components/LabelForm";
import { UserContext } from "../contexts/CreatedContext";
import axios from "axios";
import SpanError from "../components/SpanError";

export const AddGrocery = () => {
  const [userDetails, setUserDetails] = useState("");
  const [product, setProduct] = useState("");
  const [volume, setVolume] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const { user, URL, isError, setIsError } = useContext(UserContext);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

    axios
      .get(`${URL + "account/" + user.email}`)
      .then((response) => {
        setUserDetails(response.data);
        setIsError("");
      })
      .catch((err) => {
        setIsError(err);
      });
  }, []);

  return (
    <section
      className={"flex place-content-center place-items-center p-[150px_5%]"}
    >
      <FormAccount
        value="add"
        userDetails={userDetails}
        product={product}
        setProduct={setProduct}
        volume={volume}
        setVolume={setVolume}
        quantity={quantity}
        setQuantity={setQuantity}
        description={description}
        setDescription={setDescription}
      >
        <Header value="grocery">Add Grocery</Header>

        <LabelForm>Product</LabelForm>
        <InputForm
          type="text"
          placeholder="KitKat"
          text="product"
          user={product}
          setUser={setProduct}
          isError={isError}
        />

        <div className={"flex place-content-between place-items-center"}>
          <div className={"w-2/6"}>
            <LabelForm>Volume</LabelForm>
            <InputForm
              type="text"
              placeholder="45g"
              text="volume"
              user={volume}
              setUser={setVolume}
              isError={isError}
            />
          </div>

          <div className={"w-2/6"}>
            <LabelForm>Quantity</LabelForm>
            <InputForm
              type="number"
              placeholder="10"
              text="many"
              user={quantity}
              setUser={setQuantity}
              isError={isError}
            />
          </div>
        </div>

        <LabelForm>Description</LabelForm>
        <InputForm
          type="text"
          placeholder="Milk Chocolate"
          text="info"
          user={description}
          setUser={setDescription}
          isError={isError}
        />

        <InputForm type="submit" value="add" isError={isError} />

        {isError && <SpanError type="error">{isError}</SpanError>}
      </FormAccount>
    </section>
  );
};
