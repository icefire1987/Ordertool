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
    private files: Set<File> = new Set();
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
        const files: { [key: string]: File } = this.file.nativeElement.files;
        for (let key in files) {
            if (!isNaN(parseInt(key))) {
                switch(true){
                    case files[key].type.includes("csv"):
                    case files[key].type.includes("ms-excel"):
                        files[key].icon_filetyp = "table_chart";
                        break;

                    case files[key].type.includes("image"):
                        files[key].icon_filetyp = "image";
                        break;
                    case files[key].type.includes("text"):
                        files[key].icon_filetyp = "library_books";
                        break;
                    case files[key].type.includes("pdf"):
                        files[key].icon_filetyp = "picture_as_pdf";
                        break;
                    default:
                        files[key].icon_filetyp = "help";
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
