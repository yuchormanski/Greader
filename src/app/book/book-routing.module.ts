import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'manage', component: ManageComponent },
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
