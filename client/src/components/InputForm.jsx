import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faRightToBracket,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function InputForm(props) {
  return (
    <div
      className={`${
        props.type === "submit" && "mt-10 place-self-end group"
      } relative`}
    >
      {props.type !== "submit" && (
        <input
          type={props.type}
          value={props.user}
          placeholder={props.placeholder}
          disabled={props.isError === "Success" && true}
          autoComplete="false"
          spellCheck="false"
          className={`border-slate-50 placeholder:text-green-700 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-green-950 focus:border-green-950 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 w-full text-[1.2rem] leading-[2] p-[0_10px_0_40px] border-2 text-green-950 font-medium transition-all`}
          onChange={(e) => {
            props.setUser(() => e.target.value);
          }}
        />
      )}

      {props.type === "submit" && (
        <input
          type={props.type}
          value={props.value}
          disabled={props.isError === "Success" && true}
          className={`${
            props.isError !== "Success"
              ? "group-hover:bg-green-950 group-hover:text-slate-50 cursor-pointer"
              : "pointer-events-none"
          } bg-slate-50 border-green-950 uppercase font-bold w-full text-[1.2rem] leading-[2] p-[0_10px_0_40px] border-2 text-green-950 transition-all`}
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
            : props.type === "text" && faUser
        }
        className={`${
          props.type !== "submit"
            ? `pr-2 scale-150`
            : props.type === "submit" &&
              `${
                props.isError === "Success"
                  ? "pointer-events-none"
                  : "[animation:fa-fade_1000ms_infinite] group-hover:text-green-50 cursor-pointer"
              } scale-125`
        } absolute top-2/4 left-4 -translate-y-2/4 text-green-900 transition-all`}
      />
    </div>
  );
}
