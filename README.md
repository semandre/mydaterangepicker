# mydaterangepicker

**Angular date range picker**

[![Build Status](https://travis-ci.org/kekeh/mydaterangepicker.svg?branch=master)](https://travis-ci.org/kekeh/mydaterangepicker)
[![codecov](https://codecov.io/gh/kekeh/mydaterangepicker/branch/master/graph/badge.svg)](https://codecov.io/gh/kekeh/mydaterangepicker)
[![npm](https://img.shields.io/npm/v/mydaterangepicker.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/mydaterangepicker)

## Description
Highly configurable Angular date range picker. Compatible with __Angular2__ and __Angular4__ versions.

Online demo is [here](http://kekeh.github.io/mydaterangepicker)

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

### 1. ngModel binding

In this option the ngModel binding is used. [Here](https://github.com/kekeh/mydaterangepicker/tree/master/sampleapp/sample-date-range-picker-access-modifier)
is an example application. It shows how to use the __ngModel__.

To use ngModel define the application class as follows:

```ts
import {IMyDrpOptions} from 'mydaterangepicker';
// other imports here...

export class MyTestApp {

    private myDateRangePickerOptions: IMyDrpOptions = {
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

### 2. Reactive forms

In this option the value accessor of reactive forms is used. [Here](https://github.com/kekeh/mydaterangepicker/tree/master/sampleapp/sample-date-range-picker-access-modifier)
is an example application. It shows how to use the __formControlName__.

To use reactive forms define the application class as follows:

```ts
import {IMyDrpOptions} from 'mydaterangepicker';
// other imports here...

export class MyTestApp implements OnInit {

    private myDateRangePickerOptions: IMyDrpOptions = {
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

### 3. Callbacks

In this option the mydaterangepicker sends data back to host application using callbacks. [Here](https://github.com/kekeh/mydaterangepicker/tree/master/sampleapp/sample-date-range-picker-normal)
is an example application. It shows how to use callbacks.

To use callbacks define the application class as follows:

```js
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';
// other imports here...

export class MyTestApp {

    private myDateRangePickerOptions: IMyDrpOptions = {
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

## Attributes

### options attribute

Value of the __options__ attribute is a type of [IMyDrpOptions](https://github.com/kekeh/mydaterangepicker/blob/master/src/my-date-range-picker/interfaces/my-options.interface.ts). It can contain the following properties.

| Option        | Default       | Type  | Description  |
| ------------- | ------------- | ----- | ------------ |
| __dayLabels__     | {su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat'} | [IMyDayLabels](https://github.com/kekeh/mydaterangepicker/blob/master/src/my-date-range-picker/interfaces/my-day-labels.interface.ts) | Day labels visible on the selector. |
| __monthLabels__   | { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' } | [IMyMonthLabels](https://github.com/kekeh/mydaterangepicker/blob/master/src/my-date-range-picker/interfaces/my-month-labels.interface.ts) | Month labels visible on the selector. |
| __dateFormat__    | yyyy-mm-dd      | string | Date format on the selection area and the callback. For example: dd.mm.yyyy, yyyy-mm-dd, dd mmm yyyy (mmm = Month as a text) |
| __showClearBtn__   | true      | boolean | Show the 'Clear' button on calendar. |
| __showApplyBtn__   | true      | boolean | Show the 'Apply' button on calendar. |
| __showSelectDateText__   | true | boolean | Show the select date text. |
| __selectBeginDateTxt__   | Select Begin Date | string | Select begin date text. Can be used if __showSelectDateText = true__.|
| __selectEndDateTxt__   | Select End Date | string | Select end date text. Can be used if __showSelectDateText = true__.  |
| __firstDayOfWeek__   | mo | string | First day of week on calendar. One of the following: mo, tu, we, th, fr, sa, su |
| __sunHighlight__   | true | boolean | Sunday red colored on calendar. |
| __markCurrentDay__   | true | boolean | Is current day (today) marked on calendar. |
| __markCurrentMonth__   | true | boolean | Is current month marked on calendar. Can be used if __monthSelector = true__. |
| __markCurrentYear__   | true | boolean | Is current year marked on calendar. Can be used if __yearSelector = true__. |
| __monthSelector__  | true | boolean | If month label is selected opens a selector of months. |
| __yearSelector__  | true | boolean | If year label is selected opens a selector of years. |
| __minYear__   | 1100 | number | Minimum allowed year in calendar. Cannot be less than 1100. |
| __maxYear__   | 9100 | number | Maximum allowed year in calendar. Cannot be more than 9100. |
| __disableUntil__   | no default value | [IMyDate](https://github.com/kekeh/mydaterangepicker/blob/master/src/my-date-range-picker/interfaces/my-date.interface.ts) | Disable dates backward starting from the given date. For example: {year: 2016, month: 6, day: 26}. To reset existing disableUntil value set: {year: 0, month: 0, day: 0} |
| __disableSince__   | no default value | [IMyDate](https://github.com/kekeh/mydaterangepicker/blob/master/src/my-date-range-picker/interfaces/my-date.interface.ts) | Disable dates forward starting from the given date. For example: {year: 2016, month: 7, day: 22}. To reset existing disableSince value set: {year: 0, month: 0, day: 0} |
| __disableDates__   | no default value  | Array<[IMyDate](https://github.com/kekeh/mydaterangepicker/blob/master/src/my-date-range-picker/interfaces/my-date.interface.ts)> | Disable single dates one by one. The disabled date cannot be selected but it can be in a range. For example: [{year: 2016, month: 11, day: 14}, {year: 2016, month: 1, day: 15}]. To reset existing disableDates value set empty array to it. |
| __enableDates__   | no default value  | Array<[IMyDate](https://github.com/kekeh/mydaterangepicker/blob/master/src/my-date-range-picker/interfaces/my-date.interface.ts)> | Enable given dates one by one if the date is disabled. For example if you disable the date range and want to enable some dates in range. Array of enabled days. For example: [{year: 2016, month: 11, day: 14}, {year: 2016, month: 1, day: 15}]. To reset existing enableDates value set empty array to it. |
| __disableDateRanges__  | no default value  | Array<[IMyDateRange](https://github.com/kekeh/mydaterangepicker/blob/master/src/my-date-range-picker/interfaces/my-date-range.interface.ts)> | Disable date ranges one by one. The disabled date cannot be selected but it can be in a range. For example: [{beginDate: {year: 2016, month: 11, day: 14}, endDate: {year: 2016, month: 11, day: 20}}]. To reset existing disableDateRanges value set empty array to it. |
| __disableHeaderButtons__   | true | boolean | Prevent to change the calendar view with header buttons if previous or next month are fully disabled by disableUntil or disableSince. |
| __showWeekNumbers__   | false | boolean | Are week numbers visible or not on calendar. Can be used if __firstDayOfWeek = mo__. |
| __selectorHeight__   | 232px | string | Selector height. |
| __selectorWidth__   | 252px | string | Selector width. |
| __inline__   | false | boolean | Show mydaterangepicker in inline mode. |
| __showClearDateRangeBtn__   | true | boolean | Is clear date range button shown or not. Can be used if __inline = false__. |
| __height__   | 34px | string | mydatepicker height without selector. Can be used if __inline = false__. |
| __width__   | 100% | string | mydatepicker width. Can be used if __inline = false__. |
| __selectionTxtFontSize__   | 14px | string | Selection area font size. Can be used if __inline = false__. |
| __alignSelectorRight__   | false | boolean | Align selector right. Can be used if __inline = false__. |
| __indicateInvalidDateRange__   | true | boolean | If user typed date range is not same format as __dateFormat__, show red background in the selection area. Can be used if __inline = false__. |
| __componentDisabled__   | false | boolean | Is selection area input field and buttons disabled or not (input disabled flag). Can be used if __inline = false__. |
| __editableDateRangeField__   | true | boolean | Is selection area input field editable or not (input readonly flag). Can be used if __inline = false__. |
| __showSelectorArrow__   | true | boolean | Is selector (calendar) arrow shown or not. Can be used if __inline = false__. |
| __openSelectorOnInputClick__   | false | boolean | Open selector when the input field is clicked. Can be used if __inline = false and editableDateRangeField = false__. |
| __ariaLabelInputField__   | Date range input field | string | Aria label text of input field. |
| __ariaLabelClearDateRange__   | Clear date range | string | Aria label text of clear date range button. |
| __ariaLabelOpenCalendar__   | Open Calendar | string | Aria label text of open calendar button. |
| __ariaLabelPrevMonth__   | Previous Month | string | Aria label text of previous month button. |
| __ariaLabelNextMonth__   | Next Month | string | Aria label text of next month button. |
| __ariaLabelPrevYear__   | Previous Year | string | Aria label text of previous year button. |
| __ariaLabelNextYear__   | Next Year | string | Aria label text of next year button. |

* Example of the options data (not all properties listed):
```js
    myDateRangePickerOptions: IMyDrpOptions = {
        dateFormat: 'dd.mm.yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '260px',
        inline: false,
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

If __selDateRange__ is not specified, when the calendar is opened, it will
ordinarily default to selecting the current date. If you would prefer
a different year and month to be the default for a freshly chosen date
picking operation, specify a __defaultMonth__ attribute.

Value of the defaultMonth attribute can be:
  * [IMyDefaultMonth](https://github.com/kekeh/mydaterangepicker/blob/master/src/my-date-range-picker/interfaces/my-default-month.interface.ts) object. The value of __defMonth__ property can be a string which contain year number and month number separated by delimiter. The delimiter can be any special character. For example: __08-2016__ or __08/2016__.
  * a string which contain year number and month number separated by delimiter. The delimiter can be any special character. For example: __08-2016__ or __08/2016__.

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

### inputFocusBlur callback
  * called when the input box get or lost focus
  * event parameter:
    * event.reason: Reason of the event:
      * 1 = focus to input box
      * 2 = focus out of input box
    * event.value: Value of input box
    * event parameter type is [IMyInputFocusBlur](https://github.com/kekeh/mydaterangepicker/blob/master/src/my-date-range-picker/interfaces/my-input-focus-blur.interface.ts)

  * Example of the input focus blur callback:
  ```js
  onInputFocusBlur(event: IMyInputFocusBlur): void {
      console.log('onInputFocusBlur(): Reason: ', event. reason, ' - Value: ', event.value);
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

## Keywords
* Date range picker
* Angular2
* Angular4
