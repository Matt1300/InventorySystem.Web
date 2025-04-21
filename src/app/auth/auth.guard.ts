import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const matSnackBar = inject(MatSnackBar);
  const authService = inject(AuthService);

  const token = authService.getToken();
  const refreshToken = authService.getRefreshToken();

  if (token || refreshToken) {
    return true;
  }

  matSnackBar.open('Inicia sesión para continuar', 'Ok', {
    duration: 3000,
    panelClass: ['mat-snackbar'],
    horizontalPosition: 'right',
    verticalPosition: 'top'
  });

  inject(Router).navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
