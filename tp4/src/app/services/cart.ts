import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product';
import { ShoppingCartItem } from '../models/ShoppingCartItem';
import { ShoppingCart } from '../models/ShoppingCart';
import { InventoryService } from './inventory';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: ShoppingCart;

  private cartItemsSubject = new BehaviorSubject<ShoppingCartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0); 
  cartCount$ = this.cartCountSubject.asObservable();

  private totalSubject = new BehaviorSubject<number>(0);
  total$ = this.totalSubject.asObservable();

  constructor(private inventoryService: InventoryService) {
    this.cart = new ShoppingCart();
  }

  addToCart(product: Product, quantity: number = 1): void {
    const productId = product.getProductId();
    const availableQuantity = this.inventoryService.getAvailableQuantity(productId);

    // Check inventory service for available quantity
    if (availableQuantity < quantity) {
      alert(`Not enough stock! Only ${availableQuantity} available.`);
      return;
    }

    // Decrease quantity in inventory service
    if (this.inventoryService.decreaseQuantity(productId, quantity)) {
      // Add to cart
      this.cart.addItem(product, quantity);
      
      // Update the product object's quantity to reflect inventory
      product.setQuantity(this.inventoryService.getAvailableQuantity(productId));

      this.updateCart();
      console.log(`Added ${quantity}x ${product.getProductTitle()} to cart`);
    } else {
      alert('Unable to add to cart - insufficient stock');
    }
  }

  removeFromCart(productId: number, quantity?: number): void {
    const items = this.cart.getItems();
    const item = items.find(
      item => item.itemProduct.getProductId() === productId
    );
    if (!item) return;

    const product = item.itemProduct;
    const removeQuantity = quantity || item.quantity;

    // Increase quantity back in inventory service
    this.inventoryService.increaseQuantity(productId, removeQuantity);
    
    // Update the product object's quantity
    product.setQuantity(this.inventoryService.getAvailableQuantity(productId));
    
    // Remove from cart
    this.cart.removeItem(product, removeQuantity);
    this.updateCart();

    console.log(`Removed ${removeQuantity}x ${product.getProductTitle()} from cart`);
  }

  updateQuantity(productId: number, newQuantity: number): void {
    const items = this.cart.getItems();
    const item = items.find(
      item => item.itemProduct.getProductId() === productId
    );

    if (!item || newQuantity <= 0) return;

    const product = item.itemProduct;
    const oldQuantity = item.quantity;
    const difference = newQuantity - oldQuantity;

    if (difference > 0) {
      // Increasing quantity - check inventory
      const availableQuantity = this.inventoryService.getAvailableQuantity(productId);
      
      if (availableQuantity < difference) {
        alert('Not enough stock available!');
        return;
      }
      
      // Decrease from inventory
      this.inventoryService.decreaseQuantity(productId, difference);
      this.cart.addItem(product, difference);
      
    } else if (difference < 0) {
      // Decreasing quantity - return to inventory
      const decreaseAmount = Math.abs(difference);
      this.inventoryService.increaseQuantity(productId, decreaseAmount);
      this.cart.removeItem(product, decreaseAmount);
    }
    
    // Update product quantity to match inventory
    product.setQuantity(this.inventoryService.getAvailableQuantity(productId));
    
    this.updateCart();
  }

  getCartItems(): ShoppingCartItem[] {
    return this.cart.getItems();
  }

  getTotal(): number {
    return this.cart.getTotal();
  }

  getItemCount(): number {
    return this.cart.getItems().reduce((count, item) => {
      return count + item.quantity;
    }, 0);
  }

  clearCart(): void {
    const items = this.cart.getItems();

    // Return all quantities to inventory
    items.forEach(item => {
      const product = item.itemProduct;
      const productId = product.getProductId();
      this.inventoryService.increaseQuantity(productId, item.quantity);
      
      // Update product quantity
      product.setQuantity(this.inventoryService.getAvailableQuantity(productId));
    });

    // Clear cart items
    items.forEach(item => {
      this.cart.removeItem(item.itemProduct, item.quantity);
    });

    this.updateCart();
    console.log('Cart cleared');
  }

  isEmpty(): boolean {
    return this.cart.getItems().length === 0;
  }

  private updateCart(): void {
    this.cartItemsSubject.next(this.cart.getItems());
    this.cartCountSubject.next(this.getItemCount());
    this.totalSubject.next(this.cart.getTotal());
  }
}