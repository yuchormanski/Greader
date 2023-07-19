import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
// import { FooterComponent } from '../core/footer/footer.component';

import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';
import { GalleryRoutingModule } from './gallery-routing.module';

@NgModule({
  declarations: [CatalogComponent, DetailsComponent],
  imports: [CommonModule, CoreModule, GalleryRoutingModule],
  exports: [CatalogComponent, DetailsComponent],
})
export class GalleryModule {}
