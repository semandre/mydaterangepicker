import {Component} from '@angular/core';

@Component({
  selector: 'mydaterangepicker-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  moduleId: module.id,
})

export class MyDateRangePickerApp {

  constructor() {
    console.log('constructor: MyDateRangePickerApp');
  }

  toMyDatePicker(): void {
    window.open('http://kekeh.github.io/mydatepicker', '_self');
  }

  toNgxMyDatePicker(): void {
    window.open('http://kekeh.github.io/ngx-mydatepicker', '_self');
  }

}
