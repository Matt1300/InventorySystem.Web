import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditProductModalComponent } from '../../components/edit-product-modal/edit-product-modal.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDeleteModalComponent } from '../../components/confirm-delete-modal/confirm-delete-modal.component';
import { AddProductModalComponent } from '../../components/add-product-modal/add-product-modal.component';
@Component({
  selector: 'app-inventory-page',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './inventory-page.component.html',
})
export class InventoryPageComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  matSnackBar = inject(MatSnackBar);
  searchTerm: string = '';
  displayedColumns: string[] = ['code', 'name', 'description', 'stock', 'price', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<any>();


  constructor(
    private productService: ProductsService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        if (response.success) {
          const transformedData = response.data.map((product) => ({
            id: product.id,
            code: product.code,
            name: product.name,
            description: product.description,
            stock: product.quantity,
            price: product.actualPrice,
            isActive: product.isActive ? 'Activo' : 'Inactivo',
          }));
          this.dataSource.data = transformedData;
        } else {
          console.error('Error al cargar los productos:', response.message);
        }
      },
      error: (error) => {
        console.error('Error al cargar los productos:', error);
      }
    });
  }

  createProduct(newProduct: any) {
    this.productService.addProduct(newProduct).subscribe({
      next: (response) => {
        if (response.success) {
          this.matSnackBar.open(response.message, 'Cerrar', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          })
          this.loadProducts();
        } else {
          this.matSnackBar.open(response.message, 'Cerrar', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          })
        }
      },
      error: (error) => {
        console.error('Error al crear el producto:', error);
      }
    });
  }

  verProducto(id: number) {
    this.router.navigate(['/dashboard/product', id]);
  }

  saveProduct(updatedProduct: any) {
    this.productService.updateProduct(updatedProduct.id, updatedProduct).subscribe({
      next: (response) => {
        if (response.success) {
          this.matSnackBar.open(response.message, 'Cerrar', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          })
          this.loadProducts();
        } else {
          this.matSnackBar.open(response.message, 'Cerrar', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          })
        }
      },
      error: (error) => {
        console.error('Error al actualizar el producto:', error);
      }
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.matSnackBar.open(response.message, 'Cerrar', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          })
          this.loadProducts();
        } else {
          this.matSnackBar.open(response.message, 'Cerrar', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          })
        }
      },
      error: (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openEditModal(product: any) {
    const dialogRef = this.dialog.open(EditProductModalComponent, {
      width: '700px',
      data: {
        ...product,
        isActive: product.isActive === 'Activo' ? true : false,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveProduct(result);
      }
    });
  }


  confirmDelete(product: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      width: '400px',
      data: { name: product.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteProduct(product.id);
      }
    });
  }

  openNewProductModal() {
    const dialogRef = this.dialog.open(AddProductModalComponent, {
      width: '700px',
      data: {
        name: '',
        description: '',
      },
    });

    dialogRef.afterClosed().subscribe((newProduct: any) => {
      if (newProduct) {
        this.createProduct(newProduct);
      }
    });
  }
}
