# mydaterangepicker

**Angular 2 date range picker - Angular2 reusable UI component**

[![Build Status](https://travis-ci.org/kekeh/mydaterangepicker.svg?branch=master)](https://travis-ci.org/kekeh/mydaterangepicker)
[![codecov](https://codecov.io/gh/kekeh/mydaterangepicker/branch/master/graph/badge.svg)](https://codecov.io/gh/kekeh/mydaterangepicker)
[![npm](https://img.shields.io/npm/v/mydaterangepicker.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/mydaterangepicker)

## Description
Highly configurable Angular2 date range picker. Online demo is [here](http://kekeh.github.io/mydaterangepicker)

## Installation

To install this component to an external project, follow the procedure:

1. __npm install mydaterangepicker --save__
2. Add __MyDateRangePickerModule__ import to your __@NgModule__ like example below
    ```js
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { MyTestApp } from './my-test-app';
    import { MyDateRangePickerModule } from 'mydaterangepicker';

    @NgModule({
        imports:      [ BrowserModule, MyDateRangePickerModule ],
        declarations: [ MyTestApp ],
        bootstrap:    [ MyTestApp ]
    })
    export class MyTestAppModule {}
    ```

3. If you are using __systemjs__ package loader add the following mydaterangepicker properties to the __System.config__:
    ```js
    (function (global) {
        System.config({
            paths: {
                'npm:': 'node_modules/'
            },
            map: {
                // Other components are here...

                'mydaterangepicker': 'npm:mydaterangepicker/bundles/mydaterangepicker.umd.js'
            },
            packages: {
            }
        });
    })(this);
    ```

## Usage

Use one of the following three options.

### 1. Callbacks

In this option the mydaterangepicker sends data back to host application using callbacks. [Here](https://github.com/kekeh/mydaterangepicker/tree/master/sampleapp/sample-date-range-picker-normal)
is an example application. It shows how to use callbacks.

To use callbacks define the application class as follows:

```js
import {IMyOptions, IMyDateRangeModel} from 'mydaterangepicker';
// other imports here...

export class MyTestApp {

    private myDateRangePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };

    constructor() { }

    // dateRangeChanged callback function called when the user apply the date range. This is
    // mandatory callback in this option. There are also optional inputFieldChanged and
    // calendarViewChanged callbacks.
    onDateRangeChanged(event: IMyDateRangeModel) {
        // event properties are: event.beginDate, event.endDate, event.formatted,
        // event.beginEpoc and event.endEpoc
    }
}
```

Add the following snippet inside your template:

```html
<my-date-range-picker [options]="myDateRangePickerOptions"
                   (dateRangeChanged)="onDateRangeChanged($event)"></my-date-range-picker>
```

### 2. Reactive forms

In this option the value accessor of reactive forms is used. [Here](https://github.com/kekeh/mydaterangepicker/tree/master/sampleapp/sample-date-range-picker-access-modifier)
is an example application. It shows how to use the __formControlName__.

To use reactive forms define the application class as follows:

```ts
import {IMyOptions} from 'mydaterangepicker';
// other imports here...

export class MyTestApp implements OnInit {

    private myDateRangePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };

    private myForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.myForm = this.formBuilder.group({
            // Empty string means no initial value. Can be also specific date range for example:
            // {beginDate: {year: 2018, month: 10, day: 9}, endDate: {year: 2018, month: 10, day: 19}}
            // which sets this date range to initial value. It is also possible to set initial
            // value using the selDateRange attribute.

            myDateRange: ['', Validators.required]
            // other controls are here...
        });
    }

    setDateRange(): void {
        // Set date range (today) using the setValue function
        let date = new Date();
        this.myForm.setValue({myDateRange: {
            beginDate: {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate()
            },
            endDate: {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate()
            }
        }});
    }

    clearDateRange(): void {
        // Clear the date range using the setValue function
        this.myForm.setValue({myDateRange: ''});
    }
}
```

Add the following snippet inside your template:

```html
<form [formGroup]="myForm" novalidate>
    <my-date-range-picker name="mydaterange" [options]="myDateRangePickerOptions"
                    formControlName="myDateRange"></my-date-range-picker>
  <!-- other controls are here... -->
</form>
```

### 3. ngModel binding

In this option the ngModel binding is used. [Here](https://github.com/kekeh/mydaterangepicker/tree/master/sampleapp/sample-date-range-picker-access-modifier)
is an example application. It shows how to use the __ngModel__.

To use ngModel define the application class as follows:

```ts
import {IMyOptions} from 'mydaterangepicker';
// other imports here...

export class MyTestApp {

    private myDateRangePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };

    // For example initialize to specific date (09.10.2018 - 19.10.2018). It is also possible
    // to set initial date range value using the selDateRange attribute.
    private model: Object = {beginDate: {year: 2018, month: 10, day: 9},
                             endDate: {year: 2018, month: 10, day: 19}};

    constructor() { }
}
```

Add the following snippet inside your template:

```html
<form #myForm="ngForm" novalidate>
    <my-date-range-picker name="mydaterange" [options]="myDateRangePickerOptions"
                    [(ngModel)]="model" required></my-date-range-picker>
</form>
```

## Attributes

### options attribute

Value of the __options__ attribute is a type of [IMyOptions](https://github.com/kekeh/mydaterangepicker/blob/master/src/my-date-range-picker/interfaces/my-options.interface.ts). It can contain the following properties.

| Option        | Default       | Description  |
| ------------- | ------------- | ----- |
| __quickRangeSelect__   | true      | Is quick date range selection enabled or not. Begin adn end date can be selected without any button click. |
| __dayLabels__     | {su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat'} | Day labels visible on the selector. |
| __monthLabels__   | { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' } | Month labels visible on the selector. |
| __dateFormat__    | yyyy-mm-dd      | Date format on the selection area and the callback. For example: dd.mm.yyyy, yyyy-mm-dd, dd mmm yyyy (mmm = Month as a text) |
| __showClearBtn__   | true      | Show 'Clear' button on calendar. |
| __clearBtnTxt__   | Clear      | Clear button text. Can be used if __showClearBtn = true__. |
| __beginDateBtnTxt__   | Begin Date      | To begin date button text. Can be used if __quickRangeSelect = false__. |
| __endDateBtnTxt__   | End Date      | To end date button text. Can be used if __quickRangeSelect = false__. |
| __acceptBtnTxt__   | OK      | Accept date range button text. |
| __showSelectDateText__   | true      | Show select date text. |
| __selectBeginDateTxt__   | Select Begin Date      | Select begin date text. Can be used if __showSelectDateText = true__.|
| __selectEndDateTxt__   | Select End Date      | Select end date text. Can be used if __showSelectDateText = true__.  |
| __firstDayOfWeek__   | mo | First day of week on calendar. One of the following: mo, tu, we, th, fr, sa, su |
| __sunHighlight__   | true | Sunday red colored on calendar. |
| __markCurrentDay__   | true | Is current day (today) marked on calendar. |
| __editableMonthAndYear__   | true | Is month and year labels editable or not. |
| __minYear__   | 1000 | Minimum allowed year in calendar. Cannot be less than 1000. |
| __maxYear__   | 9999 | Maximum allowed year in calendar. Cannot be more than 9999. |
| __disableUntil__   | no default value | Disable dates backward starting from the given date. For example: {year: 2016, month: 6, day: 26} |
| __disableSince__   | no default value | Disable dates forward starting from the given date. For example: {year: 2016, month: 7, day: 22} |
| __disableHeaderButtons__   | true | Prevent to change the calendar view with header buttons if previous or next month are fully disabled by disableUntil or disableSince. |
| __inline__   | false | Show mydaterangepicker in inline mode. |
| __showClearDateRangeBtn__   | true | Is clear date range button shown or not. Can be used if __inline = false__. |
| __height__   | 34px | mydatepicker height without selector. Can be used if __inline = false__. |
| __width__   | 100% | mydatepicker width. Can be used if __inline = false__. |
| __selectionTxtFontSize__   | 18px | Selection area font size. Can be used if __inline = false__. |
| __alignSelectorRight__   | false | Align selector right. Can be used if __inline = false__. |
| __indicateInvalidDateRange__   | true | If user typed date range is not same format as __dateFormat__, show red background in the selection area. Can be used if __inline = false__. |
| __componentDisabled__   | false | Is selection area input field and buttons disabled or not (input disabled flag). Can be used if __inline = false__. |
| __editableDateRangeField__   | true | Is selection area input field editable or not (input readonly flag). Can be used if __inline = false__. |
| __inputValueRequired__   | false | Is selection area input field value required or not (input required flag). Can be used if __inline = false__. |
| __showSelectorArrow__   | true | Is selector (calendar) arrow shown or not. Can be used if __inline = false__. |

* Example of the options data (not all properties listed):
```js
    myDateRangePickerOptions: IMyOptions = {
        clearBtnTxt: 'Clear',
        beginDateBtnTxt: 'Begin Date',
        endDateBtnTxt: 'End Date',
        acceptBtnTxt: 'OK',
        dateFormat: 'dd.mm.yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '260px',
        inline: false,
        selectionTxtFontSize: '15px',
        alignSelectorRight: false,
        indicateInvalidDateRange: true
    };
```

### selDateRange attribute

Provide the initially chosen date range that will display both in the text input field
and provide the default for the popped-up selector.

Type of the __selDateRange__ attribute can be a string or an [IMyDateRange](https://github.com/kekeh/mydaterangepicker/blob/master/src/my-date-range-picker/interfaces/my-date-range.interface.ts) object.
  * the string must be in the following format __dateFormat - dateFormat__ option is. For example '2018-10-09 - 2018-10-19'
  * the object must be in the IMyDateRange format. For example: {beginDate: {year: 2018, month: 10, day: 9}, endDate: {year: 2018, month: 10, day: 19}}

### defaultMonth attribute

If __selDateRange__ is not specified, when the daterangepicker is opened, it will
ordinarily default to selecting the current date. If you would prefer
a different year and month to be the default for a freshly chosen date
picking operation, specify a __[defaultMonth]__ attribute.

Value of the __[defaultMonth]__ attribute is a string which contain year number and
month number separated by delimiter. The delimiter can be any special character.
For example the value of the __[defaultMonth]__ attribute can be: __2016.08__,
__08-2016__, __08/2016__.

### placeholder attribute

Placeholder text in the input field.

## Callbacks

### dateRangeChanged callback
  * called when the date range is selected, removed or input field typing is valid
  * event parameter:
    * event.beginDate: Date object in the following format: { day: 22, month: 11, year: 2016 }
    * event.beginJsDate: Javascript Date object of begin date
    * event.endDate: Date object in the following format: { day: 23, month: 11, year: 2016 }
    * event.endJsDate: Javascript Date object of end date
    * event.formatted: Date range string: '2016-11-22 - 2016-11-23'
    * event.beginEpoc: Epoc time stamp number: 1479765600
    * event.endEpoc: Epoc time stamp number: 1479852000
  * event parameter type is [IMyDateRangeModel](https://github.com/kekeh/mydaterangepicker/blob/master/src/my-date-range-picker/interfaces/my-date-range-model.interface.ts)

  * Example of the dateChanged callback:
  ```js
      onDateRangeChanged(event: IMyDateRangeModel) {
          console.log('onDateRangeChanged(): Begin date: ', event.beginDate, ' End date: ', event.endDate);
          console.log('onDateRangeChanged(): Formatted: ', event.formatted);
          console.log('onDateRangeChanged(): BeginEpoc timestamp: ', event.beginEpoc, ' - endEpoc timestamp: ', event.endEpoc);
      }
  ```

### inputFieldChanged callback
  * called when the value change in the input field, date range is selected or date range is cleared (can be used in validation, returns true or false indicating is date range valid or not in the input field)
  * event parameter:
    * event.value: Value of the input field. For example: '2016-11-22 - 2016-11-23'
    * event.dateRangeFormat: Date range format string. For example: 'yyyy-mm-dd - yyyy-mm-dd'
    * event.valid: Boolean value indicating is the typed value valid. For example: true
  * event parameter type is [IMyInputFieldChanged](https://github.com/kekeh/mydaterangepicker/blob/master/src/my-date-range-picker/interfaces/my-input-field-changed.interface.ts)

  * Example of the input field changed callback:
  ```js
  onInputFieldChanged(event: IMyCalendarViewChanged) {
    console.log('onInputFieldChanged(): Value: ', event.value, ' - dateRangeFormat: ', event.dateRangeFormat, ' - valid: ', event.valid);
  }
  ```

### calendarViewChanged callback
  * called when the calendar view change (year or month change)
  * event parameter:
    * event.year: Year number in calendar. For example: 2016
    * event.month: Month number in calendar. For example: 11
    * event.first: First day of selected month and year. Object which contain day number and weekday string. For example: {number: 1, weekday: "tu"}
    * event.last: Last day of selected month and year. Object which contain day number and weekday string. For example: {number: 30, weekday: "we"}
  * event parameter type is [IMyCalendarViewChanged](https://github.com/kekeh/mydaterangepicker/blob/master/src/my-date-range-picker/interfaces/my-calendar-view-changed.interface.ts)
  * values of the weekday property are same as values of the __firstDayOfWeek__ option

  * Example of the calendar view changed callback:
  ```js
  onCalendarViewChanged(event: IMyCalendarViewChanged) {
    console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
  }
  ```

### dateSelected callback
  * called when the date (begin or end) is selected
  * event parameter:
    * event.type: Type of selected date (begin or end). 1 = begin date, 2 = end date
    * event.date: Date object in the following format: { day: 23, month: 11, year: 2016 }
    * event.formatted: Formatted date based on dateFormat option
    * event.jsdate: Javascript Date object of the selected date
  * event parameter type is [IMyDateSelected](https://github.com/kekeh/mydaterangepicker/blob/master/src/my-date-range-picker/interfaces/my-date-selected.interface.ts)

  * Example of the date selected callback:
  ```js
    onDateSelected(event: IMyDateSelected) {
        console.log('onDateSelected(): Value: ', event);
    }
  ```

## Change styles of the component

The styles of the component can be changed by overriding the existing styles.

Create a separate stylesheet file which contain the changed styles. Then import the stylesheet file in the place which
is after the place where the component is loaded.

The [sampleapp](https://github.com/kekeh/mydaterangepicker/tree/master/sampleapp) of the component contain an example:

* [override.css](https://github.com/kekeh/mydaterangepicker/blob/master/sampleapp/override.css) contain the changed styles.
* [index.html](https://github.com/kekeh/mydaterangepicker/blob/master/sampleapp/index.html) contain import of the override.css file.

## Development of this component

* At first fork and clone this repo.

* Install all dependencies:
  1. __npm install__
  2. __npm install --global gulp-cli__

* Build the __npmdist__ folder and execute __tslint__:
  1. __gulp all__

* Execute unit tests and coverage (output is generated to the __test-output__ folder):
  1. __npm test__

* Run sample application:
  1. Open a terminal and type __npm start__
  2. Open __http://localhost:5000__ to browser

* Build a local npm installation package:
  1. __gulp all__
  2. __cd npmdist__
  3. __npm pack__
    * local installation package is created to the __npmdist__ folder. For example: __mydaterangepicker-1.0.10.tgz__

* Install the local npm package to your project:
  1. __npm install path_to_npmdist/mydaterangepicker-1.0.10.tgz__

## Demo
Online demo is [here](http://kekeh.github.io/mydaterangepicker)

## Compatibility (tested with)
* Firefox (latest)
* Chrome (latest)
* Chromium (latest)
* Edge
* IE11
* Safari

## License
* License: MIT

## Author
* Author: kekeh
