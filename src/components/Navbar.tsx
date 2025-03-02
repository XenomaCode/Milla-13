'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-amber-400 text-3xl font-serif">Milla 13</h1>
        
        <div className="flex space-x-4">
          {user ? (
            <>
              <Link 
                href="/admin" 
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                Panel Admin
              </Link>
              <button 
                onClick={() => {
                  logout();
                  router.push('/');
                }}
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/auth/login" 
                className="px-6 py-3 bg-amber-400 text-zinc-900 font-medium hover:bg-amber-300 transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link 
                href="/auth/register" 
                className="px-6 py-3 border border-amber-400 text-amber-400 font-medium hover:bg-amber-400/10 transition-colors"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
      
      <nav className="w-full max-w-2xl mx-auto">
        <ul className="flex justify-between items-center">
          <li><Link href="/" className="text-amber-400 hover:text-amber-300 transition-colors">INICIO</Link></li>
          <li><Link href="/nosotros" className="text-white hover:text-amber-300 transition-colors">NOSOTROS</Link></li>
          <li><Link href="/menu" className="text-white hover:text-amber-300 transition-colors">MENÚ</Link></li>
          <li><Link href="/pedido" className="text-white hover:text-amber-300 transition-colors">PEDIDOS</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;