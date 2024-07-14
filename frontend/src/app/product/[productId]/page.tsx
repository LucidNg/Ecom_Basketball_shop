'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FetchProductByID, Product } from '@/lib/product';

export async function DetailedProductPage ({}) {
  const { productId } = useParams();
  const [mainImage, setMainImage] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<Product | null>(null);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  useEffect(() => {
    async function fetchProduct() {
      if (productId) {
        try {
          const fetchedProduct = await FetchProductByID(productId.toString());
          setProduct(fetchedProduct);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    }

    fetchProduct();
  }, [productId]);

  // const basePath = `/images/products/${productId}`;
  // const imageList = [
  //   `${basePath}/image1.jpg`,
  //   `${basePath}/image2.jpg`,
  //   `${basePath}/image3.jpg`,
  //   `${basePath}/image4.jpg`,
  // ];
  // setImages(imageList);
  // setMainImage(imageList[0]);

  const handleImageClick = (image: string) => {
    setMainImage(image);
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  if (!productId) return null;

  return (
    <div className='w-screen flex flex-col pt-20 bg-base-100'>
      <div className='w-full flex flex-col lg:flex-row '>
        <div className='leftColumn flex flex-col items-center lg:w-2/5 w-full'>
          <div className={`w-[550px] h-[550px] flex items-center justify-center ${!mainImage ? 'bg-gray-300' : ''}`}>
            {mainImage ? (
              <Image src={mainImage} alt='Main Product' className='object-cover w-[500px] h-[500px] border bg-gray-500 opacity-50' height={100} width={100} />
            ) : (
              <span className='text-lg text-gray-500'>No Image Available</span>
            )}
          </div>
          <div className='flex mt-10 space-x-10'>
            {images.map((image, index) => (
              <div key={index} className='w-20 h-20 cursor-pointer border bg-gray-500 opacity-50' onClick={() => handleImageClick(image)}>
                <Image src={image} alt={`Product ${index + 1}`} className='object-cover w-full h-full' height={100} width={100} />
              </div>
            ))}
          </div>
        </div>

        <div className='rightColumn flex flex-col lg:w-3/5 w-full'>
          <span className='text-5xl font-semibold w-4/5 text-base-content leading-normal'>{product?.productName ?? 'Product Name'}</span>
          <span className='text-5xl py-16 mx-20 text-base-content'>$ {product ? new Intl.NumberFormat('vi-VN').format(product.price) : '0'}</span>
          <div className='sizeDisplay grid grid-cols-4 gap-x-12 gap-y-5 lg:w-1/2 w-3/4 mx-20'>
            {sizes.map((size, index) => (
              <div
                key={index}
                className={`flex items-center justify-center w-28 h-12 text-xl cursor-pointer hover:bg-secondary hover:font-semibold ${selectedSize === size ? 'bg-secondary font-semibold' : 'bg-primary text-base-content'}`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </div>
            ))}
          </div>

          <div className='flex flex-row'>
            <div className='quantityControl flex items-center mt-8 w-36 h-10 mx-20'>
              <button
                className='flex items-center justify-center w-1/3 h-full bg-primary text-base-content hover:bg-secondary'
                onClick={decrementQuantity}
              >
                -
              </button>
              <div className='flex items-center justify-center w-1/3 h-full bg-base-100 text-base-content'>
                {quantity}
              </div>
              <button
                className='flex items-center justify-center w-1/3 h-full bg-primary text-base-content hover:bg-secondary'
                onClick={incrementQuantity}
              >
                +
              </button>
            </div>
            <span className='Quantity self-end text-2xl text-base-content'>x item left</span>
          </div>

          <button
            className={`addToCart mt-8 w-1/4 h-20 mx-20 text-2xl font-semibold text-neutral ${selectedSize ? 'bg-secondary' : 'bg-primary text-base-content cursor-not-allowed'}`}
            disabled={!selectedSize}
          >
            Add to cart
          </button>

          <span className='itemDescriptionBox mx-20 mt-10 text-lg text-base-content'>
            {product?.description ?? 'Product description goes here.'}
          </span>
        </div>
      </div>
    </div>
  );
};
