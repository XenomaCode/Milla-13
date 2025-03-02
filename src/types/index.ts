export interface ProductItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'bebidas' | 'comidas' | 'postres';
  image?: string;
  quantity: number;
} 