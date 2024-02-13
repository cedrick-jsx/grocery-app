import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./Header";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { userContext } from "../contexts/usersContext";

export default function NavBar() {
  const user = useContext(userContext);
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
            user.dispatch({ type: "LOGOUT" });
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
