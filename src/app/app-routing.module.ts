import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [


  {
    path: 'simulator',
    loadChildren: './simulator/simulator.module#SimulatorModule'
  },
  {
    path: 'visualizer',
    loadChildren: './visualizer/visualizer.module#VisualizerModule'
  },
  {
    path: '',
    redirectTo: 'simulator',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
