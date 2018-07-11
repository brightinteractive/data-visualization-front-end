import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SimulateEventComponent} from './components/simulate-event/simulate-event.component';

const routes: Routes = [
  {
    path: '',
    component: SimulateEventComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimulatorRoutingModule { }
