import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, TrendingUp, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Category } from '../types';
import { useProducts } from '../context/ProductContext';

const Home = () => {
  const { products } = useProducts();
  
  // Get featured items (just taking first 4 for demo)
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <img 
            src="https://picsum.photos/id/3/1920/1080" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-gray-900/80"></div>
        
        <div className="relative container mx-auto px-4 py-24 md:py-32 flex flex-col items-start justify-center min-h-[500px]">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-sm mb-6 border border-emerald-500/30">
            ✨ العروض الأقوى في المغرب
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight max-w-2xl">
            جودة تستحقها، <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              بأسعار لا تُقاوم.
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl leading-relaxed">
            اكتشف تشكيلتنا الواسعة من الإلكترونيات، مستلزمات المنزل والسيارات. اطلب الآن وادفع عند الاستلام.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-emerald-900/50"
            >
              تسوق الآن <ArrowLeft size={20} />
            </Link>
            <a 
              href="#categories" 
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl backdrop-blur-sm transition-all"
            >
              تصفح الأقسام
            </a>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div id="categories" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">تسوق حسب القسم</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to={`/products?category=${Category.ELECTRONICS}`} className="group relative rounded-2xl overflow-hidden h-64 shadow-md">
            <img src="https://picsum.photos/id/201/600/400" alt="Electronics" className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Zap size={20} />
                <span className="font-bold">أحدث التقنيات</span>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">الإلكترونيات</h3>
            </div>
          </Link>

          <Link to={`/products?category=${Category.HOME}`} className="group relative rounded-2xl overflow-hidden h-64 shadow-md">
             <img src="https://picsum.photos/id/366/600/400" alt="Home" className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Star size={20} />
                <span className="font-bold">راحة وفخامة</span>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">المنزل والديكور</h3>
            </div>
          </Link>

          <Link to={`/products?category=${Category.CARS}`} className="group relative rounded-2xl overflow-hidden h-64 shadow-md">
             <img src="https://picsum.photos/id/133/600/400" alt="Cars" className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <TrendingUp size={20} />
                <span className="font-bold">انطلق بحرية</span>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">السيارات</h3>
            </div>
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">منتجات مختارة لك</h2>
              <p className="text-gray-500">الأكثر مبيعاً وطلباً هذا الأسبوع</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition">
              مشاهدة الكل <ArrowLeft size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
             <Link to="/products" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition bg-white px-6 py-3 rounded-full shadow-sm">
              مشاهدة جميع المنتجات <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;