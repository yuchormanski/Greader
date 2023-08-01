import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ManageComponent } from './manage/manage.component';
import { EditComponent } from './edit/edit.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { DeleteComponent } from './delete/delete.component';

const redirectToLogin = () => redirectUnauthorizedTo('login');

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  {
    path: 'manage',
    component: ManageComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectToLogin,
    },
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectToLogin,
    },
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'delete/:id',
    component: DeleteComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectToLogin,
    },
    canActivate: [AngularFireAuthGuard],
  },
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
