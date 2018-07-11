import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VisualizeEventsComponent} from './components/visualize-events/visualize-events.component';

const routes: Routes = [
  {
    path: '',
    component: VisualizeEventsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualizerRoutingModule { }
