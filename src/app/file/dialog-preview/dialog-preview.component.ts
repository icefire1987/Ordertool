import {Component, Inject} from '@angular/core';
import {MatDialogRef, MatButton, MAT_DIALOG_DATA} from "@angular/material";


@Component({
  selector: 'dialog-preview',
  templateUrl: './dialog-preview.component.html',
  styleUrls: ['./dialog-preview.component.css']
})
export class DialogPreviewComponent {

  constructor(
      public dialogRef: MatDialogRef<DialogPreviewComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onOKClick(): void {
    this.dialogRef.close(this.data.files);
  }

}
