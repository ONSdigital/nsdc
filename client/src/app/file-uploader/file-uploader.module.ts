import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgUploaderModule } from 'ngx-uploader';
import { LoadingModule } from '../loading/loading.module';
import { FileUploaderComponent }   from './file-uploader.component';

@NgModule({
  imports: [
    LoadingModule,
    NgUploaderModule,
    CommonModule
  ],
  exports: [FileUploaderComponent],
  declarations: [FileUploaderComponent],
  providers: [],
})
export class FileUploaderModule { }
