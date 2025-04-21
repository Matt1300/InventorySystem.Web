import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    NgClass,
    NgStyle
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  columnas: string[] = ['fecha', 'producto', 'tipo', 'cantidad'];

  movimientos = [
    { fecha: '19/04/2025', producto: 'Monitor LED 24"', tipo: 'Entrada', cantidad: 15 },
    { fecha: '18/04/2025', producto: 'Teclado mecánico', tipo: 'Salida', cantidad: 5 },
    { fecha: '17/04/2025', producto: 'Mouse inalámbrico', tipo: 'Salida', cantidad: 8 }
  ];
}
