'use client';
import Card from "@/app/[category]/productComponent/Card";
import ProductPageCli from "./page-client";

export default function ProductPage() {
  return (
    <ProductPageCli 
    children1={<Card category={""}/>}>
    </ProductPageCli>
  );
}
