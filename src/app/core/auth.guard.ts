import { inject } from '@angular/core';
import { Router, CanActivateFn } from "@angular/router";
import { AuthService } from './auth.service';



export const authGuard: CanActivateFn = (route, state) => {
  let isRegistered:boolean
  if (!localStorage.getItem('authData')) {
    isRegistered = false;
  } else {
    isRegistered = JSON.parse(localStorage.getItem('authData')!).registered;
  }
  const authService=inject(AuthService)
  const router = inject(Router);
  const isTokenExpired = authService.isTokenExpired();


  if (!isRegistered || isTokenExpired) {
    authService.clearExpiredToken();
    router.navigate(['/']);
    return false;
  }

  return true;
};