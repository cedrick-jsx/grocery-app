import { Logo } from "../assets/assets";

export const FetchingData = () => {
  return (
    <section
      className={
        "flex place-content-center place-items-center w-full min-h-screen h-screen"
      }
    >
      <div
        className={
          "flex place-content-center place-items-center rounded-full w-[200px] h-[200px] overflow-hidden animate-bounce"
        }
      >
        <img src={Logo} alt="Logo" className={"scale-[1.7]"} />;
      </div>
    </section>
  );
};
