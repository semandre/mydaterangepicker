import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MyDateRangePicker} from './my-date-range-picker.component';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ MyDateRangePicker ],
    exports: [ MyDateRangePicker ]
})
export class MyDateRangePickerModule { }
