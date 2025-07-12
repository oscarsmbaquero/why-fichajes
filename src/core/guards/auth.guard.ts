import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service'; 
import { of } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['expectedRole'];

  if (expectedRole && !authService.hasRole(expectedRole)) {
    return of(router.createUrlTree(['/']));
  }

  return of(true);
};

