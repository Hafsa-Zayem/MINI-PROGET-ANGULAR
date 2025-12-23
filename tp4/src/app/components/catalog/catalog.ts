import { Component , OnInit , OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common' ;
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/Product';
import { CartService } from '../../services/cart';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { InventoryService } from '../../services/inventory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog',
  imports: [ CommonModule, FormsModule],
  standalone: true,
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.css'],
})
export class Catalog implements OnInit , OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  categories: string[] = [
    'ALL', 
    'laptop', 
    'phone',
    'tablet',
    'smartwatch',
    'headphones',
    'camera',
    'gamingconsole',
    'smarttv',
    'wirelessspeaker',
    'e-reader'
  ];
  SelectedCategory: string = 'ALL';

  private routeSubscription?: Subscription;
  private inventorySubscription?: Subscription;

  productQuantities: {[productId: number]: number } = {} ;

  constructor(
    private cartService: CartService , 
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private inventoryService: InventoryService
  ){}


  ngOnInit(): void {
    // Load products first
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        
        // Initialize inventory service with product data
        this.inventoryService.initializeInventory(
          products.map(p => ({
            productId: p.getProductId(),
            quantity: p.getQuantity()
          }))
        );
        
        // Update product quantities from inventory
        this.syncProductQuantities();
        
        this.loadProducts();
        
        console.log('=== PRODUCTS LOADED ===');
        console.log('Total products:', this.products.length);
        console.log('Server categories:', [...new Set(this.products.map(p => p.getCategory()))]);
        
        // Apply filter with current category
        this.filterByCategory(this.SelectedCategory);
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });

    // Subscribe to inventory changes
    this.inventorySubscription = this.inventoryService.inventory$.subscribe(() => {
      this.syncProductQuantities();
      // Re-filter to update display
      this.filterByCategory(this.SelectedCategory);
    });

    // Subscribe to route changes
    this.routeSubscription = this.route.params.subscribe( params => {
      const raw = params['category'];
      
      console.log('=== ROUTE CHANGE ===');
      console.log('Raw route param:', raw);
      
      // Only process if there's actually a category parameter in the route
      if (raw !== undefined) {
        // Normalize the category: ALL stays ALL, everything else becomes lowercase
        const category = (raw && raw.toUpperCase() === 'ALL') ? 'ALL' : (raw || '').toLowerCase();
        console.log('Normalized category:', category);
        
        this.SelectedCategory = category;
        
        // Only filter if products are loaded
        if (this.products.length > 0) {
          this.filterByCategory(category);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription){
      this.routeSubscription?.unsubscribe();
    }
    if (this.inventorySubscription) {
      this.inventorySubscription.unsubscribe();
    }
  }

  /**
   * Sync product quantities from inventory service
   */
  private syncProductQuantities(): void {
    this.products.forEach(product => {
      const availableQty = this.inventoryService.getAvailableQuantity(product.getProductId());
      product.setQuantity(availableQty);
    });
  }

  loadProducts(): void {
    this.products.forEach(product => {
      this.productQuantities[product.getProductId()] = 1;  
    });
  }

  filterByCategory(category: string): void {
    console.log('=== FILTERING ===');
    console.log('Category to filter:', category);
    
    this.SelectedCategory = category;

    if (category === 'ALL' || !category) {
      this.filteredProducts = this.products.filter(p => p.getQuantity() > 0);
      console.log('Showing ALL products with stock:', this.filteredProducts.length);
    } else {
      this.filteredProducts = this.products.filter(p => {
        const productCategory = p.getCategory().toLowerCase();
        const searchCategory = category.toLowerCase();
        const matches = productCategory === searchCategory && p.getQuantity() > 0;
        
        if (matches) {
          console.log(`✓ Match: ${p.getProductTitle()} (${productCategory}) - ${p.getQuantity()} available`);
        }
        
        return matches;
      });
      
      console.log(`Filtered products for '${category}':`, this.filteredProducts.length);
      
      if (this.filteredProducts.length === 0) {
        console.warn('⚠️ NO PRODUCTS FOUND!');
        console.warn('Available categories:', [...new Set(this.products.map(p => p.getCategory().toLowerCase()))]);
      }
    }
  }

  onViewDetails(product: Product): void {
    this.router.navigate(['/product-details', product.getProductId()]);
  }

  isLowStock(product: Product): boolean {
    return product.getQuantity() > 0 && product.getQuantity() < 10;
  }

  addtoCart(product: Product): void {
    const quantity = this.productQuantities[product.getProductId()] || 1; 

    if (quantity <= 0){
      alert('Please select a valid quantity');
      return;
    }

    const availableQuantity = this.inventoryService.getAvailableQuantity(product.getProductId());
    
    if (quantity > availableQuantity){
      alert(`Only ${availableQuantity} items available in stock`);
      return;
    }

    this.cartService.addToCart(product, quantity);
    alert(`✅ Added ${quantity}x ${product.getProductTitle()} to cart!`);

    this.productQuantities[product.getProductId()] = 1;

    // Product quantities will auto-update via inventory subscription
    // No need to manually call filterByCategory
  }

  increaseQuantity(productId: number, maxStock: number): void {
    if (this.productQuantities[productId] < maxStock){
      this.productQuantities[productId]++;
    }
  }

  decreaseQuantity(productId: number): void {
    if (this.productQuantities[productId] > 1) {
      this.productQuantities[productId]--;
    }
  }

  getCartCount(): number {
    return this.cartService.getItemCount();
  }

  onImageError(event: any): void {
    // prevent infinite error loop by clearing handler, then use built assets path
    try { event.target.onerror = null; } catch {}
    event.target.src = 'images/imageError.png';
  }
}