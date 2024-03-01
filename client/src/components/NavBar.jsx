import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./Header";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { GroceryContext, UserContext } from "../contexts/CreatedContext";
import { useNavigate } from "react-router";
import axios from "axios";

export default function NavBar() {
  const {
    user,
    dispatch: userDispatch,
    URL,
    userStatus,
    setIsError,
  } = useContext(UserContext);
  const {
    userGrocery,
    dispatch: groceryDispatch,
    groceryStatus,
  } = useContext(GroceryContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsError("");

    if (user) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

      axios
        .get(URL + "account/" + user.token)
        .then((response) => {
          groceryDispatch({
            type: groceryStatus.USER_GROCERY,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    } else if (isLoading) {
      if (user) {
        setIsLoading(false);
      }
    }
  }, [user, groceryDispatch]);

  return (
    <nav
      className={
        "flex place-content-between px-[5%] leading-[2] bg-[#2FDD92] sticky top-0 w-full z-10 drop-shadow-lg"
      }
    >
      <Header value="navbar">Grocery App</Header>

      <div className="flex place-content-center place-items-center gap-5 text-[32px] font-bold 3xs:text-[7vw] 2xs:text-[25px]">
        <span
          className={
            "text-green-950 cursor-pointer 3xs:hidden 2xs:hidden xs:hidden"
          }
          onClick={() => {
            setIsError("");
            navigate("/information");
          }}
        >
          {userGrocery && userGrocery.name}
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
            className={"[animation:fa-fade_1000ms_infinite] transition-all"}
          />
        </button>
      </div>
    </nav>
  );
}
