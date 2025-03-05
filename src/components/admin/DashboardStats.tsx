'use client';

import { Order } from '@/services/orderService';
import DashboardCard from './DashboardCard';

interface DashboardStatsProps {
  orders: Order[];
  setActiveTab: (tab: string) => void;
  setFilter: (filter: string) => void;
  navigateTo: (path: string) => void;
}

const DashboardStats = ({ orders, setActiveTab, setFilter, navigateTo }: DashboardStatsProps) => {
  // Calcular estadísticas
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;
  const totalSales = orders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + order.total, 0);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <DashboardCard 
        title="Pedidos Pendientes" 
        value={pendingOrders} 
        icon="⏳" 
        color="border-yellow-500"
        onClick={() => {
          setActiveTab('orders');
          setFilter('pending');
        }}
      />
      <DashboardCard 
        title="Pedidos Completados" 
        value={completedOrders} 
        icon="✅" 
        color="border-green-500"
        onClick={() => {
          setActiveTab('orders');
          setFilter('completed');
        }}
      />
      <DashboardCard 
        title="Ventas Totales" 
        value={`$${totalSales.toFixed(2)}`} 
        icon="💰" 
        color="border-amber-500" 
      />
      <DashboardCard 
        title="Productos" 
        value="Ver Catálogo" 
        icon="☕" 
        color="border-blue-500"
        onClick={() => navigateTo('/admin/productos')}
      />
    </div>
  );
};

export default DashboardStats;