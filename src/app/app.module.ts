import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { TimeComponent } from './components/time/time.component';
import { UploadEventComponent } from './components/upload-event/upload-event.component';
import { TimeService } from './services/time/time.service';
import { UploadEventService } from './services/upload-event/upload-event.service';


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
    ReactiveFormsModule
  ],
  providers: [TimeService, UploadEventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
