import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/CreatedContext";
import FormAccount from "../components/FormAccount";
import Header from "../components/Header";
import LabelForm from "../components/LabelForm";
import InputForm from "../components/InputForm";
import SpanError from "../components/SpanError";

export default function AccountDetails() {
  const [userDetails, setUserDetails] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [editUser, setEditUser] = useState(false);
  const { user, URL, isError, setIsError } = useContext(UserContext);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

    axios
      .get(`${URL + "account/" + user.email}`)
      .then((response) => {
        setUserDetails(response.data);
        setName(() => user.name);
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
        value="details"
        userDetails={userDetails}
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
        <InputForm type="email" editUser="email" user={user.email} />

        <LabelForm>Name</LabelForm>
        <InputForm
          type="text"
          text="text"
          editUser={editUser}
          user={name}
          setUser={setName}
          isError={isError}
        />

        <LabelForm>Password</LabelForm>
        <InputForm
          type="password"
          editUser={editUser}
          placeholder="New Password"
          user={password}
          setUser={setPassword}
          isError={isError}
        />

        <InputForm
          type="submit"
          value={editUser ? "save" : "edit"}
          isError={isError}
        />

        {isError && <SpanError type="error">{isError}</SpanError>}
      </FormAccount>
    </section>
  );
}
