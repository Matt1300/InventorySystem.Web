import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  menuOptions: MenuOption[] = [
    {
      icon: 'home',
      label: 'Inicio',
      route: '/dashboard',
      sublabel: 'Panel de control'
    },
    {
      icon: 'inventory_2',
      label: 'Inventario',
      route: '/dashboard/inventory',
      sublabel: 'Artículos en inventario'
    },
    {
      icon: 'shopping_cart',
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
}
