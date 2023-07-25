import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, AboutComponent, FooterComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [HeaderComponent, AboutComponent, FooterComponent],
})
export class CoreModule {}
