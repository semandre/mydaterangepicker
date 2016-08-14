import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MyDateRangePickerApp }  from './sample-date-range-picker-app';

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ MyDateRangePickerApp ],
    bootstrap:    [ MyDateRangePickerApp ]
})
export class SampleDateRangePickerModule { }