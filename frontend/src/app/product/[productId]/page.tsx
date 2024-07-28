'use client';
import Card from '@/app/[category]/productComponent/Card';
import { useState } from 'react';
import DetailedProductPageCli from './page-client';

export default function ProductPage() {
  const [hasMoreProducts, setHasMoreProducts] = useState(false);

  const handleCheckHasMoreProducts = (hasMore: boolean) => {
    setHasMoreProducts(hasMore);
  };

  return (
    <DetailedProductPageCli children1={
      <Card
        category=""
        currentPage={1}
        itemsPerPage={15}
        checkHasMoreProducts={handleCheckHasMoreProducts}
        sortBy=""
        minPrice=""
        maxPrice=""
      />}>
    </DetailedProductPageCli>
  );
}
