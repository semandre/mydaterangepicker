import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SampleDateRangePickerModule } from './app/sample-date-range-picker-module';

enableProdMode();

platformBrowserDynamic().bootstrapModule(SampleDateRangePickerModule);
