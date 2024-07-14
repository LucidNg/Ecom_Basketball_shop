import {Card, Card2, Card3} from "./homePageComponent/Card";
import Home from "./page-client";

export default function Page() {
  return (
    <Home 
    children1={<Card limit={5} />}
    children2={<Card2 limit={5} />}
    children3={<Card3 limit={5} />}>
    </Home>
  );
}
