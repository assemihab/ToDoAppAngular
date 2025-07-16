import { inject } from '@angular/core';
import { Router, CanActivateFn } from "@angular/router";
import { AuthService } from './auth.service';



export const authGuard: CanActivateFn = (route, state) => {
  const isRegistered=JSON.parse(localStorage.getItem('authData')!).registered;
  const authService=inject(AuthService)
  const router = inject(Router);
  const isTokenExpired = authService.isTokenExpired();


  if (!isRegistered || isTokenExpired) {
    authService.clearExpiredToken();
    router.navigate(['/login']);
    return false;
  }

  return true;
};