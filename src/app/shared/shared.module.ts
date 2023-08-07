import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { AlertComponent } from './alert/alert.component';
import { EventBlockerDirective } from './directives/event-blocker.directive';
import { SlicePipe } from './pipes/slice.pipe';
import { FormsModule } from '@angular/forms';
import { StarsComponent } from './stars/stars.component';

@NgModule({
  declarations: [
    LoaderComponent,
    AlertComponent,
    EventBlockerDirective,
    SlicePipe,
    StarsComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    LoaderComponent,
    AlertComponent,
    EventBlockerDirective,
    SlicePipe,
    StarsComponent,
  ],
})
export class SharedModule {}
