"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var my_date_range_picker_date_range_validator_service_1 = require("./services/my-date-range-picker.date.range.validator.service");
var MyDateRangePicker = (function () {
    function MyDateRangePicker(elem, renderer, dateValidatorRangeService) {
        var _this = this;
        this.elem = elem;
        this.renderer = renderer;
        this.dateValidatorRangeService = dateValidatorRangeService;
        this.dateRangeChanged = new core_1.EventEmitter();
        this.inputFieldChanged = new core_1.EventEmitter();
        this.calendarViewChanged = new core_1.EventEmitter();
        this.showSelector = false;
        this.visibleMonth = { monthTxt: "", monthNbr: 0, year: 0 };
        this.selectedMonth = { monthTxt: "", monthNbr: 0, year: 0 };
        this.weekDays = [];
        this.dates = [];
        this.selectionDayTxt = "";
        this.invalidDateRange = false;
        this.dateRangeFormat = "";
        this.dayIdx = 0;
        this.weekDayOpts = ["su", "mo", "tu", "we", "th", "fr", "sa"];
        this.editMonth = false;
        this.invalidMonth = false;
        this.editYear = false;
        this.invalidYear = false;
        this.PREV_MONTH = 1;
        this.CURR_MONTH = 2;
        this.NEXT_MONTH = 3;
        this.MIN_YEAR = 1000;
        this.MAX_YEAR = 9999;
        this.isBeginDate = true;
        this.beginDate = { year: 0, month: 0, day: 0 };
        this.endDate = { year: 0, month: 0, day: 0 };
        this.preventBefore = { year: 0, month: 0, day: 0 };
        this.preventAfter = { year: 0, month: 0, day: 0 };
        this.titleAreaTextBegin = "";
        this.titleAreaTextEnd = "";
        this.opts = {
            dayLabels: { su: "Sun", mo: "Mon", tu: "Tue", we: "Wed", th: "Thu", fr: "Fri", sa: "Sat" },
            monthLabels: { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" },
            dateFormat: "yyyy-mm-dd",
            showClearBtn: true,
            clearBtnTxt: "Clear",
            beginDateBtnTxt: "Begin Date",
            endDateBtnTxt: "End Date",
            acceptBtnTxt: "Accept",
            showSelectDateText: true,
            selectBeginDateTxt: "Select Begin Date",
            selectEndDateTxt: "Select End Date",
            firstDayOfWeek: "mo",
            sunHighlight: true,
            markCurrentDay: true,
            height: "34px",
            width: "262px",
            inline: false,
            showClearDateRangeBtn: true,
            selectionTxtFontSize: "16px",
            alignSelectorRight: false,
            indicateInvalidDateRange: true,
            showDateRangeFormatPlaceholder: false,
            customPlaceholderTxt: "",
            editableDateRangeField: true,
            editableMonthAndYear: true,
            minYear: this.MIN_YEAR,
            maxYear: this.MAX_YEAR,
            disableUntil: { year: 0, month: 0, day: 0 },
            disableSince: { year: 0, month: 0, day: 0 },
            componentDisabled: false,
            inputValueRequired: false,
            showSelectorArrow: true
        };
        renderer.listenGlobal("document", "click", function (event) {
            if (_this.showSelector && event.target && _this.elem.nativeElement !== event.target && !_this.elem.nativeElement.contains(event.target)) {
                _this.showSelector = false;
            }
            if (_this.opts.editableMonthAndYear && event.target && _this.elem.nativeElement.contains(event.target)) {
                _this.resetMonthYearEdit();
            }
        });
    }
    MyDateRangePicker.prototype.resetMonthYearEdit = function () {
        this.editMonth = false;
        this.editYear = false;
        this.invalidMonth = false;
        this.invalidYear = false;
    };
    MyDateRangePicker.prototype.editMonthClicked = function (event) {
        event.stopPropagation();
        if (this.opts.editableMonthAndYear) {
            this.editMonth = true;
        }
    };
    MyDateRangePicker.prototype.editYearClicked = function (event) {
        event.stopPropagation();
        if (this.opts.editableMonthAndYear) {
            this.editYear = true;
        }
    };
    MyDateRangePicker.prototype.userDateRangeInput = function (event) {
        this.invalidDateRange = false;
        if (event.target.value.length === 0) {
            this.clearDateRange();
        }
        else {
            var daterange = this.dateValidatorRangeService.isDateRangeValid(event.target.value, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.monthLabels);
            if (daterange.beginDate.day !== 0 && daterange.beginDate.month !== 0 && daterange.beginDate.year !== 0 && daterange.endDate.day !== 0 && daterange.endDate.month !== 0 && daterange.endDate.year !== 0) {
                this.beginDate = daterange.beginDate;
                this.endDate = daterange.endDate;
                this.rangeSelected();
            }
            else {
                this.invalidDateRange = true;
            }
        }
        if (this.invalidDateRange) {
            this.inputFieldChanged.emit({ value: event.target.value, dateRangeFormat: this.dateRangeFormat, valid: !(event.target.value.length === 0 || this.invalidDateRange) });
        }
    };
    MyDateRangePicker.prototype.lostFocusInput = function (event) {
        this.selectionDayTxt = event.target.value;
    };
    MyDateRangePicker.prototype.userMonthInput = function (event) {
        if (event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 39) {
            return;
        }
        this.invalidMonth = false;
        var m = this.dateValidatorRangeService.isMonthLabelValid(event.target.value, this.opts.monthLabels);
        if (m !== -1) {
            this.editMonth = false;
            var viewChange = m !== this.visibleMonth.monthNbr;
            this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: this.visibleMonth.year };
            this.generateCalendar(m, this.visibleMonth.year, viewChange);
        }
        else {
            this.invalidMonth = true;
        }
    };
    MyDateRangePicker.prototype.userYearInput = function (event) {
        if (event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 39) {
            return;
        }
        this.invalidYear = false;
        var y = this.dateValidatorRangeService.isYearLabelValid(Number(event.target.value), this.opts.minYear, this.opts.maxYear);
        if (y !== -1) {
            this.editYear = false;
            var viewChange = y !== this.visibleMonth.year;
            this.visibleMonth = { monthTxt: this.visibleMonth.monthTxt, monthNbr: this.visibleMonth.monthNbr, year: y };
            this.generateCalendar(this.visibleMonth.monthNbr, y, viewChange);
        }
        else {
            this.invalidYear = true;
        }
    };
    MyDateRangePicker.prototype.parseOptions = function () {
        var _this = this;
        if (this.options !== undefined) {
            Object.keys(this.options).forEach(function (k) {
                _this.opts[k] = _this.options[k];
            });
        }
        if (this.opts.minYear < this.MIN_YEAR) {
            this.opts.minYear = this.MIN_YEAR;
        }
        if (this.opts.maxYear > this.MAX_YEAR) {
            this.opts.maxYear = this.MAX_YEAR;
        }
        this.dateRangeFormat = this.opts.dateFormat + " - " + this.opts.dateFormat;
        this.dayIdx = this.weekDayOpts.indexOf(this.opts.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            var idx = this.dayIdx;
            for (var i = 0; i < this.weekDayOpts.length; i++) {
                this.weekDays.push(this.opts.dayLabels[this.weekDayOpts[idx]]);
                idx = this.weekDayOpts[idx] === "sa" ? 0 : idx + 1;
            }
        }
    };
    MyDateRangePicker.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty("options")) {
            this.options = changes["options"].currentValue;
            this.weekDays.length = 0;
            this.parseOptions();
        }
        if (changes.hasOwnProperty("defaultMonth")) {
            var dm = changes["defaultMonth"].currentValue;
            if (dm !== null && dm !== undefined && dm !== "") {
                this.selectedMonth = this.parseSelectedMonth(dm);
            }
            else {
                this.selectedMonth = { monthTxt: "", monthNbr: 0, year: 0 };
            }
        }
        if (changes.hasOwnProperty("selDateRange")) {
            var sdr = changes["selDateRange"];
            this.selectionDayTxt = sdr.currentValue;
            if (sdr.currentValue !== null && sdr.currentValue !== undefined && sdr.currentValue !== "") {
                var split = sdr.currentValue.split(" - ");
                if (split.length === 2) {
                    this.beginDate = this.parseSelectedDate(split[0]);
                    this.endDate = this.parseSelectedDate(split[1]);
                    this.titleAreaTextBegin = this.formatDate(this.beginDate);
                    this.titleAreaTextEnd = this.formatDate(this.endDate);
                    this.toBeginDate();
                }
            }
            else {
                if (!sdr.isFirstChange()) {
                    this.clearDateRange();
                }
            }
        }
        if (this.opts.inline) {
            this.setVisibleMonth();
        }
    };
    MyDateRangePicker.prototype.removeBtnClicked = function () {
        this.clearDateRange();
    };
    MyDateRangePicker.prototype.openBtnClicked = function () {
        this.showSelector = !this.showSelector;
        if (this.showSelector) {
            this.setVisibleMonth();
        }
    };
    MyDateRangePicker.prototype.setVisibleMonth = function () {
        this.isBeginDate = true;
        if (this.beginDate.year !== 0 && this.beginDate.month !== 0 && this.beginDate.day !== 0) {
            this.toBeginDate();
        }
        else {
            var y = 0, m = 0;
            if (this.selectedMonth.year === 0 && this.selectedMonth.monthNbr === 0) {
                var today = this.getToday();
                y = today.year;
                m = today.month;
            }
            else {
                y = this.selectedMonth.year;
                m = this.selectedMonth.monthNbr;
            }
            this.visibleMonth = { monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y };
            this.generateCalendar(m, y, true);
        }
    };
    MyDateRangePicker.prototype.clearDateRange = function () {
        this.clearBtnClicked();
        this.dateRangeChanged.emit({ beginDate: {}, endDate: {}, formatted: "", beginEpoc: 0, endEpoc: 0 });
        this.inputFieldChanged.emit({ value: "", dateRangeFormat: this.dateRangeFormat, valid: false });
        this.invalidDateRange = false;
    };
    MyDateRangePicker.prototype.prevMonth = function () {
        var d = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() - 1);
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    };
    MyDateRangePicker.prototype.nextMonth = function () {
        var d = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() + 1);
        var y = d.getFullYear();
        var m = d.getMonth() + 1;
        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    };
    MyDateRangePicker.prototype.prevYear = function () {
        if (this.visibleMonth.year - 1 < this.opts.minYear) {
            return;
        }
        this.visibleMonth.year--;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    };
    MyDateRangePicker.prototype.nextYear = function () {
        if (this.visibleMonth.year + 1 > this.opts.maxYear) {
            return;
        }
        this.visibleMonth.year++;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    };
    MyDateRangePicker.prototype.clearBtnClicked = function () {
        this.isBeginDate = true;
        this.selectionDayTxt = "";
        this.beginDate = { year: 0, month: 0, day: 0 };
        this.endDate = { year: 0, month: 0, day: 0 };
        this.titleAreaTextBegin = "";
        this.titleAreaTextEnd = "";
        this.preventAfter = { year: 0, month: 0, day: 0 };
        this.preventBefore = { year: 0, month: 0, day: 0 };
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, false);
    };
    MyDateRangePicker.prototype.cellClicked = function (cell) {
        if (this.isBeginDate) {
            this.beginDate = cell.dateObj;
            this.titleAreaTextBegin = this.formatDate(this.beginDate);
            this.titleAreaTextEnd = this.endDate.year === 0 ? this.opts.selectEndDateTxt : this.formatDate(this.endDate);
        }
        else {
            this.endDate = cell.dateObj;
            this.titleAreaTextEnd = this.formatDate(this.endDate);
        }
    };
    MyDateRangePicker.prototype.cellKeyDown = function (event, cell) {
        if ((event.keyCode === 13 || event.keyCode === 32) && !cell.disabled) {
            event.preventDefault();
            this.cellClicked(cell);
        }
    };
    MyDateRangePicker.prototype.toEndDate = function () {
        this.isBeginDate = false;
        this.preventAfter = { year: 0, month: 0, day: 0 };
        this.preventBefore = this.getPreviousDate(this.beginDate);
        if (this.endDate.year === 0 && this.endDate.month === 0 && this.endDate.day === 0) {
            this.visibleMonth = { monthTxt: this.monthText(this.beginDate.month), monthNbr: this.beginDate.month, year: this.beginDate.year };
            this.generateCalendar(this.beginDate.month, this.beginDate.year, false);
        }
        else {
            var viewChange = this.endDate.year !== this.visibleMonth.year || this.endDate.month !== this.visibleMonth.monthNbr;
            this.visibleMonth = { monthTxt: this.monthText(this.endDate.month), monthNbr: this.endDate.month, year: this.endDate.year };
            this.generateCalendar(this.endDate.month, this.endDate.year, viewChange);
        }
    };
    MyDateRangePicker.prototype.toBeginDate = function () {
        this.isBeginDate = true;
        this.preventBefore = { year: 0, month: 0, day: 0 };
        if (this.endDate.year !== 0 && this.endDate.month !== 0 && this.endDate.day !== 0) {
            this.preventAfter = this.getNextDate(this.endDate);
        }
        var viewChange = this.beginDate.year !== this.visibleMonth.year || this.beginDate.month !== this.visibleMonth.monthNbr;
        this.visibleMonth = { monthTxt: this.monthText(this.beginDate.month), monthNbr: this.beginDate.month, year: this.beginDate.year };
        this.generateCalendar(this.beginDate.month, this.beginDate.year, viewChange);
    };
    MyDateRangePicker.prototype.titleAreaKeyDown = function (event, title) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            title === 1 ? this.toBeginDate() : this.toEndDate();
        }
    };
    MyDateRangePicker.prototype.rangeSelected = function () {
        var begin = this.formatDate(this.beginDate);
        var end = this.formatDate(this.endDate);
        this.selectionDayTxt = begin + " - " + end;
        this.showSelector = false;
        var bEpoc = this.getTimeInMilliseconds(this.beginDate) / 1000.0;
        var eEpoc = this.getTimeInMilliseconds(this.endDate) / 1000.0;
        this.dateRangeChanged.emit({ beginDate: this.beginDate, endDate: this.endDate, formatted: this.selectionDayTxt, beginEpoc: bEpoc, endEpoc: eEpoc });
        this.inputFieldChanged.emit({ value: this.selectionDayTxt, dateRangeFormat: this.dateRangeFormat, valid: true });
        this.invalidDateRange = false;
    };
    MyDateRangePicker.prototype.isInRange = function (val) {
        if (this.beginDate.year === 0 && this.beginDate.month === 0 && this.beginDate.day === 0 || this.endDate.year === 0 && this.endDate.month === 0 && this.endDate.day === 0) {
            return false;
        }
        var input = this.getTimeInMilliseconds(val.dateObj);
        var begin = this.getTimeInMilliseconds(this.beginDate);
        var end = this.getTimeInMilliseconds(this.endDate);
        if (input >= begin && input <= end) {
            return true;
        }
        return false;
    };
    MyDateRangePicker.prototype.isRangeSelected = function () {
        if (this.beginDate.year !== 0 && this.beginDate.month !== 0 && this.beginDate.day !== 0 && this.endDate.year !== 0 && this.endDate.month !== 0 && this.endDate.day !== 0) {
            return true;
        }
        return false;
    };
    MyDateRangePicker.prototype.preZero = function (val) {
        return parseInt(val) < 10 ? "0" + val : val;
    };
    MyDateRangePicker.prototype.formatDate = function (val) {
        var formatted = this.opts.dateFormat.replace("yyyy", val.year).replace("dd", this.preZero(val.day));
        return this.opts.dateFormat.indexOf("mmm") !== -1 ? formatted.replace("mmm", this.monthText(val.month)) : formatted.replace("mm", this.preZero(val.month));
    };
    MyDateRangePicker.prototype.monthText = function (m) {
        return this.opts.monthLabels[m];
    };
    MyDateRangePicker.prototype.monthStartIdx = function (y, m) {
        var d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        var idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    };
    MyDateRangePicker.prototype.daysInMonth = function (m, y) {
        return new Date(y, m, 0).getDate();
    };
    MyDateRangePicker.prototype.daysInPrevMonth = function (m, y) {
        var d = this.getDate(y, m, 1);
        d.setMonth(d.getMonth() - 1);
        return this.daysInMonth(d.getMonth() + 1, d.getFullYear());
    };
    MyDateRangePicker.prototype.isCurrDay = function (d, m, y, cmo, today) {
        return d === today.day && m === today.month && y === today.year && cmo === this.CURR_MONTH;
    };
    MyDateRangePicker.prototype.getPreviousDate = function (date) {
        var d = this.getDate(date.year, date.month, date.day);
        d.setDate(d.getDate() - 1);
        return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
    };
    MyDateRangePicker.prototype.getNextDate = function (date) {
        var d = this.getDate(date.year, date.month, date.day);
        d.setDate(d.getDate() + 1);
        return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
    };
    MyDateRangePicker.prototype.getTimeInMilliseconds = function (date) {
        return this.getDate(date.year, date.month, date.day).getTime();
    };
    MyDateRangePicker.prototype.getDayNumber = function (date) {
        var d = this.getDate(date.year, date.month, date.day);
        return d.getDay();
    };
    MyDateRangePicker.prototype.getWeekday = function (date) {
        return this.weekDayOpts[this.getDayNumber(date)];
    };
    MyDateRangePicker.prototype.getDate = function (year, month, day) {
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    };
    MyDateRangePicker.prototype.getToday = function () {
        var date = new Date();
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    };
    MyDateRangePicker.prototype.sundayIdx = function () {
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    };
    MyDateRangePicker.prototype.generateCalendar = function (m, y, viewChange) {
        this.dates.length = 0;
        var today = this.getToday();
        var monthStart = this.monthStartIdx(y, m);
        var dInThisM = this.daysInMonth(m, y);
        var dInPrevM = this.daysInPrevMonth(m, y);
        var dayNbr = 1;
        var cmo = this.PREV_MONTH;
        for (var i = 1; i < 7; i++) {
            var week = [];
            if (i === 1) {
                var pm = dInPrevM - monthStart + 1;
                for (var j = pm; j <= dInPrevM; j++) {
                    var date = { year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: j };
                    week.push({ dateObj: date, cmo: cmo, currDay: this.isCurrDay(j, m, y, cmo, today), dayNbr: this.getDayNumber(date), disabled: this.dateValidatorRangeService.isDisabledDay(date, this.opts.disableUntil, this.opts.disableSince, this.preventBefore, this.preventAfter) });
                }
                cmo = this.CURR_MONTH;
                var daysLeft = 7 - week.length;
                for (var j = 0; j < daysLeft; j++) {
                    var date = { year: y, month: m, day: dayNbr };
                    week.push({ dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today), dayNbr: this.getDayNumber(date), disabled: this.dateValidatorRangeService.isDisabledDay(date, this.opts.disableUntil, this.opts.disableSince, this.preventBefore, this.preventAfter) });
                    dayNbr++;
                }
            }
            else {
                for (var j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        dayNbr = 1;
                        cmo = this.NEXT_MONTH;
                        if (m === 12) {
                            y++;
                            m = 1;
                        }
                        else {
                            m++;
                        }
                    }
                    var date = { year: y, month: m, day: dayNbr };
                    week.push({ dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today), dayNbr: this.getDayNumber(date), disabled: this.dateValidatorRangeService.isDisabledDay(date, this.opts.disableUntil, this.opts.disableSince, this.preventBefore, this.preventAfter) });
                    dayNbr++;
                }
            }
            this.dates.push(week);
        }
        if (viewChange) {
            this.calendarViewChanged.emit({ year: y, month: m, first: { number: 1, weekday: this.getWeekday({ year: y, month: m, day: 1 }) }, last: { number: dInThisM, weekday: this.getWeekday({ year: y, month: m, day: dInThisM }) } });
        }
    };
    MyDateRangePicker.prototype.parseSelectedDate = function (ds) {
        var date = { day: 0, month: 0, year: 0 };
        if (ds !== "") {
            date.day = this.dateValidatorRangeService.parseDatePartNumber(this.opts.dateFormat, ds, "dd");
            date.month = this.opts.dateFormat.indexOf("mmm") !== -1
                ? this.dateValidatorRangeService.parseDatePartMonthName(this.opts.dateFormat, ds, "mmm", this.opts.monthLabels)
                : this.dateValidatorRangeService.parseDatePartNumber(this.opts.dateFormat, ds, "mm");
            date.year = this.dateValidatorRangeService.parseDatePartNumber(this.opts.dateFormat, ds, "yyyy");
        }
        return date;
    };
    MyDateRangePicker.prototype.parseSelectedMonth = function (ms) {
        return this.dateValidatorRangeService.parseDefaultMonth(ms);
    };
    return MyDateRangePicker;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MyDateRangePicker.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MyDateRangePicker.prototype, "defaultMonth", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MyDateRangePicker.prototype, "selDateRange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MyDateRangePicker.prototype, "dateRangeChanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MyDateRangePicker.prototype, "inputFieldChanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MyDateRangePicker.prototype, "calendarViewChanged", void 0);
