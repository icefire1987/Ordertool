import {Component, EventEmitter, OnInit, Output, ViewChild} from "@angular/core";
import {FileService} from '../file.service';
import {MatDialog} from "@angular/material";
import {DialogPreviewComponent} from "../dialog-preview/dialog-preview.component";

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

    @ViewChild('file') file;
    public files: Set<File> = new Set();

    @Output() contentReadEvent = new EventEmitter();
    constructor(
        private FileService: FileService,
        public dialog: MatDialog,

    ) { }

    ngOnInit() {
    }


    addFiles() {
        console.log("addFiles");
        this.file.nativeElement.click();
    }

    onFilesAdded(){
      console.log("OnFIlesAdded");
      this.openDialog();
      //this.contentReadEvent.emit({data: "DATA", status: 200});
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogPreviewComponent, {
            width: '250px',
            data: {name: 'test'}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            //this.animal = result;
        });
    }
}
