import { Catalog } from './../catalog/catalog';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth-service';


@Component({
  selector: 'app-login',
  standalone: true ,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
 username: string = '';
 password: string = '';
 errorMsg: string = '';
 successMsg: string = '';
 isLoading: boolean = false;
 showPd: boolean = false ;

 private returnUrl: string = '/catalog';
 constructor (
   private authService: AuthService,
   private router: Router,
   private route: ActivatedRoute
 ){
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/catalog';
 }

 onSubmit(): void {
  if (!this.username || !this.password) {
    this.errorMsg = 'Please enter both username and password';
    return;
  }

  this.isLoading = true;
  this.errorMsg = '';
  this.successMsg = '';
  
  this.authService.login(this.username, this.password).subscribe({
    next: (res) => {
      this.successMsg = 'Login successful!';
      this.isLoading = false;
      setTimeout(() => {
        this.router.navigate([this.returnUrl]);
      }, 800);
    },
    error: (err) => {
      this.errorMsg = 'Invalid username or password';
      this.isLoading = false;
    }
  });
 }

 togglePasswordVisibility(): void {
  this.showPd = !this.showPd;
 }

 quickLogin(username: string, password: string): void {
    this.username = username;
    this.password = password;
    this.onSubmit();
 }
}
