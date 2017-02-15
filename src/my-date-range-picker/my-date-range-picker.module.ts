import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MyDateRangePicker } from "./my-date-range-picker.component";
import { FocusDirective } from "./directives/my-date-range-picker.focus.directive";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ MyDateRangePicker, FocusDirective ],
    exports: [ MyDateRangePicker, FocusDirective ]
})
export class MyDateRangePickerModule { }
