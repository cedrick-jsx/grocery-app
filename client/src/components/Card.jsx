import { faCartPlus, faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

export default function Card(props) {
  const navigate = useNavigate();

  return (
    <button
      className={
        "bg-sky-500 text-blue-950 transition-all [box-shadow:rgba(0,0,0,0.35)_0px_5px_15px] hover:[box-shadow:-10px_-10px_10px_0_#9EDDFF,-10px_-10px_0_3px_#332FD0] hover:translate-x-[10px] hover:translate-y-[10px] group/card"
      }
      onClick={() => {
        if (props.value === "details") {
          navigate("/information");
        }

        if (props.value === "add") {
          navigate("/add");
        }
      }}
    >
      <div
        className={
          "flex place-content-center place-items-center w-[250px] h-[200px] overflow-hidden"
        }
      >
        <FontAwesomeIcon
          icon={
            props.value === "view"
              ? faList
              : props.value === "add"
              ? faCartPlus
              : props.value === "details" && faUser
          }
          className={"text-[5rem] group-hover/card:scale-150 transition-all"}
        />
      </div>

      <div
        className={
          "w-full h-[100px] bg-blue-800 flex place-content-center place-items-center text-blue-50 text-[1.5rem] font-medium"
        }
      >
        {props.children}
      </div>
    </button>
  );
}
