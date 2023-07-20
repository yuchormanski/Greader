import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CatalogComponent, DetailsComponent],
  imports: [CommonModule, CoreModule, GalleryRoutingModule, SharedModule],
  exports: [CatalogComponent, DetailsComponent],
})
export class GalleryModule {}
