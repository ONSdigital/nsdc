import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgUploaderModule } from 'ngx-uploader';
import { FileUploadRoutingModule, routedComponents } from './file-upload-routing.module';

@NgModule({
  imports: [
    FileUploadRoutingModule,
    NgUploaderModule,
    CommonModule
  ],
  declarations: [routedComponents]
})
export class FileUploadModule { }
