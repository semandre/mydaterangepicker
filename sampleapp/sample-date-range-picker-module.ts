import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {MyDateRangePickerApp}  from './sample-date-range-picker-app';

import {SampleDateRangePickerNormal} from './sample-date-range-picker-normal/index';
import {SampleDateRangePickerInline} from './sample-date-range-picker-inline/index';
import {SampleDateRangePickerAccessModifier} from './sample-date-range-picker-access-modifier/index';

import {MyDateRangePickerModule} from '../src/my-date-range-picker/my-date-range-picker.module';

@NgModule({
    imports:      [ BrowserModule, ReactiveFormsModule, FormsModule, MyDateRangePickerModule ],
    declarations: [ MyDateRangePickerApp, SampleDateRangePickerNormal, SampleDateRangePickerInline, SampleDateRangePickerAccessModifier ],
    bootstrap:    [ MyDateRangePickerApp ]
})
export class SampleDateRangePickerModule { }