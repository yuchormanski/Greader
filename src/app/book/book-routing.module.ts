import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ManageComponent } from './manage/manage.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'edit/:id', component: EditComponent },
  // {
  //   path: '',
  //   children: [
  //     {
  //       path: '',
  //       pathMatch: 'full',
  //       component: ,
  //     },
  //     {
  //       path: '',
  //       component: ,
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
