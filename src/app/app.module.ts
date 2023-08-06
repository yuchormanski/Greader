import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { CheckPasswordDirective } from './validators/new-password.directive';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AppRoutingModule } from './app-routing.module';
import { GalleryModule } from './gallery/gallery.module';
import { SharedModule } from './shared/shared.module';
// import { AppInterceptorProvider } from './app.interceptor';
import { environment } from 'src/environments/environment';
import { BookModule } from './book/book.module';

//Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { NgxPaginationModule } from 'ngx-pagination';

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
    BookModule,
    UserModule,
    FormsModule,
    GalleryModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgxPaginationModule,
    AppRoutingModule,
  ],
  // providers: [AppInterceptorProvider],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
