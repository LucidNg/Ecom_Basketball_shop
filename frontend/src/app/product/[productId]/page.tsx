"use client"
import Card from "@/app/[category]/productComponent/Card";
import DetailedProductPageCli from "./page-client";

export default function DetailedProductPage() {


    return (
      <DetailedProductPageCli 
      children1={<Card limit={10} category={""}/>}>
      </DetailedProductPageCli>
    );
  }
