import {Component, EventEmitter, OnInit, Output, ViewChild} from "@angular/core";
import {FileService} from '../file.service';

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
    ) { }

    ngOnInit() {
    }


    addFiles() {
        console.log("addFiles");
        this.file.nativeElement.click();
    }

    onFilesAdded(){
      console.log("OnFIlesAdded");
      this.contentReadEvent.emit({data: "DATA", status: 200});
    }
}