MyDateRangePicker = __decorate([
    core_1.Component({
        selector: "my-date-range-picker",
        styles: [".mydrp .headerclearbtn,.mydrp .selection,.mydrp .weekdaytitle{overflow:hidden;white-space:nowrap}.mydrp{min-width:100px;border-radius:2px;line-height:1;display:inline-block;position:relative}.mydrp *{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;padding:0;margin:0}.mydrp .selector{margin-top:2px;margin-left:-1px;position:absolute;width:252px;padding:1px;border-radius:2px;background-color:#CCC;z-index:100;animation:selectorfadein .1s}@keyframes selectorfadein{from{opacity:0}to{opacity:1}}.mydrp .selectorarrow{background:#FFF;border:1px solid #CCC;margin-top:12px;padding:0}.mydrp .selectorarrow:after,.mydrp .selectorarrow:before{bottom:100%;border:solid transparent;content:\" \";height:0;width:0;position:absolute}.mydrp .selectorarrow:after{border-color:rgba(250,250,250,0);border-bottom-color:#FFF;border-width:10px;margin-left:-10px}.mydrp .selectorarrow:before{border-color:rgba(204,204,204,0);border-bottom-color:#CCC;border-width:11px;margin-left:-11px}.mydrp .selectorarrowleft:after,.mydrp .selectorarrowleft:before{left:24px}.mydrp .selectorarrowright:after,.mydrp .selectorarrowright:before{left:224px}.mydrp .alignselectorright{right:-1px}.mydrp .selectiongroup{position:relative;display:table;border:none;border-spacing:0;background-color:#FFF}.mydrp .selection{background-color:#FFF;display:table-cell;position:absolute;width:100%;font-size:14px;font-weight:700;padding:0 64px 0 4px;text-overflow:ellipsis;text-align:center}.mydrp .invaliddaterange,.mydrp .invalidmonth,.mydrp .invalidyear{background-color:#F1DEDE}.mydrp ::-ms-clear{display:none}.mydrp .selbtngroup{position:relative;vertical-align:middle;white-space:nowrap;width:1%;display:table-cell;font-size:0}.mydrp .btnclear,.mydrp .btnpicker{height:100%;width:30px;border:none;border-left:1px solid #CCC;padding:0;outline:0;font:inherit;-moz-user-select:none}.mydrp .btnclearenabled,.mydrp .btnpickerenabled{cursor:pointer}.mydrp .btncleardisabled,.mydrp .btnpickerdisabled{cursor:not-allowed}.mydrp .btnclear,.mydrp .btnpicker,.mydrp .footerbtn,.mydrp .headerclearbtn{background:#FFF}.mydrp .header{width:100%;height:30px;background-color:#FFF}.mydrp .header td{vertical-align:middle;border:none;line-height:0}.mydrp .header td:nth-child(1){padding-left:4px}.mydrp .header td:nth-child(2){text-align:center}.mydrp .header td:nth-child(3){padding-right:4px}.mydrp .titlearea{text-align:center;background-color:#FFF}.mydrp .titleareatxt{display:table;border-spacing:0;width:100%;height:26px;line-height:26px;font-size:12px}.mydrp .titleareafull{border-bottom:1px solid #CCC}.mydrp .titlearealeft,.mydrp .titlearearight{display:table-cell;width:50%}.mydrp .titlearealeftenabled{background-color:#FFF;border-right:1px solid transparent}.mydrp .titlearearightenabled{background-color:#FFF;border-left:1px solid transparent}.mydrp .titlearealeftdisabled{border-bottom:1px solid #CCC;border-right:1px solid #CCC;border-bottom-right-radius:4px}.mydrp .titlearearightdisabled{border-bottom:1px solid #CCC;border-left:1px solid #CCC;border-bottom-left-radius:4px}.mydrp .titleareatxtlink:hover{text-decoration:underline;color:#8BDAF4;cursor:pointer}.mydrp .inline{position:relative;margin-top:-1px}.mydrp .caltable{table-layout:fixed;width:100%;background-color:#FFF;font-size:14px}.mydrp .caltable,.mydrp .daycell,.mydrp .weekdaytitle{border-collapse:collapse;color:#036;line-height:1.1}.mydrp .daycell,.mydrp .weekdaytitle{padding:5px;text-align:center}.mydrp .weekdaytitle{background-color:#DDD;font-size:12px;font-weight:700;vertical-align:middle;max-width:36px}.mydrp .daycell{cursor:pointer;height:30px}.mydrp .nextmonth,.mydrp .prevmonth{color:#444}.mydrp .disabled{cursor:default!important;color:#444!important;background:#FBEFEF!important}.mydrp .sunday{color:#C30000}.mydrp .sundayDim{opacity:.5}.mydrp .currmonth{background-color:#F6F6F6;font-weight:700}.mydrp .range{background:#D9F2E6}.mydrp .currday{text-decoration:underline}.mydrp .selectedday{border:1px solid #004198;background-color:#8EBFFF!important;border-radius:2px}.mydrp .selecteddaygreen{background-color:#28A828!important}.mydrp .selectmenu{height:24px;width:60px}.mydrp .headerbtncell{background-color:#FFF;cursor:pointer;display:table-cell;vertical-align:middle}.mydrp .headerbtn,.mydrp .headerlabelbtn{background:#FFF;border:none;height:18px}.mydrp .headerbtn{width:16px}.mydrp .headerlabelbtn{font-size:14px}.mydrp,.mydrp .footerbtn,.mydrp .headerclearbtn,.mydrp .monthinput,.mydrp .yearinput{border:1px solid #CCC}.mydrp .btnclear,.mydrp .btnpicker,.mydrp .footerbtn,.mydrp .headerbtn,.mydrp .headerclearbtn,.mydrp .headermonthtxt,.mydrp .headeryeartxt,.mydrp .monthinput,.mydrp .selection,.mydrp .yearinput{color:#000}.mydrp .footerbtn,.mydrp .headerclearbtn{border-radius:2px;cursor:pointer;font-size:11px;height:22px}.mydrp .headerclearbtn{min-width:60px;max-width:70px;padding:0 4px}.mydrp .footerbtn{min-width:80px}.mydrp .btndisable{cursor:default;opacity:.5}.mydrp .footerarea{border-top:1px solid #CCC;padding:3px;text-align:center;background-color:#FFF}.mydrp button::-moz-focus-inner{border:0}.mydrp .headermonthtxt,.mydrp .headeryeartxt{text-align:center;display:table-cell;vertical-align:middle;font-size:14px;height:26px;width:40px;max-width:40px;overflow:hidden;white-space:nowrap}.mydrp .btnclear:focus,.mydrp .btnpicker:focus,.mydrp .footerbtn:focus,.mydrp .headerclearbtn:focus{background:#ADD8E6}.mydrp .headerbtn:focus,.mydrp .monthlabel:focus,.mydrp .yearlabel:focus{color:#ADD8E6;outline:0}.mydrp .titlearealeft:focus,.mydrp .titlearearight:focus{text-decoration:underline;outline:0}.mydrp .daycell:focus{outline:#CCC solid 1px}.mydrp .icon-calendar,.mydrp .icon-cross{font-size:16px}.mydrp .icon-left,.mydrp .icon-right{color:#222;font-size:98%;vertical-align:middle}.mydrp table{display:table;border-spacing:0}.mydrp table td{padding:0}.mydrp table,.mydrp td,.mydrp th{border:none}.mydrp .btnclearenabled:hover,.mydrp .btnpickerenabled:hover,.mydrp .daycell:hover,.mydrp .footerbtnenabled:hover,.mydrp .headerclearbtnenabled:hover{background-color:#8BDAF4}.mydrp .headerbtn,.mydrp .monthlabel,.mydrp .yearlabel{cursor:pointer}.mydrp .monthinput,.mydrp .yearinput{width:40px;height:22px;text-align:center;font-weight:700;outline:0;border-radius:2px}.mydrp .headerbtn:hover,.mydrp .monthlabel:hover,.mydrp .yearlabel:hover{color:#8BDAF4}@font-face{font-family:mydaterangepicker;src:url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SAssAAAC8AAAAYGNtYXDMUczTAAABHAAAAGxnYXNwAAAAEAAAAYgAAAAIZ2x5ZmFQ1q4AAAGQAAABbGhlYWQGZuTFAAAC/AAAADZoaGVhB4IDyQAAAzQAAAAkaG10eBYAAnAAAANYAAAAIGxvY2EBdAE0AAADeAAAABJtYXhwABUAPgAAA4wAAAAgbmFtZQ5R9RkAAAOsAAABnnBvc3QAAwAAAAAFTAAAACAAAwOaAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADmBwPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAUAAAABAAEAADAAAAAQAg5gDmAuYF5gf//f//AAAAAAAg5gDmAuYF5gf//f//AAH/4xoEGgMaARoAAAMAAQAAAAAAAAAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAAMAEAAAAPAA4AABAAJAA4AEwAYAB0AIgAnACwAMQA2ADsAABMRMxEjFyE1IRUDITUhFQERMxEjJRUzNSMTFTM1IzMVMzUjMxUzNSMBFTM1IzMVMzUjMxUzNSMTFTM1I0Bzc0ADAP0AQAOA/IADDXNz/ZOAgCCAgMCAgMCAgP6AgIDAgIDAgIAggIADAP1AAsBzc3P9c3NzAwD9QALAgMDA/sCAgICAgID/AICAgICAgAJAwMAAAAAAAgBwADADkANQAAQACQAANwEnARcDATcBB+kCp3n9WXl5Aqd5/Vl5MAKnef1ZeQKn/Vl5Aqd5AAABAOAAAAMgA4AAAwAAAQMBJQMgA/3DASADgPyAAcPfAAEA4AAAAyADgAADAAA3EwEF4AMCPf7gAAOA/j3fAAAAAQAAAAEAAF0/BsNfDzz1AAsEAAAAAADRxFAkAAAAANHEUCQAAAAAA8ADgAAAAAgAAgAAAAAAAAABAAADwP/AAAAEAAAAAAADwAABAAAAAAAAAAAAAAAAAAAACAQAAAAAAAAAAAAAAAIAAAAEAABABAAAcAQAAOAEAADgAAAAAAAKABQAHgB6AJYApgC2AAAAAQAAAAgAPAAMAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAkAAAABAAAAAAACAAcAcgABAAAAAAADAAkAPAABAAAAAAAEAAkAhwABAAAAAAAFAAsAGwABAAAAAAAGAAkAVwABAAAAAAAKABoAogADAAEECQABABIACQADAAEECQACAA4AeQADAAEECQADABIARQADAAEECQAEABIAkAADAAEECQAFABYAJgADAAEECQAGABIAYAADAAEECQAKADQAvHZzZHBpY2tlcgB2AHMAZABwAGkAYwBrAGUAclZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMHZzZHBpY2tlcgB2AHMAZABwAGkAYwBrAGUAcnZzZHBpY2tlcgB2AHMAZABwAGkAYwBrAGUAclJlZ3VsYXIAUgBlAGcAdQBsAGEAcnZzZHBpY2tlcgB2AHMAZABwAGkAYwBrAGUAckZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=) format('truetype');font-weight:400;font-style:normal}.mydrp .icon{font-family:mydaterangepicker;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.mydrp .icon-calendar:before{content:\"\\e600\"}.mydrp .icon-cross:before{content:\"\\e602\"}.mydrp .icon-left:before{content:\"\\e605\"}.mydrp .icon-right:before{content:\"\\e607\"}"],
        template: "<div class=\"mydrp\" [ngStyle]=\"{'width': opts.width, 'border': opts.inline ? 'none' : null}\"><div class=\"selectiongroup\" *ngIf=\"!opts.inline\"><input type=\"text\" class=\"selection\" aria-label=\"Date range input field\" [attr.maxlength]=\"dateRangeFormat.length\" [ngClass]=\"{'invaliddaterange': invalidDateRange&&opts.indicateInvalidDateRange}\" placeholder=\"{{opts.showDateRangeFormatPlaceholder?dateRangeFormat:opts.customPlaceholderTxt}}\" [ngStyle]=\"{'height': opts.height, 'line-height': height, 'font-size': opts.selectionTxtFontSize, 'border': 'none', 'padding-right': selectionDayTxt.length>0&&opts.showClearDateRangeBtn ? '60px' : '30px'}\" (keyup)=\"userDateRangeInput($event)\" (blur)=\"lostFocusInput($event)\" [value]=\"selectionDayTxt\" [disabled]=\"opts.componentDisabled\" [readonly]=\"!opts.editableDateRangeField\" [required]=\"opts.inputValueRequired\"> <span class=\"selbtngroup\" [style.height]=\"opts.height\"><button type=\"button\" class=\"btnclear\" aria-label=\"Clear date range\" *ngIf=\"selectionDayTxt.length>0&&opts.showClearDateRangeBtn\" (click)=\"removeBtnClicked()\" [ngClass]=\"{'btnclearenabled': !opts.componentDisabled, 'btncleardisabled': opts.componentDisabled}\" [disabled]=\"opts.componentDisabled\"><span class=\"icon icon-cross\" [ngStyle]=\"{'line-height': opts.height}\"></span></button> <button type=\"button\" class=\"btnpicker\" aria-label=\"Open calendar\" (click)=\"openBtnClicked()\" [ngClass]=\"{'btnpickerenabled': !opts.componentDisabled, 'btnpickerdisabled': opts.componentDisabled}\" [disabled]=\"opts.componentDisabled\"><span class=\"icon icon-calendar\" [ngStyle]=\"{'line-height': opts.height}\"></span></button></span></div><div class=\"selector\" *ngIf=\"showSelector||opts.inline\" [ngClass]=\"{'inline': opts.inline, 'alignselectorright': opts.alignSelectorRight, 'selectorarrow': opts.showSelectorArrow&&!opts.inline, 'selectorarrowleft': opts.showSelectorArrow&&!opts.alignSelectorRight&&!opts.inline, 'selectorarrowright': opts.showSelectorArrow&&opts.alignSelectorRight&&!opts.inline}\"><div class=\"titlearea\" *ngIf=\"opts.showSelectDateText\"><div class=\"titleareatxt\"><div class=\"titleareafull\" *ngIf=\"titleAreaTextBegin.length===0&&titleAreaTextEnd.length===0\">{{opts.selectBeginDateTxt}}</div><div class=\"titlearealeft\" *ngIf=\"titleAreaTextBegin.length!==0||titleAreaTextEnd.length!==0\" [ngClass]=\"{'titlearealeftenabled': isBeginDate, 'titlearealeftdisabled': !isBeginDate, 'titleareatxtlink': !isBeginDate}\" (click)=\"toBeginDate()\" (keydown)=\"titleAreaKeyDown($event, 1)\" tabindex=\"{{!isBeginDate?'0':'-1'}}\">{{titleAreaTextBegin}}</div><div class=\"titlearearight\" *ngIf=\"titleAreaTextBegin.length!==0||titleAreaTextEnd.length!==0\" [ngClass]=\"{'titlearearightenabled': !isBeginDate, 'titlearearightdisabled': isBeginDate, 'titleareatxtlink': isBeginDate}\" (click)=\"toEndDate()\" (keydown)=\"titleAreaKeyDown($event, 2)\" tabindex=\"{{isBeginDate?'0':'-1'}}\">{{titleAreaTextEnd}}</div></div></div><table class=\"header\"><tr><td><div style=\"float:left\"><div class=\"headerbtncell\"><button type=\"button\" class=\"headerbtn icon icon-left\" aria-label=\"Previous month\" (click)=\"prevMonth()\"></button></div><div class=\"headermonthtxt\"><input type=\"text\" *ngIf=\"editMonth\" class=\"monthinput\" maxlength=\"12\" inputFocus [value]=\"visibleMonth.monthTxt\" (keyup)=\"userMonthInput($event)\" (click)=\"$event.stopPropagation()\" [ngClass]=\"{'invalidmonth': invalidMonth}\"> <button class=\"headerlabelbtn\" type=\"button\" [ngClass]=\"{'monthlabel': opts.editableMonthAndYear}\" *ngIf=\"!editMonth\" (click)=\"opts.editableMonthAndYear&&editMonthClicked($event)\" tabindex=\"{{opts.editableMonthAndYear?'0':'-1'}}\">{{visibleMonth.monthTxt}}</button></div><div class=\"headerbtncell\"><button type=\"button\" class=\"headerbtn icon icon-right\" aria-label=\"Next month\" (click)=\"nextMonth()\"></button></div></div></td><td *ngIf=\"opts.showClearBtn\"><button type=\"button\" class=\"headerclearbtn\" [disabled]=\"beginDate.year===0&&endDate.year===0\" [ngClass]=\"{'btndisable':beginDate.year===0&&endDate.year===0, 'headerclearbtnenabled':beginDate.year!==0||endDate.year!==0}\" (click)=\"clearBtnClicked()\">{{opts.clearBtnTxt}}</button></td><td><div style=\"float:right\"><div class=\"headerbtncell\"><button type=\"button\" class=\"headerbtn icon icon-left\" aria-label=\"Previous year\" (click)=\"prevYear()\"></button></div><div class=\"headeryeartxt\"><input type=\"text\" *ngIf=\"editYear\" class=\"yearinput\" maxlength=\"4\" inputFocus [value]=\"visibleMonth.year\" (keyup)=\"userYearInput($event)\" (click)=\"$event.stopPropagation()\" [ngClass]=\"{'invalidyear': invalidYear}\"> <button class=\"headerlabelbtn\" type=\"button\" [ngClass]=\"{'yearlabel': opts.editableMonthAndYear}\" *ngIf=\"!editYear\" (click)=\"opts.editableMonthAndYear&&editYearClicked($event)\" tabindex=\"{{opts.editableMonthAndYear?'0':'-1'}}\">{{visibleMonth.year}}</button></div><div class=\"headerbtncell\"><button type=\"button\" class=\"headerbtn icon icon-right\" aria-label=\"Next year\" (click)=\"nextYear()\"></button></div></div></td></tr></table><table class=\"caltable\"><thead><tr><th class=\"weekdaytitle\" scope=\"col\" *ngFor=\"let d of weekDays\">{{d}}</th></tr></thead><tbody><tr *ngFor=\"let w of dates\"><td class=\"daycell\" *ngFor=\"let d of w\" [ngClass]=\"{'currmonth':d.cmo===CURR_MONTH&&!d.disabled, 'range': isInRange(d), 'disabled': d.disabled}\" (click)=\"!d.disabled && cellClicked(d);$event.stopPropagation()\" (keydown)=\"cellKeyDown($event, d)\" tabindex=\"0\"><div style=\"background-color:inherit\" [ngClass]=\"{'prevmonth':d.cmo===PREV_MONTH, 'selectedday':beginDate.day===d.dateObj.day&&beginDate.month===d.dateObj.month&&beginDate.year===d.dateObj.year||endDate.day===d.dateObj.day&&endDate.month===d.dateObj.month&&endDate.year===d.dateObj.year, 'currmonth':d.cmo===CURR_MONTH, 'nextmonth':d.cmo===NEXT_MONTH, 'selecteddaygreen':beginDate.day===d.dateObj.day&&beginDate.month===d.dateObj.month&&beginDate.year===d.dateObj.year&&isBeginDate&&isRangeSelected()||endDate.day===d.dateObj.day&&endDate.month===d.dateObj.month&&endDate.year===d.dateObj.year&&!isBeginDate&&isRangeSelected(), 'sunday':d.dayNbr===0&&opts.sunHighlight}\"><span [ngClass]=\"{'currday':d.currDay&&opts.markCurrentDay, 'sundayDim': opts.sunHighlight && d.dayNbr === 0 && (d.cmo===PREV_MONTH || d.cmo===NEXT_MONTH || d.disabled)}\">{{d.dateObj.day}}</span></div></td></tr></tbody></table><div class=\"footerarea\"><button type=\"button\" class=\"footerbtn\" [disabled]=\"beginDate&&beginDate.year===0\" [ngClass]=\"{'btndisable':beginDate.year===0,'footerbtnenabled': beginDate.year!==0||!isBeginDate}\" (click)=\"$event.stopPropagation();isBeginDate?toEndDate():toBeginDate()\">{{isBeginDate?opts.endDateBtnTxt:opts.beginDateBtnTxt}}</button> <button type=\"button\" class=\"footerbtn\" *ngIf=\"!isBeginDate||endDate.year!==0\" [disabled]=\"endDate.year===0\" [ngClass]=\"{'btndisable':endDate.year===0, 'footerbtnenabled': endDate.year!==0}\" (click)=\"$event.stopPropagation();rangeSelected()\">{{opts.acceptBtnTxt}}</button></div></div></div>",
        providers: [my_date_range_picker_date_range_validator_service_1.DateRangeValidatorService],
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer, my_date_range_picker_date_range_validator_service_1.DateRangeValidatorService])
], MyDateRangePicker);
exports.MyDateRangePicker = MyDateRangePicker;
