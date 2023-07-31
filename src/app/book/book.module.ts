import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { UploadComponent } from './upload/upload.component';
import { ManageComponent } from './manage/manage.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { UserRoutingModule } from '../user/user-routing.module';

@NgModule({
  declarations: [UploadComponent, ManageComponent, EditComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    UserRoutingModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [BookRoutingModule],
})
export class BookModule {}
