'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductItem } from '@/types';
import Navbar from '@/components/Navbar';
import { motion } from "framer-motion";
import { createOrder } from '@/services/orderService';

const OrderPage = () => {
  const [cart, setCart] = useState<ProductItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    pickupTime: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeItem = (id: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Mostrar indicador de carga
      setIsSubmitting(true);
      
      // Crear el pedido en Firebase
      const orderId = await createOrder(cart, customerInfo, totalAmount);
      
      // Limpiar el carrito
      localStorage.removeItem('cart');
      setCart([]);
      
      // Resetear el formulario
      setCustomerInfo({
        name: '',
        phone: '',
        email: '',
        pickupTime: '',
        notes: ''
      });
      
      // Mostrar mensaje de éxito
      alert(`¡Pedido #${orderId} enviado con éxito! Te contactaremos pronto.`);
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      alert('Hubo un error al procesar tu pedido. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Generar opciones de tiempo para recoger (cada 15 minutos)
  const generateTimeOptions = () => {
    const options = [];
    const startHour = 8; // 8 AM
    const endHour = 20; // 8 PM

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(timeString);
      }
    }

    return options;
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
          Finaliza tu Pedido
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Resumen del pedido */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-zinc-800/70 p-6 rounded-lg border border-amber-400/20"
          >
            <h2 className="text-xl font-semibold text-amber-400 mb-4">Tu Pedido</h2>

            {cart.length === 0 ? (
              <p className="text-gray-400">Tu carrito está vacío</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item, index) => (
                    <motion.div 
                      key={item.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex justify-between items-center py-3 border-b border-zinc-700 last:border-0"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{item.name}</h3>
                        <p className="text-sm text-gray-400">${item.price.toFixed(2)} c/u</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-zinc-700 rounded-full text-amber-400 hover:bg-zinc-600"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-zinc-700 rounded-full text-amber-400 hover:bg-zinc-600"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-2 text-red-400 hover:text-red-300"
                        >
                          ✕
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="border-t border-zinc-700 pt-4"
                >
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-amber-400">${totalAmount.toFixed(2)}</span>
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>

          {/* Formulario de información del cliente */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-zinc-800/70 p-6 rounded-lg border border-amber-400/20"
          >
            <h2 className="text-xl font-semibold text-amber-400 mb-4">Información de Contacto</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-300 mb-1">
                  Hora de recogida
                </label>
                <select
                  id="pickupTime"
                  name="pickupTime"
                  value={customerInfo.pickupTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="">Selecciona una hora</option>
                  {generateTimeOptions().map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">
                  Notas adicionales
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={customerInfo.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </motion.div>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                type="submit"
                disabled={cart.length === 0 || isSubmitting}
                className={`w-full py-3 rounded-md font-medium transition-colors ${
                  cart.length === 0
                    ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
                    : isSubmitting
                      ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
                      : 'bg-amber-400 text-zinc-900 hover:bg-amber-300'
                }`}
              >
                Confirmar Pedido
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;