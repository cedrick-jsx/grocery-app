import { useContext } from "react";
import { UserContext } from "../contexts/CreatedContext";
import { useNavigate } from "react-router";
import { LoginUser } from "../hooks/LoginUser";
import { SaveUserDetails } from "../hooks/SaveUserDetails";
import { SaveGroceryList } from "../hooks/SaveGroceryList";

export default function FormAccount(props) {
  const navigate = useNavigate("");
  const { user, dispatch, URL, userStatus, setIsError } =
    useContext(UserContext);

  return (
    <form
      className={`${
        props.value === "login"
          ? "p-[100px_20px_2.5rem_20px]"
          : props.value === "details"
          ? "p-[80px_20px_40px_20px]"
          : props.value === "add" && "p-[80px_20px_40px_20px]"
      } flex flex-col flex-nowrap bg-[#2FDD92] relative rounded outline outline-2 outline-[#0E185F] [box-shadow:rgba(0,0,0,0.35)_0px_5px_15px] transition-all w-[400px]`}
      onSubmit={(e) => {
        e.preventDefault();
        setIsError("Connecting");

        switch (props.value) {
          case "login": {
            LoginUser(
              props.email,
              props.name,
              props.password,
              props.isLogin,
              navigate,
              dispatch,
              URL,
              userStatus,
              setIsError
            );
            break;
          }
          case "details": {
            if (!props.editUser) {
              props.setEditUser(!props.editUser);
              setIsError("");
            } else if (props.editUser) {
              SaveUserDetails(
                props.userDetails,
                props.name,
                props.password,
                props.setEditUser,
                URL,
                user,
                dispatch,
                userStatus,
                setIsError,
                props.setPassword
              );
            }
            break;
          }
          case "add": {
            SaveGroceryList(
              props.userDetails,
              props.product,
              props.volume,
              props.quantity,
              props.description,
              URL,
              user,
              setIsError,
              props.setProduct,
              props.setVolume,
              props.setQuantity,
              props.setDescription
            );
            break;
          }
          default:
            return null;
        }
      }}
    >
      {props.children}
    </form>
  );
}
