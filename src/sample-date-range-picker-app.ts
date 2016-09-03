import {Component} from '@angular/core';

declare var require:any;
const styles: string = require('./sample-date-range-picker-app.css');
const template: string = require('./sample-date-range-picker-app.html');

@Component({
  selector: 'mydaterangepicker-app',
  styles: [styles],
  template
})

export class MyDateRangePickerApp {

  constructor() {
    console.log('constructor: MyDateRangePickerApp');
  }

}
