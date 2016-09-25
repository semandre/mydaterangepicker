System.register(['@angular/common', '@angular/core', './my-date-range-picker.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var common_1, core_1, my_date_range_picker_component_1;
    var MyDateRangePickerModule;
    return {
        setters:[
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (my_date_range_picker_component_1_1) {
                my_date_range_picker_component_1 = my_date_range_picker_component_1_1;
            }],
        execute: function() {
            MyDateRangePickerModule = (function () {
                function MyDateRangePickerModule() {
                }
                MyDateRangePickerModule = __decorate([
                    core_1.NgModule({
                        imports: [common_1.CommonModule],
                        declarations: [my_date_range_picker_component_1.MyDateRangePicker],
                        exports: [my_date_range_picker_component_1.MyDateRangePicker]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MyDateRangePickerModule);
                return MyDateRangePickerModule;
            }());
            exports_1("MyDateRangePickerModule", MyDateRangePickerModule);
        }
    }
});
//# sourceMappingURL=my-date-range-picker.module.js.map