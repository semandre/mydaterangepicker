(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".pagecontent {\n  margin: 10px 300px;\n}\n\n.maintitle {\n  background-color: #EEE;\n  height: 180px;\n  border-bottom: 1px solid #CCC;\n  background: linear-gradient(to right, rgba(44, 83, 158, 1) 0%, rgba(44, 83, 158, 1) 100%);\n  text-align: center;\n}\n\n.maintitle div:first-child {\n  display: inline-block;\n  color: #FFF;\n  font-size: 46px;\n  font-weight: bold;\n  margin-top: 48px;\n}\n\n.maintitle div:last-child {\n  color: #FFF;\n  font-size: 18px;\n}\n\n.normalmode {\n  margin-bottom: 340px;\n}\n\n.inlinemode {\n  margin-bottom: 340px;\n}\n\n.tabcontainer {\n  display: table;\n  width: 100%;\n  border-spacing: 2px;\n}\n\n.tab {\n  display: table-cell;\n  border-radius: 4px;\n  width: 33.33333%;\n  padding: 8px 0;\n  text-align: center;\n}\n\n.activetab {\n  background-color: #2C539E;\n  color: #FFF;\n}\n\n.inactivetab {\n  color: #2C539E;\n}\n\n.inactivetab:hover {\n  background-color: #EEE;\n  cursor: pointer;\n  text-decoration: underline;\n}\n\n.pagetext {\n  margin: 20px 0;\n}\n\nhr {\n  margin: 6px 0;\n  border: none;\n  height: 1px;\n  background-image: linear-gradient(to right, #DDD, #555, #DDD);\n}\n\n@media screen and (max-width: 1200px) {\n  .pagecontent {\n    margin: 10px 40px;\n  }\n}\n"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"maintitle\">\n  <div>mydaterangepicker</div>\n  <div>Angular 2 date range picker</div>\n</div>\n<div class=\"pagecontent\">\n  <div class=\"tabcontainer\">\n    <div class=\"tab activetab\">mydaterangepicker</div>\n    <div class=\"tab inactivetab\" (click)=\"toMyDatePicker()\">mydatepicker</div>\n    <div class=\"tab inactivetab\" (click)=\"toNgxMyDatePicker()\">ngx-mydatepicker</div>\n  </div>\n\n  <div>\n    <hr/>\n    <h4><a id=\"normalmode\"></a>Normal mode</h4>\n    <div class=\"normalmode\">\n      <sample-date-range-picker-normal>loading...</sample-date-range-picker-normal>\n    </div>\n\n    <hr/>\n    <h4><a id=\"inlinemode\"></a>Inline mode</h4>\n    <div class=\"inlinemode\">\n      <sample-date-range-picker-inline>loading...</sample-date-range-picker-inline>\n    </div>\n\n  </div>\n\n</div>\n\n\n\n\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: MyDateRangePickerApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyDateRangePickerApp", function() { return MyDateRangePickerApp; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MyDateRangePickerApp = /** @class */ (function () {
    function MyDateRangePickerApp() {
        console.log('constructor: MyDateRangePickerApp');
    }
    MyDateRangePickerApp.prototype.toMyDatePicker = function () {
        window.open('http://kekeh.github.io/mydatepicker', '_self');
    };
    MyDateRangePickerApp.prototype.toNgxMyDatePicker = function () {
        window.open('http://kekeh.github.io/ngx-mydatepicker', '_self');
    };
    MyDateRangePickerApp = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mydaterangepicker-app',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")],
            moduleId: module.i,
        }),
        __metadata("design:paramtypes", [])
    ], MyDateRangePickerApp);
    return MyDateRangePickerApp;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _sample_date_range_picker_normal_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sample-date-range-picker-normal/index */ "./src/app/sample-date-range-picker-normal/index.ts");
