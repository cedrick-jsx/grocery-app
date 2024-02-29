export default function LabelForm(props) {
  return (
    <label
      className={`${
        props.value &&
        props.editId === props.itemId &&
        "bg-red-200 text-pink-800 outline outline-2 outline-pink-700 px-5 font-normal"
      } text-green-950 font-medium text-left text-[22px] 3xs:text-[6vw] 2xs:text-[20px]`}
    >
      {props.children}
    </label>
  );
}
