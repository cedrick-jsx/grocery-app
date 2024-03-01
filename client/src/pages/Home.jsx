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
        "grid w-full p-[10%_5%] place-content-center place-items-center gap-10 lg:grid-cols-3 xl:grid-cols-3 xl:px-[10%] 2xl:grid-cols-3 2xl:px-[15%]"
      }
    >
      <Card value="view">View Grocery</Card>
      <Card value="add">Add Goods</Card>
      <Card value="details">User Details</Card>
    </section>
  );
}
