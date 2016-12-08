import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MyDateRangePickerApp}  from './sample-date-range-picker-app';
import {SampleDateRangePickerNormal} from './components/sample-date-range-picker-normal/index';
import {SampleDateRangePickerInline} from './components/sample-date-range-picker-inline/index';
import {MyDateRangePickerModule} from 'mydaterangepicker';

@NgModule({
    imports:      [ BrowserModule, MyDateRangePickerModule ],
    declarations: [ MyDateRangePickerApp, SampleDateRangePickerNormal, SampleDateRangePickerInline ],
    bootstrap:    [ MyDateRangePickerApp ]
})
export class SampleDateRangePickerModule { }