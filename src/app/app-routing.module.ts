import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'simulator',
    loadChildren: 'app/simulator/simulator.module#SimulatorRoutingModule'
  },
  {
    path: 'visualizer',
    loadChildren: 'app/visualizer/visualizer.module#VisualizerRoutingModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
