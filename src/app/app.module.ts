import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
//import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { TimeComponent } from './components/time/time.component';
import { TimeService } from './services/time/time.service';
import { UploadEventComponent } from './components/upload-event/upload-event.component';
import { UploadEventService } from './services/upload-event/upload-event.service';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    TimeComponent,
    UploadEventComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [TimeService, UploadEventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