/* harmony import */ var _sample_date_range_picker_inline_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sample-date-range-picker-inline/index */ "./src/app/sample-date-range-picker-inline/index.ts");
/* harmony import */ var mydaterangepicker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! mydaterangepicker */ "./node_modules/mydaterangepicker/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["MyDateRangePickerApp"], _sample_date_range_picker_normal_index__WEBPACK_IMPORTED_MODULE_5__["SampleDateRangePickerNormal"], _sample_date_range_picker_inline_index__WEBPACK_IMPORTED_MODULE_6__["SampleDateRangePickerInline"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                mydaterangepicker__WEBPACK_IMPORTED_MODULE_7__["MyDateRangePickerModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["MyDateRangePickerApp"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/sample-date-range-picker-inline/index.ts":
/*!**********************************************************!*\
  !*** ./src/app/sample-date-range-picker-inline/index.ts ***!
  \**********************************************************/
/*! exports provided: SampleDateRangePickerInline */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sample_date_range_picker_inline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sample-date-range-picker-inline */ "./src/app/sample-date-range-picker-inline/sample-date-range-picker-inline.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SampleDateRangePickerInline", function() { return _sample_date_range_picker_inline__WEBPACK_IMPORTED_MODULE_0__["SampleDateRangePickerInline"]; });




/***/ }),

/***/ "./src/app/sample-date-range-picker-inline/sample-date-range-picker-inline.html":
/*!**************************************************************************************!*\
  !*** ./src/app/sample-date-range-picker-inline/sample-date-range-picker-inline.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n    <ul>\n        <li>\n            <span style=\"margin-right: 10px\">Date format:</span>\n            <span>\n                <select style=\"padding: 2px;cursor: pointer;font-size: 11px;min-width: 60px;\" (change)=\"onChangeDateFormat($event.target.value)\">\n                    <option *ngFor=\"let f of dateFormats\">{{f}}</option>\n                </select>\n            </span>\n        </li>\n        <li>\n            <label>\n                <span>Show select date text:</span>\n                <input style=\"cursor: pointer\" type=\"checkbox\" (change)=\"onShowSelectDateText($event.currentTarget.checked)\" [checked]=\"false\">\n            </label>\n        </li>\n        <li>\n            <label>\n                <span>Disable past dates starting from the previous month:</span>\n                <input style=\"cursor: pointer\" type=\"checkbox\" (change)=\"onDisablePast($event.currentTarget.checked)\" [checked]=\"false\">\n            </label>\n        </li>\n        <li>\n            <label>\n                <span>Disable future dates starting from the next month:</span>\n                <input style=\"cursor: pointer\" type=\"checkbox\" (change)=\"onDisableFuture($event.currentTarget.checked)\" [checked]=\"false\">\n            </label>\n        </li>\n    </ul>\n\n    <table style=\"width: 100%\">\n        <tr>\n            <td style=\"vertical-align: top\">\n                <my-date-range-picker [options]=\"myDateRangePickerOptionsInline\" (dateRangeChanged)=\"onDateRangeChanged($event)\"\n                                      [selDateRange]=\"selectedDateRangeInline\"></my-date-range-picker>\n            </td>\n            <td style=\"vertical-align: top\">\n                <div style=\"padding:4px;border-radius:4px;float:right\" [ngStyle]=\"{border: border}\">\n                    {{selectedTextInline}}\n                </div>\n            </td>\n        </tr>\n    </table>\n</div>"

/***/ }),

/***/ "./src/app/sample-date-range-picker-inline/sample-date-range-picker-inline.ts":
/*!************************************************************************************!*\
  !*** ./src/app/sample-date-range-picker-inline/sample-date-range-picker-inline.ts ***!
  \************************************************************************************/
