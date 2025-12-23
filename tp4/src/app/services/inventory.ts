import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service to track product inventory quantities across the application.
 * This ensures that when products are added to cart, the available quantity
 * is tracked consistently even when navigating between pages.
 */
@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  // Map of productId to available quantity
  private inventoryMap = new Map<number, number>();
  
  // Subject to notify components when inventory changes
  private inventorySubject = new BehaviorSubject<Map<number, number>>(new Map());
  public inventory$ = this.inventorySubject.asObservable();

  constructor() {}

  /**
   * Initialize inventory from server data (call this once when products load)
   */
  initializeInventory(products: Array<{productId: number, quantity: number}>): void {
    products.forEach(product => {
      // Only set if not already in map (to preserve any cart changes)
      if (!this.inventoryMap.has(product.productId)) {
        this.inventoryMap.set(product.productId, product.quantity);
      }
    });
    this.notifyChange();
  }

  /**
   * Get the current available quantity for a product
   */
  getAvailableQuantity(productId: number): number {
    return this.inventoryMap.get(productId) ?? 0;
  }

  /**
   * Decrease quantity when adding to cart
   */
  decreaseQuantity(productId: number, amount: number): boolean {
    const current = this.getAvailableQuantity(productId);
    if (current >= amount) {
      this.inventoryMap.set(productId, current - amount);
      this.notifyChange();
      return true;
    }
    return false;
  }

  /**
   * Increase quantity when removing from cart
   */
  increaseQuantity(productId: number, amount: number): void {
    const current = this.getAvailableQuantity(productId);
    this.inventoryMap.set(productId, current + amount);
    this.notifyChange();
  }

  /**
   * Update product quantity directly
   */
  setQuantity(productId: number, quantity: number): void {
    this.inventoryMap.set(productId, quantity);
    this.notifyChange();
  }

  /**
   * Check if a product has enough stock
   */
  hasStock(productId: number, requestedAmount: number): boolean {
    return this.getAvailableQuantity(productId) >= requestedAmount;
  }

  /**
   * Reset inventory (useful for testing or refresh)
   */
  reset(): void {
    this.inventoryMap.clear();
    this.notifyChange();
  }

  private notifyChange(): void {
    this.inventorySubject.next(new Map(this.inventoryMap));
  }
}