import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { AlertComponent } from './alert/alert.component';
import { EventBlockerDirective } from './directives/event-blocker.directive';
import { SlicePipe } from './pipes/slice.pipe';

@NgModule({
  declarations: [
    LoaderComponent,
    AlertComponent,
    EventBlockerDirective,
    SlicePipe,
  ],
  imports: [CommonModule],
  exports: [LoaderComponent, AlertComponent, EventBlockerDirective, SlicePipe],
})
export class SharedModule {}
