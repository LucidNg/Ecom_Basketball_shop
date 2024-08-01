import { Suspense } from "react";
import Card from "./homePageComponent/Card";
import Home from "./page-client";
import Loading from "../appComoponent/Loading";


export default function Page() {
  return (
    <Home 
      children1={<Suspense fallback={<Loading/>}><Card limit={5} /></Suspense>}
      children2={<Suspense fallback={<Loading/>}><Card category="shoes" limit={5}/></Suspense>}
      children3={<Suspense fallback={<Loading/>}><Card category="clothes" limit={5} /></Suspense>}
    >
    </Home>
  );
}
