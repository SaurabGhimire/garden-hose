import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export enum UserRole {
  user,
  admin
}

export const authGuard = (allowedRoles: UserRole[]): CanActivateFn => (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  const userRoles = authService.getUserRole();
  if (!userRoles.some((role: UserRole) => allowedRoles.includes(role))) {
    router.navigate(['/unauthorized']);
    return false;
  }
  return true;
};