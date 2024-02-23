import { useContext } from "react";
import { GroceryContext, UserContext } from "../contexts/CreatedContext";
import { useNavigate } from "react-router";
import { LoginUser } from "../hooks/LoginUser";
import { SaveUserDetails } from "../hooks/SaveUserDetails";
import { SaveGroceryList } from "../hooks/SaveGroceryList";
import { UpdateGroceryList } from "../hooks/UpdateGroceryList";

export default function FormAccount(props) {
  const navigate = useNavigate();

  const {
    user,
    dispatch: userDispatch,
    URL,
    userStatus,
    setIsError,
  } = useContext(UserContext);

  const { dispatch: groceryDispatch, groceryStatus } =
    useContext(GroceryContext);

  return (
    <form
      className={`${
        props.value === "login"
          ? "bg-[#2FDD92] p-[100px_20px_2.5rem_20px]"
          : props.value === "details"
          ? "bg-sky-400 p-[80px_20px_40px_20px]"
          : props.value === "add"
          ? "bg-sky-400 p-[80px_20px_40px_20px]"
          : props.value === "view" &&
            "bg-sky-200 outline-0 w-full p-[20px_20px_40px_20px]"
      } flex flex-col flex-nowrap relative rounded outline outline-2 outline-[#0E185F] [box-shadow:rgba(0,0,0,0.35)_0px_5px_15px] transition-all w-[400px]`}
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
              userDispatch,
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
                groceryDispatch,
                groceryStatus,
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

          case "view": {
            if (props.editUser && props.tempId === props.currentId) {
              UpdateGroceryList({
                user,
                URL,
                temp: props.tempId,
                setIsError,
                product: props.product,
                volume: props.volume,
                quantity: props.quantity,
                description: props.description,
                is_done: false,
                setEditUser: props.setEditUser,
                UpdateList: props.UpdateList,
                setTempId: props.setTempId,
              });
            }
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
