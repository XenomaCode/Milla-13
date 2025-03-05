'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const navigateTo = (path: string) => {
    router.push(path);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-zinc-800 z-20 shadow-xl">
      <div className="p-6 border-b border-zinc-700">
        <h1 className="text-2xl font-bold text-amber-400">Milla 13</h1>
        <p className="text-gray-400 text-sm">Panel de Administración</p>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-4 py-3 rounded-md flex items-center transition-colors ${
                activeTab === 'dashboard' ? 'bg-amber-400/20 text-amber-400' : 'hover:bg-zinc-700'
              }`}
            >
              <span className="mr-3">📊</span> Dashboard
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigateTo('/admin/productos')}
              className="w-full text-left px-4 py-3 rounded-md flex items-center hover:bg-zinc-700 transition-colors"
            >
              <span className="mr-3">☕</span> Productos
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigateTo('/admin/inventario')}
              className="w-full text-left px-4 py-3 rounded-md flex items-center hover:bg-zinc-700 transition-colors"
            >
              <span className="mr-3">📦</span> Inventario
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigateTo('/admin/empleados')}
              className="w-full text-left px-4 py-3 rounded-md flex items-center hover:bg-zinc-700 transition-colors"
            >
              <span className="mr-3">👥</span> Empleados
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 rounded-md flex items-center transition-colors ${
                activeTab === 'orders' ? 'bg-amber-400/20 text-amber-400' : 'hover:bg-zinc-700'
              }`}
            >
              <span className="mr-3">🧾</span> Pedidos
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigateTo('/admin/initialize')}
              className="w-full text-left px-4 py-3 rounded-md flex items-center hover:bg-zinc-700 transition-colors"
            >
              <span className="mr-3">🔄</span> Inicializar DB
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="absolute bottom-0 left-0 w-full p-4 border-t border-zinc-700">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-zinc-900 font-bold">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{user?.email}</p>
            <p className="text-xs text-gray-400">Administrador</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full py-2 rounded-md bg-zinc-700 hover:bg-zinc-600 transition-colors text-sm"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;