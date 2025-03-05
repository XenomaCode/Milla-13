'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getOrders, updateOrderStatus, Order } from '@/services/orderService';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Importar componentes
import Sidebar from '@/components/admin/Sidebar';
import DashboardStats from '@/components/admin/DashboardStats';
import RecentOrders from '@/components/admin/RecentOrders';
import QuickActions from '@/components/admin/QuickActions';
import OrdersFilter from '@/components/admin/OrderFilters';
import OrdersList from '@/components/admin/OrderList';

export default function AdminPanel() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('dashboard');
  
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
  
  const navigateTo = (path: string) => {
    router.push(path);
  };
  
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-amber-400 border-solid rounded-full animate-spin"></div>
          <p className="text-white mt-4">Cargando...</p>
        </div>
      </div>
    );
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
      
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      {/* Contenido principal */}
      <div className="ml-64 p-8 relative z-10">
        {activeTab === 'dashboard' ? (
          <>
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-amber-400 mb-8"
            >
              Dashboard
            </motion.h2>
            
            {/* Tarjetas de estadísticas */}
            <DashboardStats 
              orders={orders} 
              setActiveTab={setActiveTab} 
              setFilter={setFilter} 
              navigateTo={navigateTo} 
            />
            
            {/* Pedidos recientes */}
            <RecentOrders 
              orders={orders} 
              setActiveTab={setActiveTab} 
            />
            
            {/* Acciones rápidas */}
            <QuickActions navigateTo={navigateTo} />
          </>
        ) : (
          <>
            {/* Filtro de pedidos */}
            <OrdersFilter 
              filter={filter} 
              setFilter={setFilter} 
              fetchOrders={fetchOrders} 
            />
            
            {/* Lista de pedidos */}
            <OrdersList 
              orders={orders} 
              isLoading={isLoading} 
              filter={filter} 
              handleStatusChange={handleStatusChange} 
            />
          </>
        )}
      </div>
    </div>
  );
}