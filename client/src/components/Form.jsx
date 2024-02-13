export default function Form(props) {
  return (
    <form
      className={
        "flex flex-col flex-nowrap bg-[#2FDD92] p-[100px_20px_2.5rem_20px] relative w-[400px] rounded outline outline-2 outline-[#0E185F] [box-shadow:rgba(0,0,0,0.35)_0px_5px_15px] transition-all"
      }
      onSubmit={(e) => {
        e.preventDefault();
        props.login(props.email, props.name, props.password, props.isLogin);
      }}
    >
      {props.children}
    </form>
  );
}
