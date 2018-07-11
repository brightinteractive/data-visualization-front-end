import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HttpClientModule} from '@angular/common/http';
import { VisualizerRoutingModule } from './visualizer-routing.module';
import { VisualizeEventsComponent } from './components/visualize-events/visualize-events.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VisualizeEventsService} from './services/visualize-events.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    VisualizerRoutingModule,
  ],
  declarations: [VisualizeEventsComponent],
  providers: [VisualizeEventsService]
})
export class VisualizerModule { }
