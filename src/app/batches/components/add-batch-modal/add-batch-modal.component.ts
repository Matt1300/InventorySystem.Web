import { Component, inject, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProductsService } from 'src/app/products/services/products.service';
import { SearchProduct } from 'src/app/products/interfaces/Product';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-batch-modal',
  providers: [provideNativeDateAdapter()],
  imports: [MatDatepickerModule, MatFormFieldModule, CommonModule, FormsModule, MatInputModule, MatDialogModule, MatButtonModule, MatSelectModule, MatAutocompleteModule],
  templateUrl: './add-batch-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBatchModalComponent {

  productService = inject(ProductsService);

  constructor(
    public dialogRef: MatDialogRef<AddBatchModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  productSearch = '';
  filteredProducts: SearchProduct[] = [];

  searchProducts(term: string) {
    if (term.length < 2) return;

    this.productService.searchProducts(term).subscribe({
      next: res => this.filteredProducts = res.data,
      error: err => console.error(err)
    });
  }

  selectProduct(product: SearchProduct) {
    this.data.productId = product.id;
  }

  displayProduct(product: any): string {
    return product?.name || '';
  }


  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.data);
  }
}
