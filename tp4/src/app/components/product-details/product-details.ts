import { ProductService } from './../../services/product-service';
import { Component , Input , OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common' ;
import { ActivatedRoute , Router , RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';
import { InventoryService } from '../../services/inventory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule , RouterLink],
  standalone: true,
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css'],
})

export class ProductDetails implements OnInit, OnDestroy {

  product: Product | null = null;
  productQuantity: number = 0;
  private inventorySubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private Router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          this.product = product;
          
          // Sync quantity from inventory service
          const availableQty = this.inventoryService.getAvailableQuantity(product.getProductId());
          this.product.setQuantity(availableQty);
          
          this.productQuantity = 0;
        },
        error: () => {
          this.Router.navigate(['/catalog']);
        }
      });
    });

    // Subscribe to inventory changes
    this.inventorySubscription = this.inventoryService.inventory$.subscribe(() => {
      if (this.product) {
        const availableQty = this.inventoryService.getAvailableQuantity(this.product.getProductId());
        this.product.setQuantity(availableQty);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.inventorySubscription) {
      this.inventorySubscription.unsubscribe();
    }
  }

  getDiscountPrice(): number {
    if(!this.product) 
      return 0;
    const price: number = this.product.getProductPrice();
    if (this.product.getQuantity() < 10){
      return price * 0.9 ;
    }
    return this.product.getProductPrice();
  }

  hasDiscount(): boolean {
    if (!this.product) return false;
    return this.product.getQuantity() > 0 && this.product.getQuantity() < 10;
  }

  addToCart(): void {
    if (!this.product) return;

    if (this.productQuantity <= 0) {
      alert('Please select a valid quantity');
      return;
    }

    const availableQuantity = this.inventoryService.getAvailableQuantity(this.product.getProductId());
    
    if (this.productQuantity > availableQuantity) {
      alert(`Only ${availableQuantity} items available in stock`);
      return;
    }

    this.cartService.addToCart(this.product, this.productQuantity);
    alert(`Added ${this.productQuantity}x ${this.product.getProductTitle()} to cart!`);

    this.productQuantity = 0;

    // Check if out of stock after adding
    if (this.product.getQuantity() === 0) {
      this.Router.navigate(['/catalog']);
    }
  }

  increaseQuantity(): void {
    if (this.product) {
      const availableQuantity = this.inventoryService.getAvailableQuantity(this.product.getProductId());
      if (this.productQuantity < availableQuantity) {
        this.productQuantity++;
      }
    }
  }

  decreaseQuantity(): void {
    if(!this.product) return;

    if (this.productQuantity > 0) {
      this.productQuantity--;
    }
  }

  goBack(): void {
    this.Router.navigate(['/catalog']);
  }

  onImageError(event: any): void {
    try { event.target.onerror = null; } catch {}
    event.target.src = '/images/imageError.png';
  }
}