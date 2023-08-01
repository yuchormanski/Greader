import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

const redirectToLogin = () => redirectUnauthorizedTo('login');

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectToLogin,
    },
    canActivate: [AngularFireAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
