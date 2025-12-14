export enum Category {
  ELECTRONICS = 'إلكترونيات',
  HOME = 'منزل وديكور',
  CARS = 'سيارات',
}

export interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  category: Category;
  image: string;
  description: string;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderForm {
  fullName: string;
  city: string;
  phoneNumber: string;
  address?: string;
}