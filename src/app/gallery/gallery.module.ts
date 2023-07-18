import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { FooterComponent } from '../core/footer/footer.component';
import { CoreModule } from '../core/core.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [CatalogComponent, DetailsComponent],
  imports: [CommonModule, CoreModule],
  exports: [CatalogComponent, DetailsComponent],
})
export class GalleryModule {}
