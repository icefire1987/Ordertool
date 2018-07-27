import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule } from '@angular/material';
import { DialogPreviewComponent } from './dialog-preview/dialog-preview.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatListModule,
        MatProgressBarModule
    ],
    declarations: [
        UploadComponent,
        DialogPreviewComponent],
    entryComponents: [
        DialogPreviewComponent,
    ],
    exports: [UploadComponent],
})
export class FileModule { }
