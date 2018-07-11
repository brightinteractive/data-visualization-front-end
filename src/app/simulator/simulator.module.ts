import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SimulateEventComponent} from "./components/simulate-event/simulate-event.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SimulateEventService} from "./services/simulate-event/simulate-event.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [SimulateEventComponent],
  exports: [SimulateEventComponent],
  providers: [SimulateEventService]
})
export class SimulatorModule { }
