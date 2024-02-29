export default function SpanError(props) {
  return (
    <span
      className={`${
        props.children === "Success"
          ? "bg-green-950 border-green-950 text-slate-50"
          : "bg-red-200 border-pink-700 text-pink-800"
      } border-2 leading-[2] font-normal px-2 absolute left-0 top-0 text-[22px] 3xs:text-[5vw] 3xs:px-1 2xs:text-[18px] 2xs:px-1`}
    >
      {props.children}
    </span>
  );
}
