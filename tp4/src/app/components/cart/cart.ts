import { Product } from '../../models/Product';
import { CartService } from './../../services/cart';
import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShoppingCartItem } from 'app/models/ShoppingCartItem';
@Component({
  selector: 'app-cart',
  imports: [CommonModule , RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart implements OnInit {
  cartItems: ShoppingCartItem[] = [];
  total: number = 0 ;

  constructor(
    private cartService: CartService
  ){}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems =items;
      this.total = this.cartService.getTotal();
    });
  }

removeItem(productId: number): void {
  if (confirm('Remove this item from cart?')) {
    this.cartService.removeFromCart(productId);
  }
}

increaseQuantity(item: ShoppingCartItem): void {
  const newQuantity = item.quantity + 1 ;
  const availableStock = item.itemProduct.getQuantity();

  if (availableStock > 0) {
    this.cartService.updateQuantity(
      item.itemProduct.getProductId(),
      newQuantity
    );
  }else{
    alert('No more Stock availble!');
  }
}

decreaseQuantity(item: ShoppingCartItem): void {
  if (item.quantity > 1) {
    const newQuantity= item.quantity - 1 ;
    this.cartService.updateQuantity(
      item.itemProduct.getProductId(),
      newQuantity
    );
  } else {
    this.removeItem(item.itemProduct.getProductId());
  }
}

clearCart(): void {
  if (confirm('Are you sure you want to clear your cart?')) {
    this.cartService.clearCart();
  }
}

isEmpty():boolean {
  return this.cartService.isEmpty();
}

getItemCount(): number {
  return this.cartService.getItemCount();
}

checkout(): void {
  if(this.isEmpty()) {
    alert('Your cart is empty!');
    return;
  }
  alert(`Checkout - Total:${this.total.toFixed(3)} DH\n\nThis is a demo.
  In a real app, you would proceed to payment.`);
  console.log('Cart items:', this.cartItems);
  console.log('Total:', this.total);
}

onImageError(event: any) {
  event.target.src='public/images/imageError.png'
}
}
