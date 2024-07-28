export interface IProduct {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export type ProductCardProps = {
  product: IProduct;
};
