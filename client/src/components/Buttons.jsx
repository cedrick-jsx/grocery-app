import {
  faCheckDouble,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Buttons = (props) => {
  return (
    <button onClick={props.submit}>
      <FontAwesomeIcon
        icon={
          props.type === "edit"
            ? faPen
            : props.type === "done"
            ? faCheckDouble
            : props.type === "delete" && faTrashCan
        }
        className={`${
          props.type === "edit"
            ? "text-yellow-500"
            : props.type === "done"
            ? "text-emerald-500"
            : props.type === "delete" && "text-red-500"
        } hover:scale-150 [filter:drop-shadow(-2px_-2px_1px_black)] transition-all text-[35px] 3xs:text-[10vw] 2xs:text-[30px]`}
      />
    </button>
  );
};
