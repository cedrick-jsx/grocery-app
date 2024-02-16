export default function FormAccount(props) {
  return (
    <form
      className={`${
        props.value === "login"
          ? "p-[100px_20px_2.5rem_20px]"
          : "p-[80px_20px_35px_20px] text-center"
      } flex flex-col flex-nowrap bg-[#2FDD92] relative rounded outline outline-2 outline-[#0E185F] [box-shadow:rgba(0,0,0,0.35)_0px_5px_15px] transition-all w-[400px]`}
      onSubmit={(e) => {
        e.preventDefault();
        if (props.value === "login") {
          props.login(props.email, props.name, props.password, props.isLogin);
        }
        if (props.value === "details" && !props.editUser) {
          props.setIsError("");
          props.setEditUser(() => !props.editUser);
        }
        if (props.value === "details" && props.editUser) {
          props.saveDetails(
            props.userDetails,
            props.name,
            props.password,
            props.setEditUser
          );
        }
      }}
    >
      {props.children}
    </form>
  );
}
