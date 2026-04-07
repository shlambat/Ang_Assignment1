export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
  stockQuantity: number;
  isAvailable: boolean;
}
