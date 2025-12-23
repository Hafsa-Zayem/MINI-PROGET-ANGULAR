
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable , tap } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { User , UserType} from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/*export interface StoredCredential {
  username: string;
  password: string;
}*/
@Injectable({
  providedIn: 'root',
})


export class AuthService {
  private base = 'http://localhost:3000/api';
  private tokenkey = 'authToken';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
/*
  private userDatabase: Map<string, {password: string; user: User}> = new Map([
    ['admin', {
      password: 'admin123',
      user: new User( 'Admin', 'User',UserType.Admin) 
    }],
   ['user', {
      password: 'user123',
      user: new User( 'Hafsa','ds' , UserType.Member)
    }],
    ['hafs', {
      password: 'hafs123',
      user: new User( 'Hafsa','Zayem', UserType.Member)
    }],
    ['guest', {
      password: 'guest123',
      user: new User( 'Guest','User', UserType.Guest)
    }]
  ]);
*/
  constructor(private http: HttpClient, private router: Router){
   // this.checkStoredAuth();
   this.loadStored();
  }
/*
  private checkStoredAuth(): void {
    const storedUserData = localStorage.getItem('currentUser');
    if (storedUserData) {
      try {
      const userData = JSON.parse(storedUserData);

      const user = new User(
        userData.firstName,
        userData.lastName,
        userData.UserType as UserType
      ); 
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    } catch (error) {
      localStorage.removeItem('currentUser');
    }
    }
  }
*/

private loadStored() {
  const token = localStorage.getItem(this.tokenkey);
  if(token) {
    this.getProfile(token).subscribe({
      next: (u: any) => this.currentUserSubject.next(new User(u.firstName, u.lastName, u.role)),
      error: () => { localStorage.removeItem(this.tokenkey);}
    });
  }
}

login(username: string, password: string): Observable<{ token: string; user: any }> {
      return this.http.post<{token:string, user:any}>(`${this.base}/auth/login` , { username, password})
      .pipe(tap(res => {
        if (res?.token) {
          localStorage.setItem(this.tokenkey, res.token);
          const u = res.user;
          this.currentUserSubject.next(new User(u.firstName, u.lastName, u.role));
          this.isAuthenticatedSubject.next(true);
        }
      }));
    }
  

  logout(): void {
localStorage.removeItem(this.tokenkey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

getToken(): string | null {
  return localStorage.getItem(this.tokenkey);
}

// Optional helper for creating headers
  public createAuthHeader(token?: string) {
    const t = token || this.getToken();
    return t ? { headers: new HttpHeaders({ Authorization: `Bearer ${t}` }) } : {};
  }

  // Call the `/auth/me` endpoint using the token
  getProfile(token?: string): Observable<any> {
    const opts = this.createAuthHeader(token);
    return this.http.get<any>(`${this.base}/auth/me`, opts);
  }

isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.getuserType() === UserType.Admin;
  }
 
/*
   getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.getuserType() === UserType.Admin;
  }

  isMember(): boolean {
    const user = this.getCurrentUser();
    return user?.getuserType() === UserType.Member;
  }

  isGuest(): boolean {
    const user = this.getCurrentUser();
    return user?.getuserType() === UserType.Guest;
  }
*/
  
}
