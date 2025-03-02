'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(email, password, nombre);
      router.push('/');
    } catch (error: any) {
      console.error('Error al registrar:', error);
      setError(
        error.code === 'auth/email-already-in-use'
          ? 'Este correo ya está registrado'
          : 'Error al crear la cuenta. Inténtalo de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-zinc-900 text-white relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/fondo.png"
          alt="Fondo de granos de café"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-zinc-800/70 p-8 rounded-lg border border-amber-400/20 w-full max-w-md z-10"
      >
        <h1 className="text-3xl font-bold text-amber-400 mb-6 text-center font-serif">Crear Cuenta</h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-md font-medium transition-colors ${
              isLoading
                ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
                : 'bg-amber-400 text-zinc-900 hover:bg-amber-300'
            }`}
          >
            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-gray-400 mb-2">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/auth/login" className="text-amber-400 hover:text-amber-300 transition-colors">
              Iniciar Sesión
            </Link>
          </p>
          <Link href="/" className="text-amber-400 hover:text-amber-300 transition-colors">
            Volver al inicio
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
export default Register;