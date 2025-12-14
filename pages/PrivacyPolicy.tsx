import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">سياسة الخصوصية</h1>
      <div className="prose prose-lg text-gray-700">
        <p className="mb-4">
          نحن في "المغرب إكسبرس" نولي اهتماماً كبيراً لخصوصية زبائننا. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900">1. المعلومات التي نجمعها</h3>
        <p className="mb-4">
          نقوم بجمع المعلومات التي تقدمها لنا عند إتمام الطلب، وهي: الاسم، رقم الهاتف، والمدينة والعنوان. هذه المعلومات ضرورية فقط لتوصيل طلبك.
        </p>

        <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900">2. كيفية استخدام المعلومات</h3>
        <p className="mb-4">
          نستخدم معلوماتك لـ:
        </p>
        <ul className="list-disc list-inside mb-4 pr-4">
          <li>تأكيد الطلبات وتوصيل المنتجات.</li>
          <li>التواصل معك بخصوص حالة الطلب.</li>
          <li>تحسين خدماتنا وتجربة المستخدم.</li>
        </ul>

        <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900">3. مشاركة المعلومات</h3>
        <p className="mb-4">
          نحن لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلومات التوصيل فقط مع شركات الشحن الشريكة لضمان وصول طلبك.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;