import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core.routing.module';

@NgModule({
  declarations: [HeaderComponent, AboutComponent, FooterComponent],
  imports: [CommonModule, RouterModule, CoreRoutingModule, SharedModule],
  exports: [
    HeaderComponent,
    AboutComponent,
    FooterComponent,
    CoreRoutingModule,
  ],
})
export class CoreModule {}
