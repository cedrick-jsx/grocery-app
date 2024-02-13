export default function Header(props) {
  return (
    <h1
      className={`${
        props.value === "grocery"
          ? "absolute top-0 left-0 w-full text-center text-[2rem] mt-4"
          : props.value === "navbar" && "text-[2.5rem]"
      } text-green-950 uppercase font-extrabold`}
    >
      {props.children}
    </h1>
  );
}
