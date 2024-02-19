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
          "w-2/4 flex flex-col place-content-center place-items-center relative"
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
              "absolute top-14 left-2/4 -translate-x-2/4 font-medium text-green-950"
            }
          >
            {isLogin ? "No Account Yet? " : "Account Ready? "}

            {isError !== "Success" && (
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

          <InputForm
            type="submit"
            value={isLogin ? "login" : "signup"}
            isError={isError}
          />

          {isError && <SpanError type="error">{isError}</SpanError>}
        </FormAccount>
      </div>

      <div
        className={
          "bg-login bg-right bg-contain bg-no-repeat bg-fixed min-h-screen h-screen w-2/4 relative"
        }
      ></div>
    </section>
  );
}
