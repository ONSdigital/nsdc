import { Component, NgZone, OnInit } from '@angular/core';
import { NgUploaderOptions, NgUploaderService } from 'ngx-uploader';
import { LoginService } from '../login/login.service';

const URL = 'http://localhost:5000/nsdc/v1.0/upload';

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  private zone: NgZone;
  invalidFile = false;
  uploadError = false;
  uploadComplete = false;
  uploading = false;
  uploadingPercentage: number;
  uploadingSpeedHumanized: string;
  uploadedFilename: string;
  uploadErrorMessage: string;
  hasBaseDropZoneOver: boolean = false;
  options: NgUploaderOptions;

  private allowedExtensions: string[] = ['txt'];

  constructor(
    public uploader: NgUploaderService,
    public loginService: LoginService
  ) { }

  ngOnInit() {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.options = new NgUploaderOptions({
      url: URL,
      multiple: false,
      autoUpload: false,
      customHeaders: {
        'X-TOKEN': this.loginService.getSessionId()
      }
    });
  }

  startUpload() {
    // only upload the file that the user can see (Fixes bug with dnd and multiple files)
    if (this.uploader._queue.length) {
      const fileToUpload = this.uploader._queue[0],
          isInvalidFile = !this.validateFileExtension(fileToUpload.name);

      this.invalidFile = isInvalidFile;
      if (fileToUpload.uploading || isInvalidFile) {
        return;
      }

      this.uploader.uploadFile(fileToUpload);
    }
  }

  validateFileExtension(filename) {
    return this.allowedExtensions.indexOf(filename && filename.split('.').pop()) !== -1;
  }

  handleUpload(data): void {
    this.zone.run(() => {
      if (data.error) {
        this.uploadError = true;
        this.uploading = false;
        this.uploadErrorMessage = 'Upload Failed';
      } else if (data && data.done) {
        if (data.status !== 200) {
          let responseData;
          try {
            responseData = JSON.parse(data.response);
          } catch (e) {
            responseData = {};
          }
          this.uploadErrorMessage = responseData.message || 'Upload Failed';
          this.uploadError = true;
          this.uploading = false;
        } else {
          this.uploadComplete = true;
          this.uploading = false;
          this.uploadedFilename = data.response;
        }
      } else {
        this.uploading = true;
        this.uploadingPercentage = data.progress.percent;
        this.uploadingSpeedHumanized = data.progress.speedHumanized;
      }
    });
  }

  fileOverBase(e) {
    this.hasBaseDropZoneOver = e;
  }

  uploadAnother() {
    this.uploader.clearQueue();
    this.uploadComplete = false;
    this.uploadError = false;
  }
}
