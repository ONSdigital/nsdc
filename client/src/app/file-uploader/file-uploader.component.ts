import { Component, NgZone, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgUploaderOptions, NgUploaderService } from 'ngx-uploader';

@Component({
  selector: 'nsdc-file-uploader',
  templateUrl: 'file-uploader.component.html',
  styleUrls: ['file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  private zone: NgZone;
  uploadError = false;
  uploadComplete = false;
  uploading = false;
  uploadingPercentage: number;
  uploadingSpeedHumanized: string;
  uploadedFilename: string;
  uploadErrorMessage: string;
  hasBaseDropZoneOver: boolean = false;
  extensions: string[];
  fileErrorMessages: string[] = [];

  @Input() private allowedExtensions: string;
  @Input() private validator: RegExp;
  @Input() private options: NgUploaderOptions;
  @Output() private onUploadAnother = new EventEmitter();

  constructor(
    public el: ElementRef,
    public uploader: NgUploaderService
  ) { }

  ngOnInit() {
    this.zone = new NgZone({ enableLongStackTrace: false });
    this.extensions = this.allowedExtensions && this.allowedExtensions.split(',');
  }

  startUpload() {
    this.fileErrorMessages = [];
    // only upload the file that the user can see (Fixes bug with dnd and multiple files)
    if (this.uploader._queue.length) {
      const fileToUpload = this.uploader._queue[0];

      if (!this.validateFile(fileToUpload.name)) {
        this.fileErrorMessages.push('File not accepted by validator.');
      }

      if (!this.validateFileExtension(fileToUpload.name)) {
        this.fileErrorMessages.push('File extension is not allowed.');
      }

      if (fileToUpload.uploading || this.fileErrorMessages.length) {
        return;
      }

      this.uploader.uploadFile(fileToUpload);
    }
  }

  validateFileExtension(filename) {
    return this.extensions && this.extensions.indexOf(filename && filename.split('.').pop()) !== -1;
  }

  validateFile(filename) {
    if (!this.validator) {
      return true;
    }
    return this.validator.test(filename);
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

  tryAgain() {
    this.uploader.clearQueue();
    const fileInputs = this.el.nativeElement.getElementsByClassName('file-input');
    if (fileInputs && fileInputs.length > 0) {
      fileInputs[0].value = '';
    }
    this.uploadComplete = false;
    this.uploadError = false;
  }

  uploadAnother() {
    this.onUploadAnother.emit();
  }
}
