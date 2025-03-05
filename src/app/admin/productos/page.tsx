'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Sidebar from '@/components/admin/Sidebar';
import { getProducts } from '@/services/productService';

// Importar componentes modales
import CreateProductModal from '@/app/admin/productos/modals/createProductModal';
import EditProductModal from '@/app/admin/productos/modals/editProductModal';
import DeleteProductModal from '@/app/admin/productos/modals/deletProductModal';

// Definir la interfaz para los productos
interface Producto {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  descripcion: string;
  imagen: string;
  disponible: boolean;
  tipo: 'bebida' | 'postre' | 'comida';
  createdAt: any;
}

export default function ProductosAdmin() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('productos');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para los modales
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedProductName, setSelectedProductName] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchProductos();
    }
  }, [user, filter]);

  const fetchProductos = async () => {
    setIsLoading(true);
    try {
      let data;
      if (filter === 'all') {
        data = await getProducts();
      } else {
        data = await getProducts(filter as 'bebida' | 'postre' | 'comida');
      }
      setProductos(data as Producto[]);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenEditModal = (producto: Producto) => {
    setSelectedProductId(producto.id);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (producto: Producto) => {
    setSelectedProductId(producto.id);
    setSelectedProductName(producto.nombre);
    setIsDeleteModalOpen(true);
  };

  const filteredProducts = searchTerm
    ? productos.filter(producto => 
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : productos;

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
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Contenido principal */}
      <div className="ml-64 p-8 relative z-10">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-amber-400 mb-4 md:mb-0"
          >
            Productos
          </motion.h2>

          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="all">Todos los productos</option>
              <option value="bebida">Bebidas</option>
              <option value="comida">Comidas</option>
              <option value="postre">Postres</option>
            </select>

            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 bg-amber-400 text-zinc-900 rounded-md hover:bg-amber-300 transition-colors"
            >
              Añadir Producto
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-t-4 border-amber-400 border-solid rounded-full animate-spin"></div>
              <p className="text-gray-400 mt-4">Cargando productos...</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-zinc-800/70 rounded-lg p-8 text-center">
            <p className="text-gray-400">
              {searchTerm 
                ? `No se encontraron productos que coincidan con "${searchTerm}"` 
                : `No hay productos ${filter !== 'all' ? `de tipo "${filter}"` : ''}`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((producto, index) => (
              <motion.div
                key={producto.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-zinc-800/70 rounded-lg overflow-hidden border border-amber-400/10"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={producto.imagen || '/images/placeholder.jpg'}
                    alt={producto.nombre}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        producto.disponible 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {producto.disponible ? 'Disponible' : 'No disponible'}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-amber-400">{producto.nombre}</h3>
                    <span className="text-lg font-bold">${producto.precio.toFixed(2)}</span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{producto.descripcion}</p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-400">
                      <span className="font-medium">Stock:</span> {producto.cantidad}
                    </span>
                    <span className="text-sm text-gray-400">
                      <span className="font-medium">Tipo:</span> {producto.tipo}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleOpenEditModal(producto)}
                      className="flex-1 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-md transition-colors"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleOpenDeleteModal(producto)}
                      className="w-10 h-10 flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-md transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modales */}
      <CreateProductModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          fetchProductos();
          setIsCreateModalOpen(false);
        }}
      />

      <EditProductModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={() => {
          fetchProductos();
          setIsEditModalOpen(false);
        }}
        productId={selectedProductId}
      />

      <DeleteProductModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={() => {
          fetchProductos();
          setIsDeleteModalOpen(false);
        }}
        productId={selectedProductId}
        productName={selectedProductName}
      />
    </div>
  );
}