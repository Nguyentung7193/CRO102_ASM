export interface Product {
  id: string;
  title: string;  // From your API/data
  description: string;
  price: number;
  image: string;
}

export interface CartItemProduct extends Omit<Product, 'title'> {
  name: string;  // For CartItem component
  quantity: number;
}