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
          "flex place-content-center place-items-center rounded-full w-[200px] h-[200px] overflow-hidden animate-bounce 3xs:w-[50vw] 3xs:h-[50vw] 2xs:w-[150px] 2xs:h-[150px]"
        }
      >
        <img src={Logo} alt="Logo" className={"scale-[1.7]"} />;
      </div>
    </section>
  );
};
