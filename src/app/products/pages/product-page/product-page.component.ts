import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { ProductDetails } from '../../interfaces/Product';


@Component({
  selector: 'app-product-page',
  imports: [CommonModule, MatTabsModule, MatButtonModule],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit {

  productService = inject(ProductsService);
  route = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  product?: ProductDetails;
  productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  ngOnInit(): void {
    this.getProductById(this.productId!);
  }

  getProductById(id: number) {

    this.productService.getProductById(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.product = response.data;
        } else {
          console.error('Error al cargar el producto:', response.message);
        }
      },
      error: (error) => {
        console.error('Error al cargar el producto:', error);
      }
    });
  }

  activeTabIndex = 0;

  onReturn() {
    this.route.navigate(['/dashboard/inventory']);
  }

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }
}
