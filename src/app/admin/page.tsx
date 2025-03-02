'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getOrders, updateOrderStatus } from '@/services/orderService';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Define la interfaz para los pedidos
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    pickupTime: string;
    notes?: string;
  };
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export default function AdminPanel() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    // Redireccionar si no hay usuario autenticado
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, filter]);
  
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const status = filter === 'all' ? undefined : filter;
      const data = await getOrders(status);
      setOrders(data as Order[]);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  
  if (loading || !user) {
    return <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <p className="text-white">Cargando...</p>
    </div>;
  }
  
  return (
    <div className="min-h-screen bg-zinc-900 text-white relative">
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="/images/fondo.png"
          alt="Fondo de granos de café"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <header className="relative z-10 bg-zinc-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-amber-400">Panel de Administración</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">{user.email}</span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-md transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
      
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-amber-400 mb-4 md:mb-0"
          >
            Pedidos
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex space-x-2"
          >
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="all">Todos los pedidos</option>
              <option value="pending">Pendientes</option>
              <option value="processing">En proceso</option>
              <option value="completed">Completados</option>
              <option value="cancelled">Cancelados</option>
            </select>
            
            <button 
              onClick={fetchOrders}
              className="px-4 py-2 bg-amber-400 text-zinc-900 rounded-md hover:bg-amber-300 transition-colors"
            >
              Actualizar
            </button>
          </motion.div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <p className="text-gray-400">Cargando pedidos...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-zinc-800/70 rounded-lg p-8 text-center">
            <p className="text-gray-400">No hay pedidos {filter !== 'all' ? `con estado "${filter}"` : ''}</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order, index) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-zinc-800/70 rounded-lg overflow-hidden border border-amber-400/10"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-amber-400">
                        Pedido #{order.id.slice(-6)}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {new Date(order.createdAt.seconds * 1000).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="mt-2 md:mt-0 flex items-center">
                      <span 
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                          order.status === 'processing' ? 'bg-blue-500/20 text-blue-300' :
                          order.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                          'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {order.status === 'pending' ? 'Pendiente' :
                         order.status === 'processing' ? 'En proceso' :
                         order.status === 'completed' ? 'Completado' :
                         'Cancelado'}
                      </span>
                      
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="ml-3 px-2 py-1 bg-zinc-700 border border-zinc-600 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                      >
                        <option value="pending">Pendiente</option>
                        <option value="processing">En proceso</option>
                        <option value="completed">Completado</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-amber-400/80 mb-2">Información del Cliente</h4>
                      <div className="bg-zinc-700/50 p-4 rounded-md">
                        <p><span className="text-gray-400">Nombre:</span> {order.customerInfo.name}</p>
                        <p><span className="text-gray-400">Teléfono:</span> {order.customerInfo.phone}</p>
                        <p><span className="text-gray-400">Email:</span> {order.customerInfo.email}</p>
                        <p><span className="text-gray-400">Hora de recogida:</span> {order.customerInfo.pickupTime}</p>
                        {order.customerInfo.notes && (
                          <p><span className="text-gray-400">Notas:</span> {order.customerInfo.notes}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-amber-400/80 mb-2">Productos</h4>
                      <div className="bg-zinc-700/50 p-4 rounded-md">
                        <ul className="space-y-2">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="flex justify-between">
                              <span>{item.quantity}x {item.name}</span>
                              <span className="text-amber-400">${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="border-t border-zinc-600 mt-3 pt-3 flex justify-between font-bold">
                          <span>Total:</span>
                          <span className="text-amber-400">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 