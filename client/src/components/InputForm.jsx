import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAtom,
  faBarcode,
  faCartArrowDown,
  faEnvelope,
  faFlask,
  faFloppyDisk,
  faLock,
  faPen,
  faRightToBracket,
  faTag,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function InputForm(props) {
  return (
    <div
      className={`${
        props.type === "submit"
          ? "group cursor-pointer absolute right-0 top-0"
          : "relative"
      }`}
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
            "disabled:border-sky-500 disabled:bg-sky-300 disabled:text-sky-950"
          } border-slate-50 placeholder:text-green-700 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-green-950 focus:border-green-950 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 w-full leading-[2] pr-[10px] text-green-950 text-[22px] pl-[43px] border-2 font-medium transition-all 3xs:text-[5vw] 3xs:pl-[30px] 3xs:border-[1px] 2xs:text-[18px] 2xs:pl-[33px] 2xs:border-[1px]`}
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
          } border-green-950 uppercase font-bold leading-[2] border-2 transition-all 3xs:text-[5vw] 3xs:pl-7 3xs:pr-1 2xs:text-[18px] 2xs:pl-7 2xs:pr-1 text-[22px] pl-10 pr-2`}
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
            : props.type === "submit" && props.value === "join"
            ? faUserPlus
            : props.type === "submit" && props.value === "save"
            ? faFloppyDisk
            : props.type === "submit" && props.value === "edit"
            ? faPen
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
            ? `text-stone-950`
            : props.type === "submit" &&
              `${
                props.isError === "Success" || props.isError === "Connecting"
                  ? "pointer-events-none text-slate-50"
                  : "[animation:fa-fade_1000ms_infinite] group-hover:text-slate-50 text-green-900 cursor-pointer"
              }`
        } absolute left-[12px] top-2/4 -translate-y-2/4 transition-all text-[25px] 3xs:text-[6vw] 3xs:left-2 2xs:text-[18px] 2xs:left-2`}
      />
    </div>
  );
}
