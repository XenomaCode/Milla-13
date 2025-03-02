'use client';

import { useState } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ProductItem } from '@/types';
import Image from "next/image";
import Link from "next/link";
import Navbar from '@/components/Navbar';
import { motion } from "framer-motion";

const Menu = () => {
  const [cart, setCart] = useState<(ProductItem & { quantity: number })[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'bebidas', name: 'Bebidas' },
    { id: 'comidas', name: 'Comidas' },
    { id: 'postres', name: 'Postres' }
  ];
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  const addToCart = (product: ProductItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  
  return (
    <div className="min-h-screen bg-zinc-900 text-white relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/fondoo.png"
          alt="Fondo de granos de café"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Barra de navegación */}
      <header className="relative z-10 pt-6 px-4">
        <div className="container mx-auto flex flex-col items-center">
          <Navbar/>
        </div>
      </header>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-amber-400 mb-8 text-center font-serif"
        >
          Nuestro Menú
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10 flex justify-center"
        >
          <div className="flex flex-wrap space-x-2 bg-zinc-800/70 p-2 rounded-lg">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-amber-400 text-zinc-900 font-medium' 
                    : 'text-amber-200 hover:bg-zinc-700'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto max-w-7xl">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + (index % 4) * 0.1 }}
            >
              <ProductCard 
                product={product} 
                onAddToCart={addToCart}
              />
            </motion.div>
          ))}
        </div>
        
        {cart.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-4 right-4 bg-zinc-800 p-4 rounded-lg shadow-lg max-w-xs w-full border border-amber-400/30"
          >
            <h3 className="font-semibold text-amber-400 mb-2">Tu pedido ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</h3>
            <ul className="max-h-40 overflow-y-auto mb-2">
              {cart.map(item => (
                <li key={item.id} className="flex justify-between text-sm py-1 text-gray-200">
                  <span>{item.quantity} x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-amber-400/30 pt-2 font-bold flex justify-between text-white">
              <span>Total:</span>
              <span>${cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</span>
            </div>
            <button 
              className="mt-3 w-full bg-amber-400 text-zinc-900 py-2 rounded hover:bg-amber-300 transition-colors font-medium"
              onClick={() => window.location.href = '/pedido'}
            >
              Completar Pedido
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Menu;