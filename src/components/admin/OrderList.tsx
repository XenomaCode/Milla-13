'use client';

import { motion } from 'framer-motion';
import { Order } from '@/services/orderService';

interface OrdersListProps {
  orders: Order[];
  isLoading: boolean;
  filter: string;
  handleStatusChange: (orderId: string, newStatus: string) => void;
}

const OrdersList = ({ orders, isLoading, filter, handleStatusChange }: OrdersListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-t-4 border-amber-400 border-solid rounded-full animate-spin"></div>
          <p className="text-gray-400 mt-4">Cargando pedidos...</p>
        </div>
      </div>
    );
  }
  
  if (orders.length === 0) {
    return (
      <div className="bg-zinc-800/70 rounded-lg p-8 text-center">
        <p className="text-gray-400">No hay pedidos {filter !== 'all' ? `con estado "${filter}"` : ''}</p>
      </div>
    );
  }
  
  return (
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
                  Pedido #{order.id?.slice(-6)}
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
                  onChange={(e) => handleStatusChange(order.id || '', e.target.value)}
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
  );
};

export default OrdersList;