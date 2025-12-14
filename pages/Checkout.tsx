import React, { useState } from 'react';
import { Trash2, Phone, MapPin, User, CheckCircle, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CITIES, CURRENCY } from '../constants';
import { OrderForm } from '../types';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { items, removeFromCart, cartTotal, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<OrderForm>({
    fullName: '',
    city: CITIES[0],
    phoneNumber: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);

    const orderData = {
        date: new Date().toLocaleString('ar-MA'),
        customer: formData.fullName,
        phone: formData.phoneNumber,
        city: formData.city,
        address: formData.address || '',
        products: items.map(i => `${i.title} (${i.quantity})`).join(', '),
        total: cartTotal
    };

    console.log("Order submitted:", { items, total: cartTotal, customer: formData });
    
    // --- GOOGLE SHEETS INTEGRATION ---
    const sheetUrl = localStorage.getItem('google_sheet_url');
    if (sheetUrl) {
        try {
            // Using FormData is standard for Google Apps Script Webhooks
            const data = new FormData();
            Object.entries(orderData).forEach(([key, value]) => {
                data.append(key, value.toString());
            });

            await fetch(sheetUrl, {
                method: 'POST',
                body: data,
                mode: 'no-cors' // Important to avoid CORS errors from Google Script
            });
            console.log("Sent to Google Sheet");
        } catch (error) {
            console.error("Failed to send to Google Sheet", error);
            // We don't block success message on failure
        }
    }

    // --- TRACKING EVENTS ---
    
    // 1. Facebook Pixel
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Purchase', { currency: 'MAD', value: cartTotal });
    }

    // 2. Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        transaction_id: Date.now().toString(), // unique ID
        value: cartTotal,
        currency: 'MAD',
        items: items.map(item => ({
          item_id: item.id,
          item_name: item.title,
          price: item.price,
          quantity: item.quantity
        }))
      });
    }

    // 3. TikTok Pixel
    if ((window as any).ttq) {
      (window as any).ttq.track('CompletePayment', {
        content_id: items.map(i => i.id).join(','),
        content_type: 'product',
        value: cartTotal,
        currency: 'MAD',
        quantity: items.reduce((acc, item) => acc + item.quantity, 0)
      });
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    clearCart();
    window.scrollTo(0,0);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">شكراً لك! تم استلام طلبك بنجاح</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          سيقوم فريقنا بالاتصال بك قريباً على الرقم <span className="font-bold font-mono">{formData.phoneNumber}</span> لتأكيد الطلب وترتيب عملية التوصيل.
        </p>
        <Link to="/" className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-emerald-700 transition">
          العودة للصفحة الرئيسية
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">سلة المشتريات فارغة</h2>
        <p className="text-gray-500 mb-8">لم تقم بإضافة أي منتجات للسلة بعد.</p>
        <Link to="/products" className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-emerald-700 transition">
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-black text-gray-900 mb-8 text-center">إتمام الطلب</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Order Summary (Right on Desktop due to RTL) */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 order-2 lg:order-1">
            <h3 className="text-xl font-bold text-gray-900 mb-6">ملخص الطلب</h3>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-start border-b border-gray-50 pb-4 last:border-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-sm text-gray-800 line-clamp-2">{item.title}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-emerald-600 font-bold text-sm">
                        {item.price.toLocaleString()} {CURRENCY}
                      </span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">
                        الكمية: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>المجموع الفرعي</span>
                <span>{cartTotal.toLocaleString()} {CURRENCY}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>الشحن</span>
                <span className="font-bold">مجاني</span>
              </div>
              <div className="flex justify-between text-xl font-black text-gray-900 pt-2 border-t border-gray-100 mt-2">
                <span>الإجمالي</span>
                <span>{cartTotal.toLocaleString()} {CURRENCY}</span>
              </div>
            </div>
          </div>

          {/* Form (Left on Desktop) */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-emerald-100 order-1 lg:order-2">
            <div className="mb-6 bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex gap-3 items-start">
              <CheckCircle className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-emerald-800">الدفع عند الاستلام</h4>
                <p className="text-sm text-emerald-700">لا تحتاج لبطاقة بنكية، ادفع نقداً عند وصول طلبك.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block font-bold text-gray-700 flex items-center gap-2">
                    <User size={18} className="text-emerald-500" /> الاسم الكامل
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                    placeholder="أدخل اسمك هنا"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="block font-bold text-gray-700 flex items-center gap-2">
                    <Phone size={18} className="text-emerald-500" /> رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition font-mono text-left"
                    placeholder="06XXXXXXXX"
                    dir="ltr" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="city" className="block font-bold text-gray-700 flex items-center gap-2">
                  <MapPin size={18} className="text-emerald-500" /> المدينة
                </label>
                <select
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition bg-white"
                >
                  {CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="block font-bold text-gray-700">
                  العنوان بالتفصيل (اختياري)
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  placeholder="رقم المنزل، اسم الشارع، الحي..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold text-lg py-4 px-8 rounded-xl transition-all shadow-lg shadow-emerald-200 transform hover:-translate-y-1"
              >
                {isSubmitting ? 'جاري التنفيذ...' : `تأكيد الطلب الآن (${cartTotal.toLocaleString()} ${CURRENCY})`}
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-4">
                بالضغط على "تأكيد الطلب"، فإنك توافق على سياسة الخصوصية وشروط الاستخدام.
              </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;