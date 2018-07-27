import {Component} from '@angular/core';
import {MatDialogRef, MatButton} from "@angular/material";


@Component({
  selector: 'dialog-preview',
  templateUrl: './dialog-preview.component.html',
  styleUrls: ['./dialog-preview.component.css']
})
export class DialogPreviewComponent {

  constructor(
      public dialogRef: MatDialogRef<DialogPreviewComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
