import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoreRoutingModule } from './core/core.routing.module';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { UserRoutingModule } from './user/user-routing.module';
import { CheckPasswordDirective } from './validators/new-password.directive';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AppRoutingModule } from './app-routing.module';
import { GalleryRoutingModule } from './gallery/gallery-routing.module';
import { GalleryModule } from './gallery/gallery.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CheckPasswordDirective,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    SharedModule,
    CoreModule,
    CoreRoutingModule,
    UserModule,
    UserRoutingModule,
    FormsModule,
    GalleryModule,
    GalleryRoutingModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
