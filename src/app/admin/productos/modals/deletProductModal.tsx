'use client';

import { useState } from 'react';
import Modal from '@/components/admin/Modal';
import { deleteProduct } from '@/services/productService';

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  productId: string | null;
  productName: string;
}

const DeleteProductModal = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  productId, 
  productName 
}: DeleteProductModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    if (!productId) return;
    
    setIsDeleting(true);
    try {
      await deleteProduct(productId);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error al eliminar el producto. Inténtalo de nuevo.');
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Eliminar Producto" size="sm">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-2">¿Eliminar este producto?</h3>
        <p className="text-sm text-gray-400 mb-6">
          ¿Estás seguro de que deseas eliminar <span className="font-semibold text-amber-400">{productName}</span>? 
          Esta acción no se puede deshacer.
        </p>
        
        <div className="flex justify-center space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-md transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className={`px-4 py-2 rounded-md ${
              isDeleting
                ? 'bg-red-800 text-red-300 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteProductModal;