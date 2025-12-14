import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { CURRENCY } from '../constants';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if clicking the button
    e.stopPropagation();
    addToCart(product);
    // Optional: Show toast or feedback
  };

  const handleQuickOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-[4/3]">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        {product.oldPrice && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            تخفيض
          </span>
        )}
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        <Link to={`/product/${product.id}`} className="block flex-grow">
          <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-emerald-600 transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-baseline gap-2 mt-2 mb-4">
          <span className="text-xl font-black text-emerald-700">
            {product.price.toLocaleString()} <span className="text-sm font-normal">{CURRENCY}</span>
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through decoration-red-400">
              {product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button 
            onClick={handleQuickOrder}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
          >
            طلب الآن
          </button>
          <button 
            onClick={handleAddToCart}
            className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <ShoppingCart size={16} />
            أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;