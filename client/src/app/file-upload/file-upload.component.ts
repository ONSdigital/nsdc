import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:5000/upload';

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.component.css']
})
export class FileUploadComponent {

  public uploader: FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e) {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e) {
    this.hasAnotherDropZoneOver = e;
  }

  constructor() { }

}
