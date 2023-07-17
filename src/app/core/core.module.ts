import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, AboutComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, AboutComponent, FooterComponent],
})
export class CoreModule {}
