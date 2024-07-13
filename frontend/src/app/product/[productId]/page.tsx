"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const DetailedProductPage = () => {
  const { productId } = useParams();
  const [mainImage, setMainImage] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (productId) {
      // Load images based on the productId
      const loadImages = async () => {
        const basePath = `/images/products/${productId}`;
        const imageList = [
          `${basePath}/image1.jpg`,
          `${basePath}/image2.jpg`,
          `${basePath}/image3.jpg`,
          `${basePath}/image4.jpg`,
        ];
        setImages(imageList);
        setMainImage(imageList[0]);
      };

      loadImages();
    }
  }, [productId]);

  const handleImageClick = (image: string) => {
    setMainImage(image);
  };

  if (!productId) return null;

  return (
    <div className="flex flex-col items-center">
      <div className="w-64 h-64">
        {mainImage && <img src={mainImage} alt="Main Product" className="object-cover w-full h-full" />}
      </div>
      <div className="flex mt-4 space-x-2">
        {images.map((image, index) => (
          <div key={index} className="w-16 h-16 cursor-pointer" onClick={() => handleImageClick(image)}>
            <img src={image} alt={`Product ${index + 1}`} className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedProductPage;