/*! exports provided: SampleDateRangePickerInline */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SampleDateRangePickerInline", function() { return SampleDateRangePickerInline; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SampleDateRangePickerInline = /** @class */ (function () {
    function SampleDateRangePickerInline() {
        this.myDateRangePickerOptionsInline = {
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            inline: true,
            showSelectDateText: false
        };
        this.selectedDateRangeInline = '';
        this.selectedTextInline = '';
        this.border = 'none';
        this.dateFormats = new Array('yyyy-mm-dd', 'dd.mm.yyyy', 'dd/mm/yyyy', 'dd mmm yyyy');
        console.log('constructor(): SampleDateRangePickerInline');
    }
    SampleDateRangePickerInline.prototype.onChangeDateFormat = function (format) {
        var copy = this.getCopyOfOptions();
        copy.dateFormat = format;
        this.myDateRangePickerOptionsInline = copy;
    };
    SampleDateRangePickerInline.prototype.onShowSelectDateText = function (checked) {
        var copy = this.getCopyOfOptions();
        copy.showSelectDateText = checked;
        this.myDateRangePickerOptionsInline = copy;
    };
    SampleDateRangePickerInline.prototype.onDisablePast = function (checked) {
        var date = new Date();
        // Disable/enable dates from 5th backward
        date.setMonth(date.getMonth() - 1);
        var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        var copy = this.getCopyOfOptions();
        copy.disableUntil = checked ? { year: date.getFullYear(), month: date.getMonth() + 1, day: lastDayOfMonth } : { year: 0, month: 0, day: 0 };
        this.myDateRangePickerOptionsInline = copy;
    };
    SampleDateRangePickerInline.prototype.onDisableFuture = function (checked) {
        var date = new Date();
        // Disable/enable dates from 5th forward
        date.setMonth(date.getMonth() + 1);
        var copy = this.getCopyOfOptions();
        copy.disableSince = checked ? { year: date.getFullYear(), month: date.getMonth() + 1, day: 1 } : { year: 0, month: 0, day: 0 };
        this.myDateRangePickerOptionsInline = copy;
    };
    SampleDateRangePickerInline.prototype.ngOnInit = function () {
        console.log('onInit(): SampleDateRangePickerInline');
    };
    SampleDateRangePickerInline.prototype.onDateRangeChanged = function (event) {
        console.log('onDateRangeChanged(): Begin: ', event.beginDate, ' End: ', event.endDate, ' - formatted: ', event.formatted, ' - beginEpoc timestamp: ', event.beginEpoc, ' - endEpoc timestamp: ', event.endEpoc);
        if (event.formatted !== '') {
            this.selectedTextInline = 'Formatted: ' + event.formatted;
            this.border = '1px solid #CCC';
        }
        else {
            this.selectedTextInline = '';
            this.border = 'none';
        }
    };
    SampleDateRangePickerInline.prototype.getCopyOfOptions = function () {
        return JSON.parse(JSON.stringify(this.myDateRangePickerOptionsInline));
    };
    SampleDateRangePickerInline = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'sample-date-range-picker-inline',
            template: __webpack_require__(/*! ./sample-date-range-picker-inline.html */ "./src/app/sample-date-range-picker-inline/sample-date-range-picker-inline.html"),
            moduleId: module.i,
        }),
        __metadata("design:paramtypes", [])
    ], SampleDateRangePickerInline);
    return SampleDateRangePickerInline;
}());



/***/ }),

/***/ "./src/app/sample-date-range-picker-normal/index.ts":
/*!**********************************************************!*\
  !*** ./src/app/sample-date-range-picker-normal/index.ts ***!
  \**********************************************************/
/*! exports provided: SampleDateRangePickerNormal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sample_date_range_picker_normal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sample-date-range-picker-normal */ "./src/app/sample-date-range-picker-normal/sample-date-range-picker-normal.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SampleDateRangePickerNormal", function() { return _sample_date_range_picker_normal__WEBPACK_IMPORTED_MODULE_0__["SampleDateRangePickerNormal"]; });




/***/ }),

