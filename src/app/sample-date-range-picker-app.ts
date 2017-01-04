import {Component} from '@angular/core';

declare var require:any;
const sampleAppStyles: string = require('./sample-date-range-picker-app.css');
const sampleAppTemplate: string = require('./sample-date-range-picker-app.html');

@Component({
  selector: 'mydaterangepicker-app',
  styles: [sampleAppStyles],
  template: sampleAppTemplate
})

export class MyDateRangePickerApp {

  constructor() {
    console.log('constructor: MyDateRangePickerApp');
  }

  toDatePicker(): void {
    window.open('http://kekeh.github.io/mydatepicker', '_self');
  }

}
