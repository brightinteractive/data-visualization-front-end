import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualizerRoutingModule } from './visualizer-routing.module';
import { VisualizeEventsComponent } from './components/visualize-events/visualize-events.component';

@NgModule({
  imports: [
    CommonModule,
    VisualizerRoutingModule,
  ],
  declarations: [VisualizeEventsComponent]
})
export class VisualizerModule { }
