export default function LabelForm(props) {
  return (
    <label className={"text-green-950 text-[1.5rem] font-medium"}>
      {props.children}
    </label>
  );
}
