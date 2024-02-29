import { useContext, useState } from "react";
import Header from "../components/Header";
import InputForm from "../components/InputForm";
import LabelForm from "../components/LabelForm";
import SpanError from "../components/SpanError";
import FormAccount from "../components/FormAccount";
import { UserContext } from "../contexts/CreatedContext";

export default function Account() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { isError, setIsError } = useContext(UserContext);

  return (
    <section
      className={
        "bg-[#B5EAEA] flex place-content-between place-items-center relative"
      }
    >
      <div
        className={
          "w-2/4 flex flex-col place-content-center place-items-center relative 3xs:bg-login 3xs:bg-center 3xs:bg-no-repeat 3xs:bg-fixed 3xs:bg-cover 3xs:min-h-screen 3xs:h-screen 3xs:w-full 2xs:bg-login 2xs:bg-center 2xs:bg-no-repeat 2xs:bg-fixed 2xs:bg-cover 2xs:min-h-screen 2xs:h-screen 2xs:w-full xs:bg-login xs:bg-center xs:bg-no-repeat xs:bg-fixed xs:bg-cover xs:min-h-screen xs:h-screen xs:w-full sm:bg-login sm:bg-center sm:bg-no-repeat sm:bg-fixed sm:bg-cover sm:min-h-screen sm:h-screen sm:w-full md:bg-login md:bg-center md:bg-no-repeat md:bg-fixed md:bg-cover md:min-h-screen md:h-screen md:w-full"
        }
      >
        <FormAccount
          value="login"
          email={email}
          name={name}
          password={password}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        >
          <Header value="grocery">Grocery App</Header>

          <p
            className={
              "absolute left-2/4 top-[65px] -translate-x-2/4 font-medium text-green-950 w-full text-center text-[20px] 3xs:text-[4.5vw] 3xs:top-[50px] 2xs:text-[15px] 2xs:top-[55px]"
            }
          >
            {isLogin ? "No Account Yet? " : "Account Ready? "}

            {isError !== "Success" && isError !== "Connecting" && (
              <span
                className={
                  "underline cursor-pointer text-[#45FFCA] drop-shadow-slogan"
                }
                onClick={() => {
                  setIsLogin(() => !isLogin);
                  setIsError("");
                  setEmail("");
                  setName("");
                  setPassword("");
                }}
              >
                {isLogin ? "Sign up" : "Sign in"}
              </span>
            )}
          </p>

          <LabelForm>Email</LabelForm>
          <InputForm
            type="email"
            placeholder="grocery@app.com"
            user={email}
            setUser={setEmail}
            isError={isError}
          />

          {!isLogin && (
            <>
              <LabelForm>Name</LabelForm>
              <InputForm
                type="text"
                text="text"
                placeholder="Cedrick"
                user={name}
                setUser={setName}
                isError={isError}
              />
            </>
          )}

          <LabelForm>Password</LabelForm>
          <InputForm
            type="password"
            placeholder="Passphrase"
            user={password}
            setUser={setPassword}
            isError={isError}
          />

          <div className={"relative mt-8 w-full"}>
            <InputForm
              type="submit"
              value={isLogin ? "login" : "join"}
              isError={isError}
            />

            {isError && <SpanError type="error">{isError}</SpanError>}
          </div>
        </FormAccount>
      </div>

      <div
        className={
          "bg-login bg-right bg-contain bg-no-repeat bg-fixed min-h-screen h-screen w-2/4 3xs:hidden 2xs:hidden xs:hidden sm:hidden md:hidden"
        }
      ></div>
    </section>
  );
}
