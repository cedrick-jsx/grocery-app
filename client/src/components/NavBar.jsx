import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./Header";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../contexts/CreatedContext";

export default function NavBar() {
  const { user, dispatch, userStatus, setIsError } = useContext(UserContext);

  return (
    <nav
      className={
        "flex place-content-between px-[5%] leading-[2] bg-[#2FDD92] fixed top-0 w-full z-10 drop-shadow-lg"
      }
    >
      <Header value="navbar">Grocery App</Header>

      <div className="flex place-content-center place-items-center gap-3 text-[2rem] font-bold">
        <p className={"text-green-950"}>{user.name}</p>

        <button
          onClick={() => {
            dispatch({ type: userStatus.LOGOUT });
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
