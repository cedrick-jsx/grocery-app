import { useNavigate } from "react-router";

export default function Header(props) {
  const navigate = useNavigate();

  return (
    <h1
      className={`${
        props.value === "grocery"
          ? "absolute top-0 left-0 w-full text-center text-[2rem] mt-4"
          : props.value === "navbar" && "text-[2.5rem] cursor-pointer"
      } text-green-950 uppercase font-extrabold`}
      onClick={() => {
        if (props.value === "navbar") {
          navigate("/");
        }
      }}
    >
      {props.children}
    </h1>
  );
}
