import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
  ],
  exports: [LoginComponent, RegisterComponent, ProfileComponent],
})
export class UserModule {}
