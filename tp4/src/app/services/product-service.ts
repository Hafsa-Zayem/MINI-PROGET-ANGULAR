import { Injectable } from '@angular/core';
import { Product } from 'app/models/Product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
 // private products: Product[] = [];
  base = 'http://localhost:3000/api';
  constructor(private http: HttpClient, private auth: AuthService) {
    //this.loadProducts();
  }
  /*
  private loadProducts(): void {
  this.products = [
    new Product(1, 'Laptop ThinkPad',3400.00, 16, 'Laptop','images/new-lenovo-thinkpad-x1-carbon-hints-at-new-2024-trend-ai-lap_afzg.2496.webp'),
    new Product(2, 'Smartphone Galaxy S21', 2500.00, 32, 'SmartPhone', 'images/61jYjeuNUnL._AC_SL1000_.jpg' ),
    new Product(3, 'Tablet iPad Pro', 3000.00, 64 , 'Tablet', 'images/download.jpg'),
    new Product(4, 'Smartwatch Series 6', 1200.00, 8, 'SmartWatch', 'images/download (1).jpg'),
    new Product(5, 'Headphones WH-1000XM4', 1500.00, 20, 'Headphones', 'images/download (2).jpg'), 
    new Product(6, 'Camera EOS R5', 8000.00, 12, 'Camera', 'images/download (3).jpg'),
    new Product(7, 'Gaming Console PS5', 4500.00, 15, 'GamingConsole', 'images/download (4).jpg'),
    new Product(8, '4K TV LG OLED', 6000.00, 10, 'TV', 'images/images.jpg'),
    new Product(9, 'Wireless Speaker', 700.00, 25, 'WirelessSpeaker', 'images/download (5).jpg'),
    new Product(10, 'E-Reader Kindle', 900.00, 30, 'E-Reader', 'images/download (6).jpg')
  ];
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.getProductId() === id);
  }

  getProductsByCategory(category: string): Product[] {
    if(category === 'ALL'){
      return this.products.filter(p => p.getQuantity() > 0);
    }
    return this.products.filter(
      p => p.getCategory() === category && p.getQuantity() > 0
       );
  }
  */ private mapToProduct(data: any): Product {
    return new Product(
      data.productId,
      data.productTitle,
      data.productPrice,
      data.quantity,
      data.category,
      data.imageUrl
    );
  }


 // Map array of plain objects to Product instances
  private mapToProducts(data: any[]): Product[] {
    return data.map(item => this.mapToProduct(item));
  }

   getAllProducts(): Observable<Product[]> {
    const opts = this.auth.createAuthHeader();
    //return this.http.get<Product[]>(`${this.base}/products`, opts);
     return this.http.get<any[]>(`${this.base}/products`, opts).pipe(
      map(data => this.mapToProducts(data))
    );
  }

  getProductById(id: number): Observable<Product> {
    const opts = this.auth['createAuthHeader']?.() ?? {};
   // return this.http.get<Product>(`${this.base}/products/${id}`, opts);
    return this.http.get<any>(`${this.base}/products/${id}`, opts).pipe(
      map(data => this.mapToProduct(data))
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const opts = this.auth['createAuthHeader']?.() ?? {};
    if (category === 'ALL') return this.getAllProducts();
   // return this.http.get<Product[]>(`${this.base}/products/category/${category}`, opts);
    return this.http.get<any[]>(`${this.base}/products/category/${category}`, opts).pipe(
      map(data => this.mapToProducts(data))
    );
  }

}
