export default function LabelForm(props) {
  return (
    <label
      className={`${
        props.value &&
        props.editId === props.itemId &&
        "bg-red-200 text-pink-800 outline outline-2 outline-pink-700 px-5"
      } text-green-950 text-[1.5rem] font-medium text-left`}
    >
      {props.children}
    </label>
  );
}
