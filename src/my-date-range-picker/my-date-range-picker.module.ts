import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MyDateRangePicker } from "./my-date-range-picker.component";
import { InputFocusDirective } from "./directives/my-date-range-picker.input.directive";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ MyDateRangePicker, InputFocusDirective ],
    exports: [ MyDateRangePicker, InputFocusDirective ]
})
export class MyDateRangePickerModule { }