/***/ "./src/app/sample-date-range-picker-normal/sample-date-range-picker-normal.html":
/*!**************************************************************************************!*\
  !*** ./src/app/sample-date-range-picker-normal/sample-date-range-picker-normal.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<style>\n  .settingstable,\n  .pickertable {\n    width: 100%;\n    border: none;\n  }\n\n  .pickertable {\n    margin-top: 20px;\n  }\n\n  .settingstable tr td,\n  .pickertable tr td {\n    width: 50%;\n    border: none;\n  }\n\n  .pickertable tr td {\n    vertical-align: top;\n  }\n\n  .selectedText {\n    padding: 4px;\n    border-radius: 4px;\n    float: right;\n  }\n</style>\n\n<div>\n  <table class=\"settingstable\">\n    <tr>\n      <td>\n        <label>\n          <span>Disable component:</span>\n          <input style=\"cursor: pointer\" type=\"checkbox\" (change)=\"onDisableComponent($event.currentTarget.checked)\"\n                 [checked]=\"false\">\n        </label>\n      </td>\n      <td>\n        <label>\n          <span>Editable date range field:</span>\n          <input style=\"cursor: pointer\" type=\"checkbox\"\n                 (change)=\"onEditableDateRangeField($event.currentTarget.checked)\" [checked]=\"true\">\n        </label>\n      </td>\n    </tr>\n    <tr>\n      <td>\n        <label>\n          <span>Show clear button:</span>\n          <input style=\"cursor: pointer\" type=\"checkbox\" (change)=\"onShowClearButton($event.currentTarget.checked)\"\n                 [checked]=\"true\">\n        </label>\n      </td>\n      <td>\n        <label>\n          <span>Align selector right:</span>\n          <input style=\"cursor: pointer\" type=\"checkbox\" (change)=\"onAlignSelectorRight($event.currentTarget.checked)\"\n                 [checked]=\"false\">\n        </label>\n      </td>\n    </tr>\n    <tr>\n      <td>\n        <label>\n          <span>Show week numbers:</span>\n          <input style=\"cursor: pointer\" type=\"checkbox\" (change)=\"onShowWeekNumbers($event.currentTarget.checked)\"\n                 [checked]=\"false\">\n        </label>\n      </td>\n      <td>\n        <label>\n          <span>Show calendar select date text:</span>\n          <input style=\"cursor: pointer\" type=\"checkbox\" (change)=\"onShowSelectDateText($event.currentTarget.checked)\"\n                 [checked]=\"true\">\n        </label>\n      </td>\n    </tr>\n\n\n\n\n    <tr>\n      <td>\n        <a href=\"https://github.com/kekeh/mydaterangepicker#options-attribute\">all options...</a>\n      </td>\n      <td>\n      </td>\n    </tr>\n  </table>\n\n  <table class=\"pickertable\">\n    <tr>\n      <td>\n        <my-date-range-picker [options]=\"myDateRangePickerOptionsNormal\" [selDateRange]=\"selectedDateRangeNormal\"\n                              [placeholder]=\"placeholderTxt\"\n                              (dateRangeChanged)=\"onDateRangeChanged($event)\"\n                              (inputFieldChanged)=\"onInputFieldChanged($event)\"\n                              (dateSelected)=\"onDateSelected($event)\"\n                              (inputFocusBlur)=\"onInputFocusBlur($event)\"\n                              (calendarViewChanged)=\"onCalendarViewChanged($event)\"></my-date-range-picker>\n      </td>\n      <td>\n        <div class=\"selectedText\" [ngStyle]=\"{border: border}\">\n          {{selectedTextNormal}}\n        </div>\n      </td>\n    </tr>\n  </table>\n</div>\n"

/***/ }),

/***/ "./src/app/sample-date-range-picker-normal/sample-date-range-picker-normal.ts":
/*!************************************************************************************!*\
  !*** ./src/app/sample-date-range-picker-normal/sample-date-range-picker-normal.ts ***!
  \************************************************************************************/
