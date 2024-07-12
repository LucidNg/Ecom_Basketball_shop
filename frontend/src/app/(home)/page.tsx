import Card from "./homePageComponent/Card";
import Home from "./page-client";

export default function Page() {
  return (
    <Home children1={
      <Card/>
    }>
    </Home>
  );
}
