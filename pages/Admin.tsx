import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, RefreshCw, Settings, CheckCircle, BarChart3, Sheet, Eye } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { Product, Category } from '../types';
import { CURRENCY } from '../constants';

const Admin = () => {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  // Settings State
  const [pixelSettings, setPixelSettings] = useState({
    fb: '',
    ga: '',
    tiktok: '',
    clarity: '',
    googleSheet: ''
  });
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    setPixelSettings({
      fb: localStorage.getItem('fb_pixel_id') || '',
      ga: localStorage.getItem('ga_pixel_id') || '',
      tiktok: localStorage.getItem('tiktok_pixel_id') || '',
      clarity: localStorage.getItem('clarity_id') || '',
      googleSheet: localStorage.getItem('google_sheet_url') || ''
    });

    const visits = localStorage.getItem('site_visits');
    setVisitorCount(visits ? parseInt(visits) : 0);
  }, []);

  const saveSettings = () => {
    localStorage.setItem('fb_pixel_id', pixelSettings.fb);
    localStorage.setItem('ga_pixel_id', pixelSettings.ga);
    localStorage.setItem('tiktok_pixel_id', pixelSettings.tiktok);
    localStorage.setItem('clarity_id', pixelSettings.clarity);
    localStorage.setItem('google_sheet_url', pixelSettings.googleSheet);
    
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
    // Reload to apply pixel changes
    setTimeout(() => window.location.reload(), 1000);
  };

  const handlePixelChange = (key: string, value: string) => {
    setPixelSettings(prev => ({ ...prev, [key]: value }));
  };

  // Initial empty state for form
  const emptyProduct: Product = {
    id: '',
    title: '',
    price: 0,
    oldPrice: 0,
    category: Category.ELECTRONICS,
    image: '',
    description: '',
    features: []
  };

  const [formData, setFormData] = useState<Product>(emptyProduct);
  const [featuresInput, setFeaturesInput] = useState('');

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setIsAdding(false);
    setFormData(product);
    setFeaturesInput(product.features.join('\n'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNew = () => {
    setEditingId(null);
    setIsAdding(true);
    setFormData({ ...emptyProduct, id: Date.now().toString() });
    setFeaturesInput('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData(emptyProduct);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const productToSave = {
      ...formData,
      features: featuresInput.split('\n').filter(f => f.trim() !== '')
    };

    if (isAdding) {
      addProduct(productToSave);
    } else {
      updateProduct(productToSave);
    }
    handleCancel();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'oldPrice' ? Number(value) : value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-black text-gray-900 mb-8">لوحة التحكم</h1>

      {/* Visitor Stats Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            <Eye size={24} />
          </div>
          <div>
            <h3 className="text-gray-500 font-bold text-sm">إجمالي زيارات المتجر</h3>
            <p className="text-2xl font-black text-gray-900">{visitorCount}</p>
          </div>
        </div>
        <div className="text-xs text-gray-400">
          يتم التحديث تلقائياً
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800 border-b pb-4">
          <Settings size={20} /> الربط والخدمات الخارجية
        </h2>
        
        <div className="space-y-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Google Sheets */}
            <div className="col-span-1 md:col-span-2 bg-green-50 p-4 rounded-xl border border-green-100">
              <label className="block text-sm font-bold text-green-800 mb-2 flex items-center gap-2">
                 <Sheet size={18} /> رابط Google Sheets (Webhook URL)
              </label>
              <input 
                type="text" 
                value={pixelSettings.googleSheet} 
                onChange={(e) => handlePixelChange('googleSheet', e.target.value)} 
                placeholder="https://script.google.com/macros/s/..../exec"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none font-mono text-left ltr bg-white"
                dir="ltr"
              />
              <p className="text-xs text-green-700 mt-2">
                قم بإنشاء Google Apps Script وحوله إلى Web App والصق الرابط هنا لحفظ الطلبات تلقائياً.
              </p>
            </div>

            {/* Clarity */}
            <div>
              <label className="block text-sm font-bold text-purple-700 mb-2 flex items-center gap-2">
                 <Eye size={16} /> Microsoft Clarity ID
              </label>
              <input 
                type="text" 
                value={pixelSettings.clarity} 
                onChange={(e) => handlePixelChange('clarity', e.target.value)} 
                placeholder="مثال: k8v..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none font-mono text-left ltr bg-gray-50"
                dir="ltr"
              />
            </div>
          </div>

          <h3 className="font-bold text-gray-700 pt-4 border-t">إعدادات البيكسل (Pixels)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Facebook */}
            <div>
              <label className="block text-sm font-bold text-blue-700 mb-2 flex items-center gap-2">
                 <BarChart3 size={16} /> Facebook Pixel ID
              </label>
              <input 
                type="text" 
                value={pixelSettings.fb} 
                onChange={(e) => handlePixelChange('fb', e.target.value)} 
                placeholder="مثال: 220803..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-left ltr bg-gray-50"
                dir="ltr"
              />
            </div>

            {/* Google */}
            <div>
              <label className="block text-sm font-bold text-orange-600 mb-2 flex items-center gap-2">
                 <BarChart3 size={16} /> Google Analytics ID
              </label>
              <input 
                type="text" 
                value={pixelSettings.ga} 
                onChange={(e) => handlePixelChange('ga', e.target.value)} 
                placeholder="مثال: G-12345ABC"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none font-mono text-left ltr bg-gray-50"
                dir="ltr"
              />
            </div>

            {/* TikTok */}
            <div>
              <label className="block text-sm font-bold text-black mb-2 flex items-center gap-2">
                 <BarChart3 size={16} /> TikTok Pixel ID
              </label>
              <input 
                type="text" 
                value={pixelSettings.tiktok} 
                onChange={(e) => handlePixelChange('tiktok', e.target.value)} 
                placeholder="مثال: C123ABC..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-800 outline-none font-mono text-left ltr bg-gray-50"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={saveSettings}
            className="w-full md:w-auto bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            {showSaveSuccess ? <CheckCircle size={20} className="text-green-400" /> : <Save size={20} />}
            {showSaveSuccess ? 'تم الحفظ بنجاح' : 'حفظ الإعدادات'}
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">قائمة المنتجات</h2>
        <div className="flex gap-2">
           <button 
            onClick={resetProducts}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            <RefreshCw size={18} /> استعادة الافتراضي
          </button>
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition font-bold"
          >
            <Plus size={18} /> إضافة منتج جديد
          </button>
        </div>
      </div>

      {/* Form Section */}
      {(isAdding || editingId) && (
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-emerald-100 mb-10 animate-fade-in">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-800">
            {isAdding ? <Plus /> : <Edit />} 
            {isAdding ? 'إضافة منتج جديد' : 'تعديل المنتج'}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">اسم المنتج</label>
                <input required name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">القسم</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
                  {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">السعر الحالي ({CURRENCY})</label>
                <input type="number" required name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">السعر القديم (اختياري)</label>
                <input type="number" name="oldPrice" value={formData.oldPrice || ''} onChange={handleChange} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">رابط الصورة (URL)</label>
              <input required name="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-left" dir="ltr" />
              {formData.image && <img src={formData.image} alt="Preview" className="h-20 w-20 object-cover mt-2 rounded-lg border" />}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">الوصف</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">المميزات (ميزة في كل سطر)</label>
              <textarea name="features" value={featuresInput} onChange={(e) => setFeaturesInput(e.target.value)} rows={4} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="- ميزة 1&#10;- ميزة 2" />
            </div>

            <div className="flex gap-4 pt-4">
              <button type="submit" className="flex-1 bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-emerald-700 flex justify-center items-center gap-2">
                <Save size={18} /> حفظ التغييرات
              </button>
              <button type="button" onClick={handleCancel} className="bg-gray-100 text-gray-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-200">
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="p-4">الصورة</th>
                <th className="p-4">المنتج</th>
                <th className="p-4">السعر</th>
                <th className="p-4">القسم</th>
                <th className="p-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <img src={product.image} alt={product.title} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                  </td>
                  <td className="p-4 font-bold text-gray-900">{product.title}</td>
                  <td className="p-4 text-emerald-600 font-bold">{product.price.toLocaleString()} {CURRENCY}</td>
                  <td className="p-4">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{product.category}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleEdit(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="تعديل">
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => {
                          if(window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) deleteProduct(product.id);
                        }} 
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg" 
                        title="حذف"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;