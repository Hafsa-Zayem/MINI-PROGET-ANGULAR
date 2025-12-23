import { Injectable } from '@angular/core';
import { ShoppingCart } from 'app/models/ShoppingCart';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  cart = new ShoppingCart();

  addItem(product: Product, quantity: number) {
    this.cart.addItem(product, quantity);
  }

  removeItem(product: Product, quantity: number) {
    this.cart.removeItem(product, quantity);
  }


  getItems() {
    return this.cart.getItems();
  }

  getTotal() {
    return this.cart.getTotal();
  }

  clearCart() {
    this.cart = new ShoppingCart();
  }
}
