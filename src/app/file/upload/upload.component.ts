import {Component, EventEmitter, OnInit, Output, ViewChild} from "@angular/core";
import {FileService} from '../file.service';
import {MatDialog} from "@angular/material";
import {DialogPreviewComponent} from "../dialog-preview/dialog-preview.component";
import {MyFile} from '../file.module';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

    @ViewChild('file') file;
    private files: Set<MyFile> = new Set();
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
        this.files = new Set();
        const files: { [key: string]: MyFile } = this.file.nativeElement.files;
        for (let key in files) {
            if (!isNaN(parseInt(key))) {
                switch(true){
                    case files[key].type.includes("csv"):
                    case files[key].type.includes("ms-excel"):
                        files[key].icon_filetype = "table_chart";
                        break;

                    case files[key].type.includes("image"):
                        files[key].icon_filetype = "image";
                        break;
                    case files[key].type.includes("text"):
                        files[key].icon_filetype = "library_books";
                        break;
                    case files[key].type.includes("pdf"):
                        files[key].icon_filetype = "picture_as_pdf";
                        break;
                    default:
                        files[key].icon_filetype = "help";
                        break;
                }

                this.files.add(files[key]);
            }
        }

        this.openDialog();

      //this.contentReadEvent.emit({data: "DATA", status: 200});
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogPreviewComponent, {
            data: {files: this.files}
        });

        dialogRef.afterClosed().subscribe(result => {
            if(typeof result !== 'undefined' && result.size>0){

                this.contentReadEvent.emit({data: this.files, status: 200});
            }else{

            }
        });
    }
}
