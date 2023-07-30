import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { EditComponent } from '../book/edit/edit.component';

const redirectToHome = () => redirectUnauthorizedTo('/');

const routes: Routes = [
  {
    path: 'gallery',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CatalogComponent,
      },
      {
        path: ':bookId',
        component: DetailsComponent,
        // canActivate: [AuthActivate],
      },
      {
        path: 'edit',
        component: EditComponent,
        data: {
          authOnly: true,
          authGuardPipe: redirectToHome,
        },
        canActivate: [AngularFireAuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule {}
