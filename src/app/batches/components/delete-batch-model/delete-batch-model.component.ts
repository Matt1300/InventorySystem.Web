import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-batch-model',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete-batch-model.component.html',
})
export class DeleteBatchModelComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteBatchModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { batchNumber: string }
  ) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
