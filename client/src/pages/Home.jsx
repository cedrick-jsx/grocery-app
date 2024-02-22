import { useContext, useEffect } from "react";
import Card from "../components/Card";
import { UserContext } from "../contexts/CreatedContext";

export default function Home() {
  const { setIsError } = useContext(UserContext);

  useEffect(() => {
    setIsError("");
  }, []);

  return (
    <section
      className={
        "flex flex-wrap w-full p-[5%] place-content-evenly place-items-center"
      }
    >
      <Card value="view">View Grocery</Card>
      <Card value="add">Add Grocery</Card>
      <Card value="details">Account Details</Card>
    </section>
  );
}
