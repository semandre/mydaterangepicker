# mydaterangepicker

**Angular 2 date range picker - Angular2 reusable UI component**

[![Build Status](https://travis-ci.org/kekeh/mydaterangepicker.svg?branch=master)](https://travis-ci.org/kekeh/mydaterangepicker)
[![codecov](https://codecov.io/gh/kekeh/mydaterangepicker/branch/master/graph/badge.svg)](https://codecov.io/gh/kekeh/mydaterangepicker)
[![npm](https://img.shields.io/npm/v/mydaterangepicker.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/mydaterangepicker)

## Description
Simple Angular2 date range picker. Online demo is [here](http://kekeh.github.io/mydaterangepicker)

## Installation

To install this component to an external project, follow the procedure:

1. __npm install mydaterangepicker --save__
2. Add __MyDateRangePickerModule__ import to your __@NgModule__ like example below
    ```js
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { MyTestApp } from './my-test-app';

    // If you are using webpack package loader import the MyDateRangePickerModule from here:
    import { MyDateRangePickerModule } from 'mydaterangepicker';

    // If you are using systemjs package loader import the MyDateRangePickerModule from here:
    import { MyDateRangePickerModule } from 'mydatepicker/dist/my-date-range-picker.module';

    @NgModule({
        imports:      [ BrowserModule, MyDateRangePickerModule ],
        declarations: [ MyTestApp ],
        bootstrap:    [ MyTestApp ]
    })
    export class MyTestAppModule {}
    ```
3. Use the following snippet inside your template:

   ```html
   <my-date-range-picker [options]="myDateRangePickerOptions"
                   (dateRangeChanged)="onDateRangeChanged($event)"></my-date-range-picker>
   ```

    * Mandatory attributes:
      * [options]="myDateRangePickerOptions"
      * (dateRangeChanged)="onDateRangeChanged($event)"

    * Optional attributes:
      * [selDateRange]="selectedDateRange"

    * Example of the options data (not all properties listed):
    ```js
        myDateRangePickerOptions = {
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
            indicateInvalidDateRange: true,
            showDateRangeFormatPlaceholder: false
        };
    ```

    * Example of the date range changed callback:
    ```js
        onDateRangeChanged(event:any) {
            console.log('onDateRangeChanged(): Begin: ', event.beginDate, ' End: ', event.endDate);
            console.log('onDateRangeChanged(): Formatted: ', event.formatted);
            console.log('onDateRangeChanged(): BeginEpoc timestamp: ', event.beginEpoc, ' - endEpoc timestamp: ', event.endEpoc);
        }
    ```

4. If you are using __systemjs__ package loader add the following mydaterangepicker properties to the __System.config__:
    ```js
    (function (global) {
        System.config({
            paths: {
                'npm:': 'node_modules/'
            },
            map: {
                // Other components are here...

                'mydaterangepicker': 'npm:mydaterangepicker',
            },
            packages: {
                // Other components are here...

                mydaterangepicker: {
                    defaultExtension: 'js'
                }
            }
        });
    })(this);
    ```

## Usage

### options attribute

| Option        | Default       | Description  |
| ------------- | ------------- | ----- |
| __dayLabels__     | {su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat'} | Day labels visible on the selector. |
| __monthLabels__   | { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' } | Month labels visible on the selector. |
| __dateFormat__    | yyyy-mm-dd      | Date format on the selection area and the callback. For example: dd.mm.yyyy, yyyy-mm-dd, dd mmm yyyy (mmm = Month as a text) |
| __clearBtnTxt__   | Clear      | Clear selected range button text. |
| __beginDateBtnTxt__   | Begin Date      | To begin date button text. |
| __endDateBtnTxt__   | End Date      | To end date button text. |
| __acceptBtnTxt__   | OK      | Accept date range button text. |
| __selectBeginDateTxt__   | Select Begin Date      | Select begin date text. |
| __selectEndDateTxt__   | Select End Date      | Select end date text. |
| __firstDayOfWeek__   | mo | First day of week on calendar. One of the following: mo, tu, we, th, fr, sa, su |
| __sunHighlight__   | true | Sunday red colored on calendar. |
| __editableMonthAndYear__   | true | Is month and year labels editable or not. |
| __minYear__   | 1000 | Minimum allowed year in calendar. Cannot be less than 1000. |
| __maxYear__   | 9999 | Maximum allowed year in calendar. Cannot be more than 9999. |
| __inline__   | false | Show mydaterangepicker in inline mode. |
| __height__   | 34px | mydatepicker height without selector. Can be used if __inline = false__. |
| __width__   | 100% | mydatepicker width. Can be used if __inline = false__. |
| __selectionTxtFontSize__   | 18px | Selection area font size. Can be used if __inline = false__. |
| __alignSelectorRight__   | false | Align selector right. Can be used if __inline = false__. |
| __indicateInvalidDateRange__   | true | If user typed date range is not same format as __dateFormat__, show red background in the selection area. Can be used if __inline = false__. |
| __showDateRangeFormatPlaceholder__   | false | Show value of __dateFormat__ - __dateFormat__ as placeholder in the selection area if it is empty. Can be used if __inline = false__. |

### selDateRange attribute

Provide the initially chosen date range that will display both in the text input field
and provide the default for the popped-up selector.

### defaultMonth attribute

If __selDateRange__ is not specified, when the daterangepicker is opened, it will
ordinarily default to selecting the current date. If you would prefer
a different year and month to be the default for a freshly chosen date
picking operation, specify a __[defaultMonth]__ attribute.

Value of the __[defaultMonth]__ attribute is a string which contain year number and
month number separated by delimiter. The delimiter can be any special character.
For example the value of the __[defaultMonth]__ attribute can be: __2016.08__,
__08-2016__, __08/2016__.

## Development of this component

At first fork and clone this repo.

Install all dependencies:
 1. __npm install__
 2. __npm install --global gulp-cli__

Build dist folder (javascript version of the component):
 1. __gulp all__

Execute unit tests and coverage (output is generated to the __test-output__ folder):
 1. __npm test__

Run sample application:
 1. Open a terminal and type __npm start__
 2. Open __http://localhost:5000__ to browser

## Demo
Online demo is [here](http://kekeh.github.io/mydaterangepicker)

## Compatibility (tested with)
* Firefox (latest)
* Chromium (latest)
* Edge
* IE11

## License
* License: MIT

## Author
* Author: kekeh
