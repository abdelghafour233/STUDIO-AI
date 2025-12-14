import { Category, Product } from './types';

export const STORE_NAME = "المغرب إكسبرس";
export const CURRENCY = "درهم";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'تلفاز سامسونج ذكي 55 بوصة 4K',
    price: 4500,
    oldPrice: 5200,
    category: Category.ELECTRONICS,
    image: 'https://picsum.photos/id/445/800/600',
    description: 'استمتع بتجربة مشاهدة سينمائية مع تلفاز سامسونج الذكي بدقة 4K وألوان زاهية.',
    features: ['دقة 4K UHD', 'نظام تشغيل Tizen', '3 منافذ HDMI', 'واي فاي مدمج']
  },
  {
    id: '2',
    title: 'أيفون 15 برو ماكس - 256 جيجا',
    price: 13500,
    category: Category.ELECTRONICS,
    image: 'https://picsum.photos/id/881/800/600',
    description: 'أحدث هواتف أبل مع معالج قوي وكاميرا احترافية.',
    features: ['شاشة Super Retina XDR', 'شريحة A17 Pro', 'كاميرا 48 ميجابكسل', 'إطار تيتانيوم']
  },
  {
    id: '3',
    title: 'طقم كنب عصري مريح',
    price: 3200,
    oldPrice: 4000,
    category: Category.HOME,
    image: 'https://picsum.photos/id/1078/800/600',
    description: 'طقم كنب بتصميم مودرن يناسب الصالونات المغربية العصرية.',
    features: ['قماش عالي الجودة', 'خشب متين', 'تصميم حرفي', 'شامل الوسائد']
  },
  {
    id: '4',
    title: 'خلاط كهربائي احترافي',
    price: 450,
    category: Category.HOME,
    image: 'https://picsum.photos/id/60/800/600',
    description: 'خلاط قوي لتحضير العصائر والشوربات بسرعة وسهولة.',
    features: ['محرك 1000 واط', 'وعاء زجاجي', '6 شفرات', 'سرعات متعددة']
  },
  {
    id: '5',
    title: 'سيارة داسيا لوجان 2024',
    price: 130000,
    category: Category.CARS,
    image: 'https://picsum.photos/id/111/800/600',
    description: 'السيارة الاقتصادية الأولى في المغرب، تصميم جديد وأداء موثوق.',
    features: ['محرك ديزل اقتصادي', 'تكييف هواء', 'شاشة لمس', 'مثبت سرعة']
  },
  {
    id: '6',
    title: 'مكنسة كهربائية روبوت',
    price: 1800,
    oldPrice: 2500,
    category: Category.ELECTRONICS,
    image: 'https://picsum.photos/id/250/800/600',
    description: 'حافظ على نظافة منزلك بذكاء مع المكنسة الروبوتية.',
    features: ['شفط قوي', 'تحكم عبر التطبيق', 'شحن تلقائي', 'حساسات ضد السقوط']
  },
    {
    id: '7',
    title: 'طاولة طعام خشبية فاخرة',
    price: 2800,
    category: Category.HOME,
    image: 'https://picsum.photos/id/1069/800/600',
    description: 'طاولة طعام تتسع لـ 6 أشخاص بتصميم كلاسيكي أنيق.',
    features: ['خشب زان طبيعي', 'تشطيب عالي الجودة', 'سهلة التنظيف', 'متينة']
  },
  {
    id: '8',
    title: 'رينو كليو 5 - أوتوماتيك',
    price: 195000,
    category: Category.CARS,
    image: 'https://picsum.photos/id/183/800/600',
    description: 'سيارة هاتشباك أنيقة وعملية للقيادة في المدينة.',
    features: ['ناقل حركة أوتوماتيكي', 'كاميرا خلفية', 'مصابيح LED', 'نظام ملاحة']
  }
];

export const CITIES = [
  "الدار البيضاء", "الرباط", "مراكش", "فاس", "طنجة", "أكادير", "مكناس", "وجدة", "القنيطرة", "تطوان"
];