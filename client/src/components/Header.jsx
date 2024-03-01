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
          ? "absolute top-0 left-0 w-full mt-4 3xs:text-[7vw] 2xs:text-[25px] text-[32px]"
          : props.value === "navbar"
          ? "cursor-pointer 3xs:text-[7vw] 2xs:text-[25px] text-[32px]"
          : props.value === "none" &&
            "text-[80px] 3xs:text-[15vw] 2xs:text-[40px]"
      } text-emerald-950 text-center uppercase font-extrabold`}
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
