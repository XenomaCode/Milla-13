'use client';

import { motion } from 'framer-motion';
import { Order } from '@/services/orderService';

interface RecentOrdersProps {
  orders: Order[];
  setActiveTab: (tab: string) => void;
}

const RecentOrders = ({ orders, setActiveTab }: RecentOrdersProps) => {
  // Obtener pedidos recientes (últimos 5)
  const recentOrders = [...orders]
    .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
    .slice(0, 5);
  
  return (
    <div className="bg-zinc-800/70 rounded-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-amber-400 mb-4">Pedidos Recientes</h3>
      
      {recentOrders.length === 0 ? (
        <p className="text-gray-400">No hay pedidos recientes</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-zinc-700">
                <th className="pb-2">ID</th>
                <th className="pb-2">Cliente</th>
                <th className="pb-2">Total</th>
                <th className="pb-2">Estado</th>
                <th className="pb-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-zinc-700/50 hover:bg-zinc-700/30">
                  <td className="py-3">#{order.id?.slice(-6)}</td>
                  <td className="py-3">{order.customerInfo.name}</td>
                  <td className="py-3">${order.total.toFixed(2)}</td>
                  <td className="py-3">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                  </td>
                  <td className="py-3">{new Date(order.createdAt.seconds * 1000).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-4 text-right">
        <button 
          onClick={() => setActiveTab('orders')}
          className="text-amber-400 hover:text-amber-300 transition-colors"
        >
          Ver todos los pedidos →
        </button>
      </div>
    </div>
  );
};

export default RecentOrders;