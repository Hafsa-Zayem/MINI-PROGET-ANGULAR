export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface Product {
  productId: number;
  productTitle: string;
  productPrice: number;
  quantity: number;
  category: string;
  imageUrl: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export const users: User[] = [
  { id: 1, username: 'admin', password: 'admin123', firstName: 'Admin', lastName: 'User', role: 'admin' },
  { id: 2, username: 'user', password: 'user123', firstName: 'Hafsa', lastName: 'Zayem', role: 'member' },
];

export const products: Product[] = [
  { productId: 1, productTitle: 'Tablette SAM 12 Pouce', productPrice: 2334, quantity: 15, category: 'tablet', imageUrl: '/images/download.jpg' },
  { productId: 2, productTitle: 'IPhone 14', productPrice: 11000, quantity: 20, category: 'phone', imageUrl: '/images/61jYjeuNUnL._AC_SL1000_.jpg' },
  { productId: 3, productTitle: 'Smart TV 48 Pouce', productPrice: 8000, quantity: 10, category: 'smarttv', imageUrl: '/images/images.jpg' },
  { productId: 4, productTitle: 'Laptop ThinkPad', productPrice: 3400, quantity: 16, category: 'laptop', imageUrl: '/images/new-lenovo-thinkpad-x1-carbon-hints-at-new-2024-trend-ai-lap_afzg.2496.webp' },
  { productId: 5, productTitle: 'Smartphone Galaxy S21', productPrice: 2500, quantity: 32, category: 'phone', imageUrl: '/images/61jYjeuNUnL._AC_SL1000_.jpg' },
  { productId: 6, productTitle: 'Tablet iPad Pro', productPrice: 3000, quantity: 64, category: 'tablet', imageUrl: '/images/download.jpg' },
  { productId: 7, productTitle: 'Smartwatch Series 6', productPrice: 1200, quantity: 8, category: 'smartwatch', imageUrl: '/images/download (1).jpg' },
  { productId: 8, productTitle: 'Headphones WH-1000XM4', productPrice: 1500, quantity: 20, category: 'headphones', imageUrl: '/images/download (2).jpg' },
  { productId: 9, productTitle: 'Camera EOS R5', productPrice: 8000, quantity: 12, category: 'camera', imageUrl: '/images/download (3).jpg' },
  { productId: 10, productTitle: 'Gaming Console PS5', productPrice: 4500, quantity: 15, category: 'gamingconsole', imageUrl: '/images/download (4).jpg' }
];

export let cart: CartItem[] = [];