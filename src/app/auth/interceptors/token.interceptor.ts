import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError, filter, take } from 'rxjs';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const router = inject(Router);

  let clonedReq = req;

  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('validate-refresh-token')) {
        if (!authService['isRefreshing']) {
          authService['isRefreshing'] = true;
          authService['refreshTokenSubject'].next(null);
          return authService.refreshToken().pipe(
            switchMap((response) => {
              authService['isRefreshing'] = false;
              const newToken = response.data.token;
              authService['refreshTokenSubject'].next(newToken);

              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next(newReq);
            }),
            catchError((err) => {
              authService.logout();
              router.navigate(['/auth/login']);
              return throwError(() => err);
            })
          );
        } else {
          return authService['refreshTokenSubject'].pipe(
            filter(token => token !== null),
            take(1),
            switchMap((newToken) => {
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next(newReq);
            })
          );
        }
      }

      return throwError(() => error);
    })
  );
};
