'use client';
import Card from '@/app/[category]/productComponent/Card';
import ProductPageCli from './page-client';
import { useState } from 'react';

export default function ProductPage() {
  const [hasMoreProducts, setHasMoreProducts] = useState(false);

  const handleCheckHasMoreProducts = (hasMore: boolean) => {
    setHasMoreProducts(hasMore);
  };

  return (
    <ProductPageCli children1={
      <Card
        category=""
        currentPage={1}
        itemsPerPage={15}
        checkHasMoreProducts={handleCheckHasMoreProducts}
        sortBy=""
        minPrice=""
        maxPrice=""
      />}>
    </ProductPageCli>
  );
}
