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


@NgModule({
  declarations: [
    AppComponent,
    TimeComponent,
    UploadEventComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TimeService, UploadEventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
