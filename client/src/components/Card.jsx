import { faCartPlus, faList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

export default function Card(props) {
  const navigate = useNavigate();

  return (
    <button
      className={
        "bg-sky-500 text-blue-950 transition-all [box-shadow:rgba(0,0,0,0.35)_0px_5px_15px] hover:[box-shadow:-10px_-10px_10px_0_#9EDDFF,-10px_-10px_0_3px_#332FD0] hover:translate-x-[10px] hover:translate-y-[10px] group/card 3xs:w-[70vw] 2xs:w-[250px]"
      }
      onClick={() => {
        switch (props.value) {
          case "details": {
            navigate("/information");
            break;
          }
          case "add": {
            navigate("/add");
            break;
          }
          case "view": {
            navigate("/view");
            break;
          }
          default:
            return null;
        }
      }}
    >
      <div
        className={
          "flex place-content-center place-items-center w-[250px] h-[200px] overflow-hidden 3xs:w-full 3xs:h-[50vw]"
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
          className={"text-[80px] transition-all 3xs:text-[20vw]"}
        />
      </div>

      <div
        className={
          "w-full h-[100px] bg-blue-800 flex place-content-center place-items-center text-blue-50 text-[25px] font-medium 3xs:h-[30vw] 3xs:text-[6vw]"
        }
      >
        {props.children}
      </div>
    </button>
  );
}
