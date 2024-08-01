import { Card } from "./homePageComponent/Card";
import Home from "./page-client";

export default function Page() {
  return (
    <Home 
      children1={<Card limit={5} />}
      children2={<Card category="shoes" limit={5} />}
      children3={<Card category="clothes" limit={5} />}
    >
    </Home>
  );
}
