import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Category } from '../types';
import { useProducts } from '../context/ProductContext';

const ProductList = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') as Category | 'ALL' || 'ALL';
  
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  // Update URL when filter changes
  const handleCategoryChange = (cat: Category | 'ALL') => {
    setSelectedCategory(cat);
    if (cat === 'ALL') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'ALL' || product.category === selectedCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, products]);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">جميع المنتجات</h1>
            <p className="text-gray-500">تصفح {filteredProducts.length} منتج متوفر</p>
          </div>

          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="بحث عن منتج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-4 pr-10 py-3 rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 shadow-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
            
            {/* Filter Dropdown (Mobile) / Tabs (Desktop) could go here but let's stick to simple pill buttons below */}
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => handleCategoryChange('ALL')}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              selectedCategory === 'ALL' 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-emerald-50'
            }`}
          >
            الكل
          </button>
          {Object.values(Category).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                selectedCategory === cat 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-emerald-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm">
            <div className="inline-flex justify-center items-center w-20 h-20 bg-gray-100 rounded-full mb-4 text-gray-400">
              <Filter size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-500">حاول تغيير خيارات البحث أو التصنيف.</p>
            <button 
              onClick={() => {setSearchQuery(''); handleCategoryChange('ALL');}}
              className="mt-6 text-emerald-600 font-bold hover:underline"
            >
              عرض جميع المنتجات
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;