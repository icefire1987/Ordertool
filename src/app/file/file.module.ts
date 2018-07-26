import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatListModule
        MatProgressBarModule
    ],
    declarations: [UploadComponent],
    exports: [UploadComponent],
})
export class FileModule { }
