import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, Truck, ShieldCheck, Home, Package, Info, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_NAME } from '../constants';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "text-emerald-600 font-bold" : "text-gray-700 hover:text-emerald-600";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Top Banner */}
      <div className="bg-emerald-700 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium">
        <span>🚀 شحن سريع لجميع مدن المملكة - الدفع عند الاستلام</span>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <span className="text-emerald-600 text-3xl">🛒</span>
              {STORE_NAME}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8 items-center">
              <Link to="/" className={isActive('/')}>الرئيسية</Link>
              <Link to="/products" className={isActive('/products')}>المنتجات</Link>
              <Link to="/privacy" className={isActive('/privacy')}>سياسة الخصوصية</Link>
              <Link to="/admin" className={`${isActive('/admin')} flex items-center gap-1`}>
                <Settings size={18} /> إدارة المتجر
              </Link>
            </nav>

            {/* Cart & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <Link to="/checkout" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group" aria-label="Cart">
                <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-emerald-600" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
              <button 
                className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 z-40">
            <div className="flex flex-col p-4 gap-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-2 hover:bg-emerald-50 rounded-lg text-gray-800">
                <Home size={20} /> الرئيسية
              </Link>
              <Link to="/products" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-2 hover:bg-emerald-50 rounded-lg text-gray-800">
                <Package size={20} /> جميع المنتجات
              </Link>
               <Link to="/privacy" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-2 hover:bg-emerald-50 rounded-lg text-gray-800">
                <Info size={20} /> سياسة الخصوصية
              </Link>
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-2 hover:bg-emerald-50 rounded-lg text-emerald-700 bg-emerald-50 border border-emerald-100">
                <Settings size={20} /> إدارة المتجر
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Trust Badges */}
      <div className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <Truck size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">توصيل سريع</h3>
            <p className="text-gray-500 text-sm">توصيل لباب المنزل في جميع المدن</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">ضمان الجودة</h3>
            <p className="text-gray-500 text-sm">منتجات أصلية ومضمونة 100%</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <Phone size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">دعم فني متميز</h3>
            <p className="text-gray-500 text-sm">فريقنا جاهز لمساعدتكم طوال الأسبوع</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🛒</span>
                {STORE_NAME}
              </h2>
              <p className="text-gray-400 leading-relaxed">
                وجهتكم الأولى للتسوق الإلكتروني في المغرب. نقدم لكم أفضل المنتجات بأفضل الأسعار مع خدمة التوصيل والدفع عند الاستلام.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-emerald-400">روابط سريعة</h3>
              <ul className="space-y-2">
                <li><Link to="/products" className="text-gray-300 hover:text-white transition">أحدث المنتجات</Link></li>
                <li><Link to="/products?category=ELECTRONICS" className="text-gray-300 hover:text-white transition">إلكترونيات</Link></li>
                <li><Link to="/products?category=HOME" className="text-gray-300 hover:text-white transition">للمنزل</Link></li>
                <li><Link to="/privacy" className="text-gray-300 hover:text-white transition">سياسة الخصوصية</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-emerald-400">تواصل معنا</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <Phone size={18} /> 0649075664
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <span className="text-xl">📍</span> مكناس، المغرب
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} {STORE_NAME}. جميع الحقوق محفوظة.</p>
            <Link to="/admin" className="text-gray-600 hover:text-emerald-600 mt-2 md:mt-0 flex items-center gap-1">
              <Settings size={14} /> لوحة التحكم
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;