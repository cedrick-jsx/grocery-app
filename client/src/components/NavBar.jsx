import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./Header";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { GroceryContext, UserContext } from "../contexts/CreatedContext";
import { useNavigate } from "react-router";

export default function NavBar() {
  const {
    user,
    dispatch: userDispatch,
    userStatus,
    setIsError,
  } = useContext(UserContext);
  const { dispatch: groceryDispatch, groceryStatus } =
    useContext(GroceryContext);
  const navigate = useNavigate();

  return (
    <nav
      className={
        "flex place-content-between px-[5%] leading-[2] bg-[#2FDD92] sticky top-0 w-full z-10 drop-shadow-lg"
      }
    >
      <Header value="navbar">Grocery App</Header>

      <div className="flex place-content-center place-items-center gap-3 text-[2rem] font-bold">
        <span
          className={"text-green-950 cursor-pointer"}
          onClick={() => {
            setIsError("");
            navigate("/information");
          }}
        >
          {user.name}
        </span>

        <button
          onClick={() => {
            userDispatch({
              type: userStatus.LOGOUT,
            });
            groceryDispatch({
              type: groceryStatus.CLEAR_GROCERY,
              payload: null,
            });
            sessionStorage.clear();
            localStorage.clear();
            setIsError("");
          }}
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className={"[animation:fa-fade_1000ms_infinite]"}
          />
        </button>
      </div>
    </nav>
  );
}
