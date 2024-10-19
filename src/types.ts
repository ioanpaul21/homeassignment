export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  rating: number;
  thumbnail: string;
  discountPercentage: number;
  reviews: [];
  quantity: number;
  dimensions: {
    height: string;
    width: string;
    depth: string;
  };
  weight: string;
};

export type CartProduct = {
  id: number;
  title: string;
  quantity: number;
};
