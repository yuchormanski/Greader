import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
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
