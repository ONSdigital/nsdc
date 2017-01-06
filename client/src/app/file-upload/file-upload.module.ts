import { NgModule } from '@angular/core';

import { FileUploadRoutingModule, routedComponents } from './file-upload-routing.module';

@NgModule({
  imports: [FileUploadRoutingModule],
  declarations: [routedComponents]
})
export class FileUploadModule { }
