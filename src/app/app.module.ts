import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoreRoutingModule } from './core/core.routing.module';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { UserRoutingModule } from './user/user-routing.module';
import { CheckPasswordDirective } from './validators/new-password.directive';

@NgModule({
  declarations: [AppComponent, HomeComponent, CheckPasswordDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CoreModule,
    CoreRoutingModule,
    UserModule,
    UserRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
