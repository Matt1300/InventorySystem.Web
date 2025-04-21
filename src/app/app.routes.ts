import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

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
    loadComponent: () => import('./products/pages/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./products/pages/home-page/home-page.component').then(m => m.HomePageComponent),
        canActivate: [authGuard]
      },
      {
        path: 'inventory',
        loadComponent: () => import('./products/pages/inventory-page/inventory-page.component').then(m => m.InventoryPageComponent),
        canActivate: [authGuard]
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./products/pages/product-page/product-page.component').then(m => m.ProductPageComponent),
        canActivate: [authGuard]
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }

];
