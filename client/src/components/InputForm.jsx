import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAtom,
  faBarcode,
  faCartArrowDown,
  faEnvelope,
  faFlask,
  faFloppyDisk,
  faLock,
  faRightToBracket,
  faTag,
  faUser,
  faUserPen,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function InputForm(props) {
  return (
    <div
      className={`${
        props.type === "submit" && "mt-10 place-self-end group cursor-pointer"
      } relative`}
    >
      {props.type !== "submit" && (
        <input
          type={props.type}
          value={props.user}
          placeholder={props.placeholder}
          disabled={
            (props.isError === "Success" ||
              props.isError === "Connecting" ||
              props.editUser === "email" ||
              props.editUser === false) &&
            true
          }
          autoComplete="false"
          spellCheck="false"
          className={`${
            (props.text === "product" ||
              props.text === "volume" ||
              props.text === "many" ||
              props.text === "info") &&
            "disabled:border-sky-600 disabled:bg-sky-500 disabled:text-sky-950"
          } border-slate-50 placeholder:text-green-700 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-green-950 focus:border-green-950 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 w-full text-[1.2rem] leading-[2] p-[0_10px_0_40px] border-2 text-green-950 font-medium transition-all`}
          onChange={(e) => {
            props.setUser(() => e.target.value);
          }}
        />
      )}

      {props.type === "submit" && (
        <input
          type={props.type}
          value={props.value}
          disabled={
            (props.isError === "Success" || props.isError === "Connecting") &&
            true
          }
          className={`${
            props.isError === "Success" || props.isError === "Connecting"
              ? "pointer-events-none bg-green-950 text-slate-50"
              : "group-hover:bg-green-950 group-hover:text-slate-50 bg-slate-50 text-green-950 cursor-pointer"
          } border-green-950 uppercase font-bold w-full text-[1.2rem] leading-[2] p-[0_10px_0_40px] border-2 transition-all`}
        />
      )}

      <FontAwesomeIcon
        icon={
          props.type === "email"
            ? faEnvelope
            : props.type === "password"
            ? faLock
            : props.type === "submit" && props.value === "login"
            ? faRightToBracket
            : props.type === "submit" && props.value === "signup"
            ? faUserPlus
            : props.type === "submit" && props.value === "save"
            ? faFloppyDisk
            : props.type === "submit" && props.value === "edit"
            ? faUserPen
            : props.type === "submit" && props.value === "add"
            ? faCartArrowDown
            : props.type === "number" && props.text === "many"
            ? faAtom
            : props.type === "text" && props.text === "product"
            ? faTag
            : props.type === "text" && props.text === "volume"
            ? faFlask
            : props.type === "text" && props.text === "info"
            ? faBarcode
            : props.type === "text" && props.text === "text" && faUser
        }
        className={`${
          props.type !== "submit"
            ? `pr-2 scale-150 text-stone-950`
            : props.type === "submit" &&
              `${
                props.isError === "Success" || props.isError === "Connecting"
                  ? "pointer-events-none text-slate-50"
                  : "[animation:fa-fade_1000ms_infinite] group-hover:text-slate-50 text-green-900 cursor-pointer"
              } scale-125`
        } absolute top-2/4 left-4 -translate-y-2/4 transition-all`}
      />
    </div>
  );
}
