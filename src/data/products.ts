import { ProductItem } from '@/types';

export const products: ProductItem[] = [
  {
    id: 1,
    name: 'Café Americano',
    description: 'Café negro suave y aromático',
    price: 2.50,
    category: 'bebidas',
    image: '/images/americano.jpg',
    quantity: 1
  },
  {
    id: 2,
    name: 'Cappuccino',
    description: 'Espresso con leche vaporizada y espuma',
    price: 3.50,
    category: 'bebidas',
    image: '/images/cappuccino.jpg',
    quantity: 1
  },
  {
    id: 3,
    name: 'Latte',
    description: 'Espresso con leche cremosa',
    price: 3.75,
    category: 'bebidas',
    image: '/images/latte.jpg',
    quantity: 1
  },
  {
    id: 4,
    name: 'Sándwich de Jamón y Queso',
    description: 'Pan artesanal con jamón y queso derretido',
    price: 5.50,
    category: 'comidas',
    image: '/images/sandwich.jpg',
    quantity: 1
  },
  {
    id: 5,
    name: 'Croissant',
    description: 'Croissant recién horneado',
    price: 2.75,
    category: 'comidas',
    image: '/images/croissant.jpg',
    quantity: 1
  },
  {
    id: 6,
    name: 'Tarta de Manzana',
    description: 'Tarta casera de manzana con canela',
    price: 4.25,
    category: 'postres',
    image: '/images/apple-pie.jpg',
    quantity: 1
  },
  {
    id: 7,
    name: 'Brownie de Chocolate',
    description: 'Brownie húmedo con trozos de chocolate',
    price: 3.25,
    category: 'postres',
    image: '/images/brownie.jpg',
    quantity: 1
  }
]; 