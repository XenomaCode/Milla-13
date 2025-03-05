'use client';

import { motion } from 'framer-motion';

interface QuickActionsProps {
  navigateTo: (path: string) => void;
}

const QuickActions = ({ navigateTo }: QuickActionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-zinc-800/70 rounded-lg p-6 border border-amber-400/10"
      >
        <h3 className="text-lg font-bold text-amber-400 mb-3">Añadir Producto</h3>
        <p className="text-gray-400 text-sm mb-4">Agrega un nuevo producto al catálogo de tu cafetería.</p>
        <button 
          onClick={() => navigateTo('/admin/productos/nuevo')}
          className="w-full py-2 bg-amber-400 text-zinc-900 rounded-md hover:bg-amber-300 transition-colors"
        >
          Añadir Producto
        </button>
      </motion.div>
      
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-zinc-800/70 rounded-lg p-6 border border-amber-400/10"
      >
        <h3 className="text-lg font-bold text-amber-400 mb-3">Actualizar Inventario</h3>
        <p className="text-gray-400 text-sm mb-4">Actualiza las existencias de insumos en tu inventario.</p>
        <button 
          onClick={() => navigateTo('/admin/inventario')}
          className="w-full py-2 bg-amber-400 text-zinc-900 rounded-md hover:bg-amber-300 transition-colors"
        >
          Gestionar Inventario
        </button>
      </motion.div>
      
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-zinc-800/70 rounded-lg p-6 border border-amber-400/10"
      >
        <h3 className="text-lg font-bold text-amber-400 mb-3">Gestionar Empleados</h3>
        <p className="text-gray-400 text-sm mb-4">Administra la información de tus empleados.</p>
        <button 
          onClick={() => navigateTo('/admin/empleados')}
          className="w-full py-2 bg-amber-400 text-zinc-900 rounded-md hover:bg-amber-300 transition-colors"
        >
          Ver Empleados
        </button>
      </motion.div>
    </div>
  );
};

export default QuickActions;