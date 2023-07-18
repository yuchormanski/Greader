import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { FooterComponent } from '../core/footer/footer.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [CatalogComponent],
  imports: [CommonModule, CoreModule],
  exports: [CatalogComponent],
})
export class GalleryModule {}
