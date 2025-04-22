import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { NgStyle } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { BatchService } from 'src/app/batches/services/batch.service';
import { GetBatches } from 'src/app/batches/interfaces/Batch';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    NgStyle,
    CommonModule
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {

  ngOnInit(): void {
    this.getTotalProducts();
    this.getLastBatches();
  }

  productService = inject(ProductsService);
  batchService = inject(BatchService);
  totalProducts = signal<number>(0);
  lastBadges = signal<GetBatches[]>([]);
  totalPrice = signal<number>(0);

  movimientos: any[] = [];
  columnas: string[] = ['fecha', 'numeroLote', 'producto', 'cantidad', 'price'];

  getTotalProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        const productsActive = res.data.filter(product => product.isActive === true);
        this.totalProducts.set(productsActive.length);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getLastBatches() {
    this.batchService.getBatches().subscribe({
      next: (res) => {
        this.totalPrice.set(res.data.reduce((acc, batch) => acc + batch.price, 0));
        this.lastBadges.set(res.data.slice(0, 3));
        this.addBatchesToMovements(this.lastBadges());
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  addBatchesToMovements(batches: GetBatches[]) {
    this.movimientos = [];
    batches.forEach(batch => {
      const movimiento = {
        fecha: batch.entryDate,
        numeroLote: batch.batchNumber,
        producto: batch.nameProduct,
        cantidad: batch.quantity,
        price: batch.price,
      };

      this.movimientos.push(movimiento);
    });
  }
}
