import {Component} from '@angular/core';
import {SampleDateRangePickerNormal} from './sample-date-range-picker-normal/index';

declare var require:any;
const styles: string = require('./sample-date-range-picker-app.css');
const template: string = require('./sample-date-range-picker-app.html');

@Component({
  selector: 'mydaterangepicker-app',
  providers: [],
  pipes: [],
  directives: [SampleDateRangePickerNormal],
  styles: [styles],
  template
})

export class MyDateRangePickerApp {

  constructor() {
    console.log('constructor: MyDateRangePickerApp');
  }

}
