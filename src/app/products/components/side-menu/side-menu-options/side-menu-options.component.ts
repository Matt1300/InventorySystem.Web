import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

interface MenuOption {
  icon: string;
  label: string;
  route: string;
  sublabel: string;
}

@Component({
  selector: 'side-menu-options',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {

  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-house',
      label: 'Inicio',
      route: '/dashboard/home',
      sublabel: 'Panel de control'
    },
    {
      icon: 'fa-solid fa-truck-ramp-box',
      label: 'Inventario',
      route: '/dashboard/inventory',
      sublabel: 'Artículos en inventario'
    },
    {
      icon: 'fa-solid fa-cart-shopping',
      label: 'Compras',
      route: '/dashboard/purchases',
      sublabel: 'Registro de compras'
    },
    {
      icon: 'sell',
      label: 'Ventas',
      route: '/dashboard/sales',
      sublabel: 'Registro de ventas'
    }
  ]

  logout() {
    this.authService.logout();
    this.matSnackBar.open('Sesión cerrada', 'Cerrar', {
      duration: 3000,
      panelClass: ['mat-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })

    this.router.navigate(['/auth/login']);
  }

}
