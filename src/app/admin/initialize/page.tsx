'use client';

import { useState } from 'react';
import { initializeDatabase } from '../../../../scripts/initializeDatabases';
import Link from 'next/link';

export default function InitializePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleInitialize = async () => {
    setIsLoading(true);
    setMessage('Inicializando base de datos...');
    
    try {
      await initializeDatabase();
      setMessage('¡Base de datos inicializada correctamente!');
    } catch (error) {
      console.error('Error:', error);
      setMessage(`Error al inicializar: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-3xl font-bold text-amber-400 mb-8">Inicializar Base de Datos</h1>
      
      <div className="bg-zinc-800 p-6 rounded-lg max-w-md mx-auto">
        <p className="mb-6">
          Esta acción creará datos iniciales en tu base de datos de Firebase.
          Solo debe ejecutarse una vez cuando configures tu aplicación por primera vez.
        </p>
        
        <button
          onClick={handleInitialize}
          disabled={isLoading}
          className={`w-full py-3 rounded-md font-medium transition-colors ${
            isLoading
              ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
              : 'bg-amber-400 text-zinc-900 hover:bg-amber-300'
          }`}
        >
          {isLoading ? 'Inicializando...' : 'Inicializar Base de Datos'}
        </button>
        
        {message && (
          <div className="mt-4 p-3 bg-zinc-700 rounded">
            {message}
          </div>
        )}
        
        <div className="mt-6 text-center">
          <Link href="/admin" className="text-amber-400 hover:text-amber-300">
            Volver al panel de administración
          </Link>
        </div>
      </div>
    </div>
  );
} 