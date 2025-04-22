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
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BatchService } from '../../services/batch.service';
import { EditBatchModalComponent } from '../../components/edit-batch-modal/edit-batch-modal.component';
import { DeleteBatchModelComponent } from '../../components/delete-batch-model/delete-batch-model.component';

@Component({
  selector: 'app-badge-page',
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
  templateUrl: './badge-page.component.html',
})
export class BatchPageComponent implements OnInit, AfterViewInit {
  router = inject(Router);
  dialog = inject(MatDialog);
  badgeService = inject(BatchService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  matSnackBar = inject(MatSnackBar);
  searchTerm: string = '';
  displayedColumns: string[] = ['batchNumber', 'nameProduct', 'price', 'quantity', 'entryDate', 'actions'];
  dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.loadBadges();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadBadges() {
    this.badgeService.getBatches().subscribe({
      next: (response) => {
        if (response.success) {
          const transformedData = response.data.map((batch) => ({
            id: batch.id,
            batchNumber: batch.batchNumber,
            nameProduct: batch.nameProduct,
            price: batch.price,
            quantity: batch.quantity,
            entryDate: batch.entryDate,
          }));
          this.dataSource.data = transformedData;
        } else {
          console.error('Error al cargar los lotes:', response.message);
        }
      },
      error: (error) => {
        console.error('Error al cargar los lotes:', error);
      }
    });
  }

  openEditModal(batch: any) {
    const dialogRef = this.dialog.open(EditBatchModalComponent, {
      width: '700px',
      data: { ...batch },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.saveProduct(result);
      }
    });
  }

  saveProduct(batch: any) {
    this.badgeService.updateBatch(batch.id, batch).subscribe({
      next: (response) => {
        if (response.success) {
          this.matSnackBar.open(response.message, 'Cerrar', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.loadBadges();
        } else {
          this.matSnackBar.open(response.message, 'Cerrar', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      },
      error: (error) => {
        console.error('Error al actualizar el lote:', error);
      }
    });
  }

  confirmDeleteModal(batch: any) {
    const dialogRef = this.dialog.open(DeleteBatchModelComponent, {
      width: '400px',
      data: { batchNumber: batch.batchNumber },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteProduct(batch.id);
      }
    });
  }

  deleteProduct(id: number) {
    this.badgeService.deleteBatch(id).subscribe({
      next: (response) => {
        if (response.success) {
          this.matSnackBar.open(response.message, 'Cerrar', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.loadBadges();
        } else {
          this.matSnackBar.open(response.message, 'Cerrar', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      },
      error: (error) => {
        console.error('Error al eliminar el lote:', error);
      }
    });
  }
}
