# mydaterangepicker v. 0.0.1

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

1. Make sure you're using Webpack.
2. `npm install mydaterangepicker`.
3. `import {MyDateRangePicker} from 'MyDateRangePicker/src/index';`
4. Use the following snippet inside your template:

   ```html
   <my-date-range-picker [options]="myDateRangePickerOptions"
                   (dateRangeChanged)="onDateRangeChanged($event)"
                   [selDateRange]="selectedDateRange"></my-date-range-picker>
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

#### endDaterBtnTxt
  `'End Date'`

#### acceptBtnTxt
  `'OK'`

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
