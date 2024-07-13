import Card from "../appComoponent/Card";
import Home from "./page-client";

export default function Page() {
  return (
    <Home 
    children1={<Card limit={5} />}
    children2={<Card limit={5} />}
    children3={<Card limit={5} />}>
    </Home>
  );
}
