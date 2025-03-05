'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Modal from '@/components/admin/Modal';
import { updateProduct, getProductById, Producto } from '@/services/productService';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  productId: string | null;
}

const EditProductModal = ({ isOpen, onClose, onSuccess, productId }: EditProductModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    cantidad: '',
    descripcion: '',
    tipo: 'bebida',
    disponible: true,
    imagen: ''
  });
  
  // Cargar datos del producto cuando se abre el modal
  useEffect(() => {
    if (isOpen && productId) {
      loadProductData(productId);
    }
  }, [isOpen, productId]);
  
  const loadProductData = async (id: string) => {
    setIsLoading(true);
    try {
      const product = await getProductById(id);
      setFormData({
        nombre: product.nombre,
        precio: product.precio.toString(),
        cantidad: product.cantidad.toString(),
        descripcion: product.descripcion,
        tipo: product.tipo,
        disponible: product.disponible,
        imagen: product.imagen
      });
      
      if (product.imagen) {
        setPreviewImage(product.imagen);
      }
    } catch (error) {
      console.error('Error al cargar datos del producto:', error);
      alert('No se pudo cargar la información del producto.');
      onClose();
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;
    
    setIsSubmitting(true);
    
    try {
      const imageFile = fileInputRef.current?.files?.[0];
      
      await updateProduct(productId, {
        nombre: formData.nombre,
        precio: parseFloat(formData.precio),
        cantidad: parseInt(formData.cantidad),
        descripcion: formData.descripcion,
        tipo: formData.tipo as 'bebida' | 'postre' | 'comida',
        disponible: formData.disponible
      }, imageFile);
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      alert('Error al actualizar el producto. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Editar Producto" size="lg">
        <div className="flex justify-center py-12">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-t-4 border-amber-400 border-solid rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Cargando datos del producto...</p>
          </div>
        </div>
      </Modal>
    );
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Producto" size="lg">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nombre del Producto
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Precio (MXN)
              </label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Cantidad en Stock
              </label>
              <input
                type="number"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Tipo de Producto
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="bebida">Bebida</option>
                <option value="postre">Postre</option>
                <option value="comida">Comida</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="disponible"
                id="disponible"
                checked={formData.disponible}
                onChange={handleInputChange}
                className="h-4 w-4 text-amber-400 focus:ring-amber-400 border-zinc-600 rounded"
              />
              <label htmlFor="disponible" className="ml-2 block text-sm text-gray-300">
                Disponible para la venta
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Imagen del Producto
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-zinc-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {previewImage ? (
                    <div className="relative w-full h-32 mb-4">
                      <Image
                        src={previewImage}
                        alt="Vista previa"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex text-sm text-gray-400">
                    <label
                      htmlFor="imagen-edit"
                      className="relative cursor-pointer bg-zinc-700 rounded-md font-medium text-amber-400 hover:text-amber-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-amber-400"
                    >
                      <span className="px-3 py-2 block">Cambiar imagen</span>
                      <input
                        id="imagen-edit"
                        name="imagen"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1 pt-2">o arrastra y suelta</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-md transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-md ${
              isSubmitting
                ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
                : 'bg-amber-400 text-zinc-900 hover:bg-amber-300'
            }`}
          >
            {isSubmitting ? 'Guardando...' : 'Actualizar Producto'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProductModal;