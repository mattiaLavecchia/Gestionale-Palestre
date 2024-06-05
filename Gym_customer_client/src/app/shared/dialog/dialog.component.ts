import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  template: `
  <h2 mat-dialog-title>{{ data.title }}</h2>
  <mat-dialog-content>
    <p>{{ data.message }}</p>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button (click)="onCancelClick()">Annulla</button>
    <button mat-flat-button color="primary" (click)="onConfirmClick()">Conferma</button>
  </mat-dialog-actions>
  `,
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}

export interface DialogData {
  title: string;
  message: string;
}

