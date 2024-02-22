import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { GroceryContext, UserContext } from "../contexts/CreatedContext";
import FormAccount from "../components/FormAccount";
import Header from "../components/Header";
import LabelForm from "../components/LabelForm";
import InputForm from "../components/InputForm";
import SpanError from "../components/SpanError";
import { FetchingData } from "../components/FetchingData";

export default function AccountDetails() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [editUser, setEditUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isError, setIsError } = useContext(UserContext);
  const { userGrocery } = useContext(GroceryContext);

  useEffect(() => {
    setIsError("");
  }, []);

  useEffect(() => {
    if (userGrocery) {
      setName(() => userGrocery.name);
      setIsLoading(false);
    }
  }, [userGrocery]);

  return (
    <>
      {isLoading ? (
        <FetchingData />
      ) : (
        <section
          className={"flex place-content-center place-items-center p-[5%]"}
        >
          <FormAccount
            value="details"
            userDetails={userGrocery}
            editUser={editUser}
            setEditUser={setEditUser}
            name={name}
            password={password}
            setPassword={setPassword}
          >
            <Header value="grocery">Account Details</Header>

            <FontAwesomeIcon
              icon={faUserCircle}
              className={"text-[5rem] text-green-950"}
            />

            <LabelForm>Email</LabelForm>
            <InputForm type="email" editUser="email" user={userGrocery.email} />

            <LabelForm>Name</LabelForm>
            <InputForm
              type="text"
              text="text"
              editUser={editUser}
              user={name}
              setUser={setName}
              isError={isError}
            />

            {editUser && (
              <>
                <LabelForm>Password</LabelForm>
                <InputForm
                  type="password"
                  editUser={editUser}
                  placeholder="New Password"
                  user={password}
                  setUser={setPassword}
                  isError={isError}
                />
              </>
            )}

            <InputForm
              type="submit"
              value={editUser ? "save" : "edit"}
              isError={isError}
            />

            {isError && <SpanError type="error">{isError}</SpanError>}
          </FormAccount>
        </section>
      )}
    </>
  );
}
