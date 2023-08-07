import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Hero } from '../../interfaces';

@Component({
  selector: 'heroes-confirm-dialag',
  templateUrl: './confirm-dialag.component.html',
})
export class ConfirmDialagComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialagComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
