# mydaterangepicker v. 0.0.9

**Angular 2 date range picker - Angular2 reusable UI component**

## Description
Simple Angular2 date range picker. Online demo is [here](http://kekeh.github.io/mydaterangepicker)

## Getting Started
1. Fork and clone this repo
2. npm install
3. Open a terminal and type "npm start"
4. Open "http://localhost:5000" to browser

## Installation

To install this component to an external project, follow the procedure:

1. Make sure you're using Webpack. You can check needed dependencies from the package.json file of this module.
2. `npm install mydaterangepicker`.
3. Add *MyDateRangePickerModule* import to your @NgModule like example below
    ```js
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { MyTestApp } from './my-test-app';
    import { MyDateRangePickerModule } from 'mydaterangepicker/src/my-date-range-picker/my-date-range-picker.module';

    @NgModule({
        imports:      [ BrowserModule, MyDateRangePickerModule ],
        declarations: [ MyTestApp ],
        bootstrap:    [ MyTestApp ]
    })
    export class MyTestAppModule {}
    ```
4. Use the following snippet inside your template:

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
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            inline: false
        };
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

## Usage

All input properties are optional.

### options
Bind to an object containing replacements for any of the following defaults:

#### dayLabels
  `{su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat'}`
  
#### monthLabels
  `{ 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' }`
    
#### dateFormat
  `'yyyy-mm-dd'`
  
#### clearBtnTxt
  `'Clear'`

#### beginDateBtnTxt
  `'Begin Date'`

#### endDateBtnTxt
  `'End Date'`

#### acceptBtnTxt
  `'OK'`

#### selectBeginDateBtnTxt
  `'Select Begin Date'`

#### selectEndDateBtnTxt
  `'Select End Date'`

#### firstDayOfWeek
  `'mo'`
  
#### sunHighlight
  `true`

#### inline
  `false`
  
#### height
  `'34px'`
  
#### width
  `'100%'`

#### selectionTxtFontSize
`'16px'`

#### alignSelectorRight
 `'false'`

### selDateRange
Provide the initially chosen date range that will display both in the text input field and the selector.

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
