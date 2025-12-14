import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, ShoppingCart, ArrowLeft, Truck, Shield, Clock } from 'lucide-react';
import { CURRENCY } from '../constants';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useProducts();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">المنتج غير موجود</h2>
        <button onClick={() => navigate('/products')} className="text-emerald-600 hover:underline">
          العودة للمنتجات
        </button>
      </div>
    );
  }

  const handleOrderNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="bg-white min-h-screen pb-12">
      {/* Breadcrumb / Back */}
      <div className="container mx-auto px-4 py-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-500 hover:text-emerald-600 transition"
        >
          <ArrowLeft size={16} className="ml-1" /> رجوع
        </button>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50 relative">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              {product.oldPrice && (
                <div className="absolute top-4 right-4 bg-red-500 text-white font-bold px-4 py-2 rounded-lg shadow-md">
                   تخفيض {(100 - (product.price / product.oldPrice * 100)).toFixed(0)}%
                </div>
              )}
            </div>
            {/* Thumbnails could go here */}
          </div>

          {/* Details Section */}
          <div>
            <div className="mb-2">
              <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-black text-emerald-700">
                {product.price.toLocaleString()} <span className="text-lg font-bold text-gray-600">{CURRENCY}</span>
              </span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through mb-2 decoration-red-400">
                  {product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Features */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">مميزات المنتج:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 sticky bottom-0 bg-white sm:static p-4 sm:p-0 border-t sm:border-0 shadow-lg sm:shadow-none z-20">
              <button 
                onClick={handleOrderNow}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-emerald-200 text-lg"
              >
                اضغط هنا للطلب الآن
              </button>
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 sm:flex-none bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold py-4 px-8 rounded-xl transition-all border border-emerald-200 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                أضف للسلة
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
              <div className="text-center">
                <Truck className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <span className="text-xs font-bold text-gray-500">توصيل سريع</span>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <span className="text-xs font-bold text-gray-500">ضمان الجودة</span>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <span className="text-xs font-bold text-gray-500">دعم 24/7</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;