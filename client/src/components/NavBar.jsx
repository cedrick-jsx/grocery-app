import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./Header";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { userStatus } from "../hooks/UserReducer";
import { UserContext } from "../contexts/CreatedContext";

export default function NavBar() {
  const { dispatch } = useContext(UserContext);
  const userName = JSON.parse(sessionStorage.userLog);

  return (
    <nav
      className={"flex place-content-between px-[5%] leading-[2] bg-[#2FDD92]"}
    >
      <Header value="navbar">Grocery App</Header>

      <div className="flex place-content-center place-items-center gap-3 text-[2rem] font-bold">
        <p className={"text-green-950"}>{userName.name}</p>

        <button
          onClick={() => {
            dispatch({ type: userStatus.LOGOUT });
            sessionStorage.clear();
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
