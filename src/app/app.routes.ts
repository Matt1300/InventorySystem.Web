import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/features/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/features/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ],

  },
  {
    path: 'dashboard',
    loadComponent: () => import('./products/pages/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent)
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }

];
