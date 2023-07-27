import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { AlertComponent } from './alert/alert.component';
import { EventBlockerDirective } from './directives/event-blocker.directive';

@NgModule({
  declarations: [LoaderComponent, AlertComponent, EventBlockerDirective],
  imports: [CommonModule],
  exports: [LoaderComponent, AlertComponent, EventBlockerDirective],
})
export class SharedModule {}
