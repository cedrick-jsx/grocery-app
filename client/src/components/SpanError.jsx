export default function SpanError(props) {
  return (
    <span
      className={`${
        props.children === "Success"
          ? "bg-green-950 border-green-950 text-slate-50"
          : "bg-red-200 border-pink-700 text-pink-800"
      } border-2 leading-[2] text-[1.2rem] font-normal px-4 absolute bottom-10 left-5`}
    >
      {props.children}
    </span>
  );
}
