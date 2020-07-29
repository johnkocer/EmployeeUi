import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { EmployeeComponent } from './employee/employee.component';
import { FetchdataService } from './fetchdata.service';
import { HttpClientModule } from '@angular/common/http';
import { LogService, LOG_SERVICE, SpecialLogService,  LogLevel, LOG_LEVEL} from "./log.service";
let logger = new LogService();
logger.minimumLevel = LogLevel.DEBUG;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: "BASE_URL", useFactory: getBaseUrl },LogService,
    FetchdataService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName("base")[0].href;
}
