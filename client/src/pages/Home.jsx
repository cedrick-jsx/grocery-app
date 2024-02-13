import Card from "../components/Card";

export default function Home() {
  return (
    <section
      className={
        "flex flex-wrap w-full p-[8%] place-content-evenly place-items-center"
      }
    >
      <Card value="view">View Grocery</Card>
      <Card value="add">Add Grocery</Card>
      <Card value="details">Account Details</Card>
    </section>
  );
}
