import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, UrlSegment, RouterStateSnapshot, UrlTree, CanActivateFn } from '@angular/router';
import { AuthService } from 'app/services/auth-service';

// Guard that checks if user is authenticated; otherwise returns an UrlTree redirecting to /login
export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Prefer using RouterStateSnapshot URL if available; otherwise build from route segments
  router.navigate(['/login'], { queryParams: { returnUrl: state.url}});
  return false;
};
