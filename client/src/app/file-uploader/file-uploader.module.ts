import { NgModule } from '@angular/core';
import { NgUploaderModule } from 'ngx-uploader';
import { FileUploaderComponent }   from './file-uploader.component';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    NgUploaderModule,
    SharedModule
  ],
  exports: [FileUploaderComponent],
  declarations: [FileUploaderComponent],
  providers: [],
})
export class FileUploaderModule { }
