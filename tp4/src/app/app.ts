import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common' ;
//import { Catalog } from './components/catalog/catalog';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router'
import { CartService } from './services/cart'
import { Product } from './models/Product';
import { filter } from 'rxjs';
import { AuthService } from './services/auth-service';
import { User } from './models/User';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('tp4');
  cartItemCount = 0 ;
  
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
  showCategoryFilter: boolean = false;
  isAuthenticated:boolean = false;
  currentUser: User | null = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router:Router 
  ){}

  ngOnInit(): void {
    console.log('App bootstrapped');
    this.cartService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  
  
this.router.events.pipe(
  filter(event => event instanceof NavigationEnd)
).subscribe((event: any) => {
  this.showCategoryFilter = event.url.includes('/catalog');
});
  }

  navigateToCategory(category: string): void {
    const key = (category && category.toUpperCase() === 'ALL') ? 'ALL' : (category || '').toLowerCase();
    console.log('Header -> navigateToCategory:', key);
    this.SelectedCategory = key;
    if (key === 'ALL'){
      this.router.navigate(['/catalog']);
    } else {
      this.router.navigate(['/catalog', key]);
    }
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout();
    }
  }

  getUserFullName(): string {
    return this.currentUser?.fullName() || 'User';
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

}