import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormAccount from "./FormAccount";
import LabelForm from "./LabelForm";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/CreatedContext";
import InputForm from "./InputForm";
import Header from "./Header";
import { SaveUserDeatails } from "../hooks/SaveUserDetails";
import SpanError from "./SpanError";

export default function AccountDetails() {
  const [userDetails, setUserDetails] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [editUser, setEditUser] = useState(false);
  const { user, URL } = useContext(UserContext);
  const { saveDetails, isError, setIsError } = SaveUserDeatails();

  useEffect(() => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

      axios
        .get(`${URL + "account/" + user.email}`)
        .then((response) => {
          setUserDetails(response.data);
          setName(() => user.name);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <section
      className={"flex place-content-center place-items-center p-[150px_5%]"}
    >
      <FormAccount
        value="details"
        userDetails={userDetails}
        editUser={editUser}
        setEditUser={setEditUser}
        saveDetails={saveDetails}
        setIsError={setIsError}
        name={name}
        password={password}
      >
        <Header value="grocery">Account Details</Header>

        <FontAwesomeIcon
          icon={faUserCircle}
          className={"text-[5rem] text-green-950"}
        />

        <LabelForm>Email</LabelForm>
        <InputForm type="email" editUser="email" user={user.email} />

        <LabelForm>Name</LabelForm>
        <InputForm
          type="text"
          editUser={editUser}
          user={name}
          setUser={setName}
        />

        <LabelForm>Password</LabelForm>
        <InputForm
          type="password"
          editUser={editUser}
          placeholder="New Password"
          user={password}
          setUser={setPassword}
        />

        <InputForm type="submit" value={editUser ? "save" : "edit"} />

        {isError && <SpanError type="error">{isError}</SpanError>}
      </FormAccount>
    </section>
  );
}
