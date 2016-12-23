import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef, Renderer, ViewEncapsulation } from "@angular/core";
import { IMyDateRange, IMyDate, IMyMonth, IMyWeek, IMyDayLabels, IMyMonthLabels, IMyOptions } from "./interfaces/index";
import { DateRangeValidatorService } from "./services/my-date-range-picker.date.range.validator.service";

// webpack1_
declare var require: any;
const myDrpStyles: string = require("./my-date-range-picker.component.css");
const myDrpTemplate: string = require("./my-date-range-picker.component.html");
// webpack2_

@Component({
    selector: "my-date-range-picker",
    styles: [myDrpStyles],
    template: myDrpTemplate,
    providers: [DateRangeValidatorService],
    encapsulation: ViewEncapsulation.None
})

export class MyDateRangePicker implements OnChanges {
    @Input() options: any;
    @Input() defaultMonth: string;
    @Input() selDateRange: string;
    @Output() dateRangeChanged: EventEmitter<Object> = new EventEmitter();
    @Output() inputFieldChanged: EventEmitter<Object> = new EventEmitter();
    @Output() calendarViewChanged: EventEmitter<Object> = new EventEmitter();

    showSelector: boolean = false;
    visibleMonth: IMyMonth = {monthTxt: "", monthNbr: 0, year: 0};
    selectedMonth: IMyMonth = {monthTxt: "", monthNbr: 0, year: 0};
    weekDays: Array<string> = [];
    dates: Array<Object> = [];
    selectionDayTxt: string = "";
    invalidDateRange: boolean = false;
    dateRangeFormat: string = "";
    dayIdx: number = 0;
    weekDayOpts: Array<string> = ["su", "mo", "tu", "we", "th", "fr", "sa"];

    editMonth: boolean = false;
    invalidMonth: boolean = false;
    editYear: boolean = false;
    invalidYear: boolean = false;

    PREV_MONTH: number = 1;
    CURR_MONTH: number = 2;
    NEXT_MONTH: number = 3;

    MIN_YEAR: number = 1000;
    MAX_YEAR: number = 9999;

    isBeginDate: boolean = true;
    beginDate: IMyDate = {year: 0, month: 0, day: 0};
    endDate: IMyDate = {year: 0, month: 0, day: 0};
    preventBefore: IMyDate = {year: 0, month: 0, day: 0};
    preventAfter: IMyDate = {year: 0, month: 0, day: 0};
    titleAreaTextBegin: string = "";
    titleAreaTextEnd: string = "";

