import Image from 'next/image';
import { ProductItem } from '@/types';

interface ProductCardProps {
  product: ProductItem;
  onAddToCart: (product: ProductItem) => void;
  darkMode?: boolean;
}

const ProductCard = ({ product, onAddToCart, darkMode = true }: ProductCardProps) => {
  // Configuración de colores basada en el modo oscuro/claro
  const cardBg = darkMode ? 'bg-zinc-800' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-amber-900';
  const descColor = darkMode ? 'text-gray-300' : 'text-gray-600';
  const priceColor = darkMode ? 'text-amber-400' : 'text-amber-800';
  const buttonBg = darkMode ? 'bg-amber-400 text-zinc-900 hover:bg-amber-300' : 'bg-amber-600 text-white hover:bg-amber-700';
  const noImageBg = darkMode ? 'bg-zinc-700' : 'bg-amber-200';
  const noImageText = darkMode ? 'text-gray-300' : 'text-amber-800';
  
  return (
    <div className={`${cardBg} rounded-lg shadow-md overflow-hidden border border-amber-400/20 transition-transform hover:scale-105`}>
      <div className="relative h-48 w-full">
        {product.image ? (
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform hover:scale-105"
          />
        ) : (
          <div className={`${noImageBg} h-full w-full flex items-center justify-center`}>
            <span className={noImageText}>Sin imagen</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className={`text-lg font-semibold ${textColor}`}>{product.name}</h3>
        <p className={`${descColor} text-sm mt-1`}>{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className={`${priceColor} font-bold`}>${product.price.toFixed(2)}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className={`${buttonBg} px-3 py-1 rounded transition-colors`}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;