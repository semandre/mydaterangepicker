import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MyDateRangePickerApp } from './app.component';

import {SampleDateRangePickerNormal} from './sample-date-range-picker-normal/index';
import {SampleDateRangePickerInline} from './sample-date-range-picker-inline/index';
import {MyDateRangePickerModule} from 'mydaterangepicker';

@NgModule({
  declarations: [
    MyDateRangePickerApp, SampleDateRangePickerNormal, SampleDateRangePickerInline
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyDateRangePickerModule
  ],
  providers: [],
  bootstrap: [MyDateRangePickerApp]
})
export class AppModule { }