/*! exports provided: SampleDateRangePickerNormal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SampleDateRangePickerNormal", function() { return SampleDateRangePickerNormal; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SampleDateRangePickerNormal = /** @class */ (function () {
    function SampleDateRangePickerNormal() {
        this.myDateRangePickerOptionsNormal = {
            dateFormat: 'dd mmm yyyy',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '34px',
            width: '250px',
            inline: false,
            minYear: 1900,
            maxYear: 2200,
            selectionTxtFontSize: '13px',
            alignSelectorRight: false,
            showWeekNumbers: false,
            openSelectorOnInputClick: false,
            showSelectDateText: true
        };
        this.selectedDateRangeNormal = '';
        this.selectedTextNormal = '';
        this.border = 'none';
        this.placeholderTxt = 'Select a date range';
        console.log('constructor(): SampleDateRangePickerNormal');
    }
    SampleDateRangePickerNormal.prototype.ngOnInit = function () {
        console.log('onInit(): SampleDateRangePickerNormal');
    };
    SampleDateRangePickerNormal.prototype.onDisableComponent = function (checked) {
        var copy = this.getCopyOfOptions();
        copy.componentDisabled = checked;
        this.myDateRangePickerOptionsNormal = copy;
    };
    SampleDateRangePickerNormal.prototype.onEditableDateRangeField = function (checked) {
        var copy = this.getCopyOfOptions();
        copy.editableDateRangeField = checked;
        copy.openSelectorOnInputClick = !checked;
        this.myDateRangePickerOptionsNormal = copy;
    };
    SampleDateRangePickerNormal.prototype.onAlignSelectorRight = function (checked) {
        var copy = this.getCopyOfOptions();
        copy.alignSelectorRight = checked;
        this.myDateRangePickerOptionsNormal = copy;
    };
    SampleDateRangePickerNormal.prototype.onShowClearButton = function (checked) {
        var copy = this.getCopyOfOptions();
        copy.showClearDateRangeBtn = checked;
        this.myDateRangePickerOptionsNormal = copy;
    };
    SampleDateRangePickerNormal.prototype.onShowWeekNumbers = function (checked) {
        var copy = this.getCopyOfOptions();
        copy.showWeekNumbers = checked;
        this.myDateRangePickerOptionsNormal = copy;
    };
    SampleDateRangePickerNormal.prototype.onShowSelectDateText = function (checked) {
        var copy = this.getCopyOfOptions();
        copy.showSelectDateText = checked;
        this.myDateRangePickerOptionsNormal = copy;
    };
    SampleDateRangePickerNormal.prototype.onDateRangeChanged = function (event) {
        console.log('onDateRangeChanged(): Begin: ', event.beginDate, ' End: ', event.endDate, ' - formatted: ', event.formatted, ' - beginEpoc timestamp: ', event.beginEpoc, ' - endEpoc timestamp: ', event.endEpoc);
        if (event.formatted !== '') {
            this.selectedTextNormal = 'Formatted: ' + event.formatted;
            this.border = '1px solid #CCC';
        }
        else {
            this.selectedTextNormal = '';
            this.border = 'none';
        }
    };
    SampleDateRangePickerNormal.prototype.onInputFieldChanged = function (event) {
        console.log('onInputFieldChanged(): Value: ', event.value, ' - dateRangeFormat: ', event.dateRangeFormat, ' - valid: ', event.valid);
    };
    SampleDateRangePickerNormal.prototype.onCalendarViewChanged = function (event) {
        console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
    };
    SampleDateRangePickerNormal.prototype.onDateSelected = function (event) {
        console.log('onDateSelected(): Value: ', event);
    };
    SampleDateRangePickerNormal.prototype.onInputFocusBlur = function (event) {
        console.log('onInputFocusBlur(): Reason: ', event.reason, ' - Value: ', event.value);
    };
    SampleDateRangePickerNormal.prototype.getCopyOfOptions = function () {
        return JSON.parse(JSON.stringify(this.myDateRangePickerOptionsNormal));
    };
    SampleDateRangePickerNormal = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'sample-date-range-picker-normal',
            template: __webpack_require__(/*! ./sample-date-range-picker-normal.html */ "./src/app/sample-date-range-picker-normal/sample-date-range-picker-normal.html"),
            moduleId: module.i,
        }),
        __metadata("design:paramtypes", [])
    ], SampleDateRangePickerNormal);
    return SampleDateRangePickerNormal;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]);


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/keijo/code/ghpages/mydaterangepicker/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map