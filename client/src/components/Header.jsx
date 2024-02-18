import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/CreatedContext";

export default function Header(props) {
  const navigate = useNavigate();
  const { setIsError } = useContext(UserContext);

  return (
    <h1
      className={`${
        props.value === "grocery"
          ? "absolute top-0 left-0 w-full text-center text-[2rem] mt-4"
          : props.value === "navbar"
          ? "text-[2.5rem] cursor-pointer"
          : props.value === "none" && "text-[5rem]"
      } text-green-950 uppercase font-extrabold`}
      onClick={() => {
        if (props.value === "navbar") {
          setIsError("");
          navigate("/");
        }
      }}
    >
      {props.children}
    </h1>
  );
}
