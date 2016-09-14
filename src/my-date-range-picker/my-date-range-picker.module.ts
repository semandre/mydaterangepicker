import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MyDateRangePicker} from './my-date-range-picker.component';
import {HoverItemDirective} from './my-date-range-picker.hover.directive';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ MyDateRangePicker, HoverItemDirective ],
    exports: [ MyDateRangePicker, HoverItemDirective ]
})
export class MyDateRangePickerModule { }
