import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MyDateRangePickerApp}  from './sample-date-range-picker-app';
import {SampleDateRangePickerNormal} from './components/sample-date-range-picker-normal/index';
import {SampleDateRangePickerInline} from './components/sample-date-range-picker-inline/index';
import {MyDateRangePicker} from './components/my-date-range-picker/index';

@NgModule({
    imports:      [ BrowserModule ],
    declarations: [ MyDateRangePickerApp, SampleDateRangePickerNormal, SampleDateRangePickerInline, MyDateRangePicker ],
    bootstrap:    [ MyDateRangePickerApp ]
})
export class SampleDateRangePickerModule { }