    // Default options
    opts: IMyOptions = {
        dayLabels: <IMyDayLabels> {su: "Sun", mo: "Mon", tu: "Tue", we: "Wed", th: "Thu", fr: "Fri", sa: "Sat"},
        monthLabels: <IMyMonthLabels> {1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"},
        dateFormat: <string> "yyyy-mm-dd",
        showClearBtn: <boolean> true,
        clearBtnTxt: <string> "Clear",
        beginDateBtnTxt: <string> "Begin Date",
        endDateBtnTxt: <string> "End Date",
        acceptBtnTxt: <string> "Accept",
        showSelectDateText: <boolean> true,
        selectBeginDateTxt: <string> "Select Begin Date",
        selectEndDateTxt: <string> "Select End Date",
        firstDayOfWeek: <string> "mo",
        sunHighlight: <boolean> true,
        markCurrentDay: <boolean> true,
        height: <string> "34px",
        width: <string> "262px",
        inline: <boolean> false,
        showClearDateRangeBtn: <boolean> true,
        selectionTxtFontSize: <string> "16px",
        alignSelectorRight: <boolean> false,
        indicateInvalidDateRange: <boolean> true,
        showDateRangeFormatPlaceholder: <boolean> false,
        customPlaceholderTxt: <string> "",
        editableDateRangeField: <boolean> true,
        editableMonthAndYear: <boolean> true,
        minYear: <number> this.MIN_YEAR,
        maxYear: <number> this.MAX_YEAR,
        disableUntil: <IMyDate> {year: 0, month: 0, day: 0},
        disableSince: <IMyDate> {year: 0, month: 0, day: 0},
        componentDisabled: <boolean> false,
        inputValueRequired: <boolean> false
    };

    constructor(public elem: ElementRef, private renderer: Renderer, private dateValidatorRangeService: DateRangeValidatorService) {
        renderer.listenGlobal("document", "click", (event: any) => {
            if (this.showSelector && event.target && this.elem.nativeElement !== event.target && !this.elem.nativeElement.contains(event.target)) {
                this.showSelector = false;
            }
            if (this.opts.editableMonthAndYear && event.target && this.elem.nativeElement.contains(event.target)) {
                this.resetMonthYearEdit();
            }
        });
    }

    resetMonthYearEdit(): void {
        this.editMonth = false;
        this.editYear = false;
        this.invalidMonth = false;
        this.invalidYear = false;
    }

    editMonthClicked(event: any): void {
        event.stopPropagation();
        if (this.opts.editableMonthAndYear) {
            this.editMonth = true;
        }
    }

    editYearClicked(event: any): void {
        event.stopPropagation();
        if (this.opts.editableMonthAndYear) {
            this.editYear = true;
        }
    }

    userDateRangeInput(event: any): void {
        this.invalidDateRange = false;
        if (event.target.value.length === 0) {
            this.clearDateRange();
        }
        else {
            let daterange: IMyDateRange = this.dateValidatorRangeService.isDateRangeValid(event.target.value, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.monthLabels);
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
            this.inputFieldChanged.emit({value: event.target.value, dateRangeFormat: this.dateRangeFormat, valid: !(event.target.value.length === 0 || this.invalidDateRange)});
        }
    }

    userMonthInput(event: any): void {
        if (event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 39) {
            return;
        }

        this.invalidMonth = false;

        let m: number = this.dateValidatorRangeService.isMonthLabelValid(event.target.value, this.opts.monthLabels);
        if (m !== -1) {
            this.editMonth = false;
            let viewChange: boolean = m !== this.visibleMonth.monthNbr;
            this.visibleMonth = {monthTxt: this.monthText(m), monthNbr: m, year: this.visibleMonth.year};
            this.generateCalendar(m, this.visibleMonth.year, viewChange);
        }
        else {
            this.invalidMonth = true;
        }
    }

    userYearInput(event: any): void {
        if (event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 39) {
            return;
        }

        this.invalidYear = false;

        let y: number = this.dateValidatorRangeService.isYearLabelValid(Number(event.target.value), this.opts.minYear, this.opts.maxYear);
        if (y !== -1) {
            this.editYear = false;
            let viewChange: boolean = y !== this.visibleMonth.year;
            this.visibleMonth = {monthTxt: this.visibleMonth.monthTxt, monthNbr: this.visibleMonth.monthNbr, year: y};
            this.generateCalendar(this.visibleMonth.monthNbr, y, viewChange);
        }
        else {
            this.invalidYear = true;
        }
    }

    parseOptions(): void {
        if (this.options !== undefined) {
            Object.keys(this.options).forEach((k) => {
                (<IMyOptions>this.opts)[k] = this.options[k];
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
            let idx: number = this.dayIdx;
            for (let i = 0; i < this.weekDayOpts.length; i++) {
                this.weekDays.push(this.opts.dayLabels[this.weekDayOpts[idx]]);
                idx = this.weekDayOpts[idx] === "sa" ? 0 : idx + 1;
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.hasOwnProperty("options")) {
            this.options = changes["options"].currentValue;
            this.weekDays.length = 0;
            this.parseOptions();
        }

        if (changes.hasOwnProperty("defaultMonth")) {
            let dm: string = changes["defaultMonth"].currentValue;
            if (dm !== null && dm !== undefined && dm !== "") {
                this.selectedMonth = this.parseSelectedMonth(dm);
            }
            else {
                this.selectedMonth = {monthTxt: "", monthNbr: 0, year: 0};
            }
        }

        if (changes.hasOwnProperty("selDateRange")) {
            let sdr: any = changes["selDateRange"];
            this.selectionDayTxt = sdr.currentValue;
            if (sdr.currentValue !== null && sdr.currentValue !== undefined && sdr.currentValue !== "") {
                let split: Array<string> = sdr.currentValue.split(" - ");
                if (split.length === 2) {
                    this.beginDate = this.parseSelectedDate(split[0]);
                    this.endDate = this.parseSelectedDate(split[1]);
                    this.titleAreaTextBegin = this.formatDate(this.beginDate);
                    this.titleAreaTextEnd = this.formatDate(this.endDate);
                    this.toBeginDate();
                }
            }
            else {
                // Do not clear on init
                if (!sdr.isFirstChange()) {
                    this.clearDateRange();
                }
            }
        }
        if (this.opts.inline) {
            this.setVisibleMonth();
        }
    }

    removeBtnClicked(): void {
        this.clearDateRange();
    }

    openBtnClicked(): void {
        this.showSelector = !this.showSelector;
        if (this.showSelector) {
            this.setVisibleMonth();
        }
    }

    setVisibleMonth(): void {
        this.isBeginDate = true;
        if (this.beginDate.year !== 0 && this.beginDate.month !== 0 && this.beginDate.day !== 0) {
            this.toBeginDate();
        }
        else {
            let y: number = 0, m: number = 0;
            if (this.selectedMonth.year === 0 && this.selectedMonth.monthNbr === 0) {
                let today: IMyDate = this.getToday();
                y = today.year;
                m = today.month;
            } else {
                y = this.selectedMonth.year;
                m = this.selectedMonth.monthNbr;
            }
            this.visibleMonth = {monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y};
            this.generateCalendar(m, y, true);
        }
    }

    clearDateRange(): void {
        this.clearBtnClicked();
        this.dateRangeChanged.emit({beginDate: {}, endDate: {}, formatted: "", beginEpoc: 0, endEpoc: 0});
        this.inputFieldChanged.emit({value: "", dateRangeFormat: this.dateRangeFormat, valid: false});
        this.invalidDateRange = false;
    }

    prevMonth(): void {
        let d: Date = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() - 1);

        let y: number = d.getFullYear();
        let m: number = d.getMonth() + 1;

        this.visibleMonth = {monthTxt: this.monthText(m), monthNbr: m, year: y};
        this.generateCalendar(m, y, true);
    }

    nextMonth(): void {
        let d: Date = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() + 1);

        let y: number = d.getFullYear();
        let m: number = d.getMonth() + 1;

        this.visibleMonth = {monthTxt: this.monthText(m), monthNbr: m, year: y};
        this.generateCalendar(m, y, true);
    }

    prevYear(): void {
        if (this.visibleMonth.year - 1 < this.opts.minYear) {
            return;
        }
        this.visibleMonth.year--;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    }

    nextYear(): void {
        if (this.visibleMonth.year + 1 > this.opts.maxYear) {
            return;
        }
        this.visibleMonth.year++;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    }

    clearBtnClicked(): void {
        // Clear button selected
        this.isBeginDate = true;
        this.selectionDayTxt = "";
        this.beginDate = {year: 0, month: 0, day: 0};
        this.endDate = {year: 0, month: 0, day: 0};
        this.titleAreaTextBegin = "";
        this.titleAreaTextEnd = "";
        this.preventAfter = {year: 0, month: 0, day: 0};
        this.preventBefore = {year: 0, month: 0, day: 0};
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, false);
    }

    cellClicked(cell: any): void {
        // Cell clicked in the selector
        if (this.isBeginDate) {
            this.beginDate = cell.dateObj;
            this.titleAreaTextBegin = this.formatDate(this.beginDate);
            this.titleAreaTextEnd = this.endDate.year === 0 ? this.opts.selectEndDateTxt : this.formatDate(this.endDate);
        }
        else {
            this.endDate = cell.dateObj;
            this.titleAreaTextEnd = this.formatDate(this.endDate);
        }
    }

    cellKeyDown(event: any, cell: any) {
        if ((event.keyCode === 13 || event.keyCode === 32) && !cell.disabled) {
            event.preventDefault();
            this.cellClicked(cell);
        }
    }

    toEndDate(): void {
        // To end date clicked
        this.isBeginDate = false;

        this.preventAfter = {year: 0, month: 0, day: 0};
        this.preventBefore = this.getPreviousDate(this.beginDate);

        if (this.endDate.year === 0 && this.endDate.month === 0 && this.endDate.day === 0) {
            this.visibleMonth = {monthTxt: this.monthText(this.beginDate.month), monthNbr: this.beginDate.month, year: this.beginDate.year};
            this.generateCalendar(this.beginDate.month, this.beginDate.year, false);
        }
        else {
            let viewChange: boolean = this.endDate.year !== this.visibleMonth.year || this.endDate.month !== this.visibleMonth.monthNbr;
            this.visibleMonth = {monthTxt: this.monthText(this.endDate.month), monthNbr: this.endDate.month, year: this.endDate.year};
            this.generateCalendar(this.endDate.month, this.endDate.year, viewChange);
        }
    }

    toBeginDate(): void {
        // To begin date clicked
        this.isBeginDate = true;

        this.preventBefore = {year: 0, month: 0, day: 0};

        if (this.endDate.year !== 0 && this.endDate.month !== 0 && this.endDate.day !== 0) {
            this.preventAfter = this.getNextDate(this.endDate);
        }

        let viewChange: boolean = this.beginDate.year !== this.visibleMonth.year || this.beginDate.month !== this.visibleMonth.monthNbr;
        this.visibleMonth = {monthTxt: this.monthText(this.beginDate.month), monthNbr: this.beginDate.month, year: this.beginDate.year};
        this.generateCalendar(this.beginDate.month, this.beginDate.year, viewChange);
    }

    titleAreaKeyDown(event: any, title: number) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            title === 1 ? this.toBeginDate() : this.toEndDate();
        }
    }

    rangeSelected(): void {
        // Accept button clicked
        let begin: string = this.formatDate(this.beginDate);
        let end: string = this.formatDate(this.endDate);

        this.selectionDayTxt = begin + " - " + end;

        this.showSelector = false;
        let bEpoc: number = this.getTimeInMilliseconds(this.beginDate) / 1000.0;
        let eEpoc: number = this.getTimeInMilliseconds(this.endDate) / 1000.0;

        this.dateRangeChanged.emit({beginDate: this.beginDate, endDate: this.endDate, formatted: this.selectionDayTxt, beginEpoc: bEpoc, endEpoc: eEpoc});
        this.inputFieldChanged.emit({value: this.selectionDayTxt, dateRangeFormat: this.dateRangeFormat, valid: true});
        this.invalidDateRange = false;
    }

    isInRange(val: any): boolean {
        // Check is input date in range between the beginDate and the endDate
        if (this.beginDate.year === 0 && this.beginDate.month === 0 && this.beginDate.day === 0 || this.endDate.year === 0 && this.endDate.month === 0 && this.endDate.day === 0) {
            return false;
        }

        let input: number = this.getTimeInMilliseconds(val.dateObj);
        let begin: number = this.getTimeInMilliseconds(this.beginDate);
        let end: number = this.getTimeInMilliseconds(this.endDate);

        if (input >= begin && input <= end) {
            return true;
        }
        return false;
    }

    isRangeSelected(): boolean {
        // Check is both beginDate and the endDate selected
        if (this.beginDate.year !== 0 && this.beginDate.month !== 0 && this.beginDate.day !== 0 && this.endDate.year !== 0 && this.endDate.month !== 0 && this.endDate.day !== 0) {
            return true;
        }
        return false;
    }

    preZero(val: string): string {
        // Prepend zero if smaller than 10
        return parseInt(val) < 10 ? "0" + val : val;
    }

    formatDate(val: any): string {
        // Returns formatted date string, if mmm is part of dateFormat returns month as a string
        let formatted: string = this.opts.dateFormat.replace("yyyy", val.year).replace("dd", this.preZero(val.day));
        return this.opts.dateFormat.indexOf("mmm") !== -1 ? formatted.replace("mmm", this.monthText(val.month)) : formatted.replace("mm", this.preZero(val.month));
    }

    monthText(m: number): string {
        // Returns month as a text
        return this.opts.monthLabels[m];
    }

    monthStartIdx(y: number, m: number): number {
        // Month start index
        let d: Date = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        let idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    }

    daysInMonth(m: number, y: number): number {
        // Return number of days of current month
        return new Date(y, m, 0).getDate();
    }

    daysInPrevMonth(m: number, y: number): number {
        let d: Date = this.getDate(y, m, 1);
        d.setMonth(d.getMonth() - 1);
        return this.daysInMonth(d.getMonth() + 1, d.getFullYear());
    }

    isCurrDay(d: number, m: number, y: number, cmo: number, today: IMyDate): boolean {
        // Check is a given date the current date
        return d === today.day && m === today.month && y === today.year && cmo === this.CURR_MONTH;
    }

    getPreviousDate(date: IMyDate): IMyDate {
        // Get previous date from the given date
        let d: Date = this.getDate(date.year, date.month, date.day);
        d.setDate(d.getDate() - 1);
        return {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()};
    }

    getNextDate(date: IMyDate): IMyDate {
        // Get next date from the given date
        let d: Date = this.getDate(date.year, date.month, date.day);
        d.setDate(d.getDate() + 1);
        return {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()};
    }

    getTimeInMilliseconds(date: IMyDate): number {
        // Returns time in milliseconds
        return this.getDate(date.year, date.month, date.day).getTime();
    }

    getDayNumber(date: IMyDate): number {
        // Get day number: sun=0, mon=1, tue=2, wed=3 ...
        let d: Date = this.getDate(date.year, date.month, date.day);
        return d.getDay();
    }

    getWeekday(date: IMyDate): string {
        // Get weekday: su, mo, tu, we ...
        return this.weekDayOpts[this.getDayNumber(date)];
    }

    getDate(year: number, month: number, day: number): Date {
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    }

    getToday(): IMyDate {
        let date: Date = new Date();
        return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
    }

    sundayIdx(): number {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    }

    generateCalendar(m: number, y: number, viewChange: boolean): void {
        this.dates.length = 0;
        let today: IMyDate = this.getToday();
        let monthStart: number = this.monthStartIdx(y, m);
        let dInThisM: number = this.daysInMonth(m, y);
        let dInPrevM: number = this.daysInPrevMonth(m, y);

        let dayNbr: number = 1;
        let cmo: number = this.PREV_MONTH;
        for (let i = 1; i < 7; i++) {
            let week: IMyWeek[] = [];
            if (i === 1) {
                // First week
                let pm: number = dInPrevM - monthStart + 1;
                // Previous month
                for (let j = pm; j <= dInPrevM; j++) {
                    let date: IMyDate = {year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: j};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(j, m, y, cmo, today), dayNbr: this.getDayNumber(date), disabled: this.dateValidatorRangeService.isDisabledDay(date, this.opts.disableUntil, this.opts.disableSince, this.preventBefore, this.preventAfter)});
                }
                cmo = this.CURR_MONTH;
                // Current month
                let daysLeft: number = 7 - week.length;
                for (let j = 0; j < daysLeft; j++) {
                    let date: IMyDate = {year: y, month: m, day: dayNbr};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today), dayNbr: this.getDayNumber(date), disabled: this.dateValidatorRangeService.isDisabledDay(date, this.opts.disableUntil, this.opts.disableSince, this.preventBefore, this.preventAfter)});
                    dayNbr++;
                }
            }
            else {
                // Rest of the weeks
                for (let j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        // Next month
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
                    let date: IMyDate = {year: y, month: m, day: dayNbr};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today), dayNbr: this.getDayNumber(date), disabled: this.dateValidatorRangeService.isDisabledDay(date, this.opts.disableUntil, this.opts.disableSince, this.preventBefore, this.preventAfter)});
                    dayNbr++;
                }
            }
            this.dates.push(week);
        }
        if (viewChange) {
            // Notify parent
            this.calendarViewChanged.emit({year: y, month: m, first: {number: 1, weekday: this.getWeekday({year: y, month: m, day: 1})}, last: {number: dInThisM, weekday: this.getWeekday({year: y, month: m, day: dInThisM})}});
        }
    }

    parseSelectedDate(ds: string): IMyDate {
        let date: IMyDate = {day: 0, month: 0, year: 0};
        if (ds !== "") {
            date.day = this.dateValidatorRangeService.parseDatePartNumber(this.opts.dateFormat, ds, "dd");

            date.month = this.opts.dateFormat.indexOf("mmm") !== -1
                ? this.dateValidatorRangeService.parseDatePartMonthName(this.opts.dateFormat, ds, "mmm", this.opts.monthLabels)
                : this.dateValidatorRangeService.parseDatePartNumber(this.opts.dateFormat, ds, "mm");

            date.year = this.dateValidatorRangeService.parseDatePartNumber(this.opts.dateFormat, ds, "yyyy");
        }
        return date;
    }

    parseSelectedMonth(ms: string): IMyMonth {
        return this.dateValidatorRangeService.parseDefaultMonth(ms);
    }
}
