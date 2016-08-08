
import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';

import {MyDateRangePickerApp} from './app/sample-date-range-picker-app';


if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(MyDateRangePickerApp, []).catch(err => console.error(err));
