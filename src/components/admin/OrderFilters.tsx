'use client';

import { motion } from 'framer-motion';

interface OrdersFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
  fetchOrders: () => void;
}

const OrdersFilter = ({ filter, setFilter, fetchOrders }: OrdersFilterProps) => {
  return (
    <div className="mb-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <h3 className="text-xl font-bold text-amber-400 mb-4 sm:mb-0">Pedidos</h3>
        
        <div className="flex space-x-3">
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
        </div>
      </motion.div>
    </div>
  );
};

export default OrdersFilter;