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

    showSelector: boolean = false;
    visibleMonth: IMyMonth = {monthTxt: "", monthNbr: 0, year: 0};
    selectedMonth: IMyMonth = {monthTxt: "", monthNbr: 0, year: 0};
    weekDays: Array<string> = [];
    dates: Array<Object> = [];
    selectionDayTxt: string = "";
    invalidDateRange: boolean = false;
    dateRangeFormat: string = "";
    dayIdx: number = 0;
    today: Date = null;

    editMonth: boolean = false;
    invalidMonth: boolean = false;
    editYear: boolean = false;
    invalidYear: boolean = false;

    PREV_MONTH: number = 1;
    CURR_MONTH: number = 2;
    NEXT_MONTH: number = 3;

    isBeginDate: boolean = true;
    beginDate: IMyDate = {year: 0, month: 0, day: 0};
    endDate: IMyDate = {year: 0, month: 0, day: 0};
    disableUntil: IMyDate = {year: 0, month: 0, day: 0};
    disableSince: IMyDate = {year: 0, month: 0, day: 0};

    // Default options
    opts: IMyOptions = {
        dayLabels: <IMyDayLabels> {su: "Sun", mo: "Mon", tu: "Tue", we: "Wed", th: "Thu", fr: "Fri", sa: "Sat"},
        monthLabels: <IMyMonthLabels> {1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"},
        dateFormat: <string> "yyyy-mm-dd",
        clearBtnTxt: <string> "Clear",
        beginDateBtnTxt: <string> "Begin Date",
        endDateBtnTxt: <string> "End Date",
        acceptBtnTxt: <string> "Accept",
        selectBeginDateTxt: <string> "Select Begin Date",
        selectEndDateTxt: <string> "Select End Date",
        firstDayOfWeek: <string> "mo",
        sunHighlight: <boolean> true,
        height: <string> "34px",
        width: <string> "262px",
        inline: <boolean> false,
        selectionTxtFontSize: <string> "16px",
        alignSelectorRight: <boolean> false,
        indicateInvalidDateRange: <boolean> true,
        showDateRangeFormatPlaceholder: <boolean> false,
        editableMonthAndYear: <boolean> true,
        minYear: <number> 1000,
        maxYear: <number> 9999,
        componentDisabled: <boolean> false
    };

    constructor(public elem: ElementRef, private renderer: Renderer, private dateValidatorRangeService: DateRangeValidatorService) {
        this.today = new Date();

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
            this.removeBtnClicked();
        }
        else {
            let daterange: IMyDateRange = this.dateValidatorRangeService.isDateRangeValid(event.target.value, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.monthLabels);
            if (daterange.beginDate.day !== 0 && daterange.beginDate.month !== 0 && daterange.beginDate.year !== 0 && daterange.endDate.day !== 0 && daterange.endDate.month !== 0 && daterange.endDate.year !== 0) {
                this.beginDate = daterange.beginDate;
                this.endDate = daterange.endDate;
                this.rangeSelected();
            }
            else {
                this.invalidDateRange = true;
            }
        }
    }

    userMonthInput(event: any): void {
        if (event.keyCode === 37 || event.keyCode === 39) {
            return;
        }

        this.invalidMonth = false;

        let m: number = this.dateValidatorRangeService.isMonthLabelValid(event.target.value, this.opts.monthLabels);
        if (m !== -1) {
            this.editMonth = false;
            this.visibleMonth = {monthTxt: this.monthText(m), monthNbr: m, year: this.visibleMonth.year};
            this.generateCalendar(m, this.visibleMonth.year);
        }
        else {
            this.invalidMonth = true;
        }
    }

    userYearInput(event: any): void {
        if (event.keyCode === 37 || event.keyCode === 39) {
            return;
        }

        this.invalidYear = false;

        let y: number = this.dateValidatorRangeService.isYearLabelValid(Number(event.target.value), this.opts.minYear, this.opts.maxYear);
        if (y !== -1) {
            this.editYear = false;
            this.visibleMonth = {monthTxt: this.visibleMonth.monthTxt, monthNbr: this.visibleMonth.monthNbr, year: y};
            this.generateCalendar(this.visibleMonth.monthNbr, y);
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

        if (this.opts.minYear < 1000) {
            this.opts.minYear = 1000;
        }
        if (this.opts.maxYear > 9999) {
            this.opts.minYear = 9999;
        }

        this.dateRangeFormat = this.opts.dateFormat + " - " + this.opts.dateFormat;

        let days: Array<string> = ["su", "mo", "tu", "we", "th", "fr", "sa"];
        this.dayIdx = days.indexOf(this.opts.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            let idx: number = this.dayIdx;
            for (let i = 0; i < days.length; i++) {
                this.weekDays.push(this.opts.dayLabels[days[idx]]);
                idx = days[idx] === "sa" ? 0 : idx + 1;
            }
        }

        if (this.opts.inline) {
            this.openBtnClicked();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.hasOwnProperty("options")) {
            this.options = changes["options"].currentValue;
            this.weekDays.length = 0;
            this.parseOptions();
        }

        if (changes.hasOwnProperty("defaultMonth")) {
            this.selectedMonth = this.parseSelectedMonth((changes["defaultMonth"].currentValue).toString());
        }

        if (changes.hasOwnProperty("selDateRange")) {
            this.selectionDayTxt = changes["selDateRange"].currentValue;
            if (this.selectionDayTxt !== "") {
                let split: Array<string> = this.selectionDayTxt.split(" - ");
                if (split.length === 2) {
                    this.beginDate = this.parseSelectedDate(split[0]);
                    this.endDate = this.parseSelectedDate(split[1]);
                    this.toBeginDate();
                }
            }
            else {
                this.removeBtnClicked();
            }
        }
    }

    removeBtnClicked(): void {
        this.clearBtnClicked();
        this.dateRangeChanged.emit({beginDate: {}, endDate: {}, formatted: "", beginEpoc: 0, endEpoc: 0});
        this.invalidDateRange = false;
    }

    openBtnClicked(): void {
        this.showSelector = !this.showSelector;
        if (this.showSelector || this.opts.inline) {
            this.isBeginDate = true;

            if (this.beginDate.year !== 0 && this.beginDate.month !== 0 && this.beginDate.day !== 0) {
                this.toBeginDate();
            }
            else {
                let y: number = 0, m: number = 0;
                if (this.selectedMonth.year === 0 && this.selectedMonth.monthNbr === 0) {
                    y = this.today.getFullYear();
                    m = this.today.getMonth() + 1;
                } else {
                    y = this.selectedMonth.year;
                    m = this.selectedMonth.monthNbr;
                }
                this.visibleMonth = {monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y};
                this.generateCalendar(m, y);
            }
        }
    }

    prevMonth(): void {
        let d: Date = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() - 1);

        let y: number = d.getFullYear();
        let m: number = d.getMonth() + 1;

        this.visibleMonth = {monthTxt: this.monthText(m), monthNbr: m, year: y};
        this.generateCalendar(m, y);
    }

    nextMonth(): void {
        let d: Date = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() + 1);

        let y: number = d.getFullYear();
        let m: number = d.getMonth() + 1;

        this.visibleMonth = {monthTxt: this.monthText(m), monthNbr: m, year: y};
        this.generateCalendar(m, y);
    }

    prevYear(): void {
        if (this.visibleMonth.year - 1 < this.opts.minYear) {
            return;
        }
        this.visibleMonth.year--;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year);
    }

    nextYear(): void {
        if (this.visibleMonth.year + 1 > this.opts.maxYear) {
            return;
        }
        this.visibleMonth.year++;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year);
    }

    clearBtnClicked(): void {
        // Clear button selected
        this.isBeginDate = true;
        this.selectionDayTxt = "";
        this.beginDate = {year: 0, month: 0, day: 0};
        this.endDate = {year: 0, month: 0, day: 0};
        this.disableSince = {year: 0, month: 0, day: 0};
        this.disableUntil = {year: 0, month: 0, day: 0};
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year);
    }

    cellClicked(cell: any): void {
        // Cell clicked in the selector
        if (this.isBeginDate) {
            this.beginDate = cell.dateObj;
        }
        else {
            this.endDate = cell.dateObj;
        }
    }

    toEndDate(): void {
        // To end date clicked
        this.isBeginDate = false;

        this.disableSince = {year: 0, month: 0, day: 0};
        this.disableUntil = this.getPreviousDate(this.beginDate);

        if (this.endDate.year === 0 && this.endDate.month === 0 && this.endDate.day === 0) {
            this.visibleMonth = {
                monthTxt: this.monthText(this.beginDate.month),
                monthNbr: this.beginDate.month,
                year: this.beginDate.year
            };
            this.generateCalendar(this.beginDate.month, this.beginDate.year);
        }
        else {
            this.visibleMonth = {
                monthTxt: this.monthText(this.endDate.month),
                monthNbr: this.endDate.month,
                year: this.endDate.year
            };
            this.generateCalendar(this.endDate.month, this.endDate.year);
        }
    }

    toBeginDate(): void {
        // To begin date clicked
        this.isBeginDate = true;

        this.disableUntil = {year: 0, month: 0, day: 0};

        if (this.endDate.year !== 0 && this.endDate.month !== 0 && this.endDate.day !== 0) {
            this.disableSince = this.getNextDate(this.endDate);
        }

        this.visibleMonth = {
            monthTxt: this.monthText(this.beginDate.month),
            monthNbr: this.beginDate.month,
            year: this.beginDate.year
        };
        this.generateCalendar(this.beginDate.month, this.beginDate.year);
    }

    rangeSelected(): void {
        // Accept button clicked
        let begin: string = this.formatDate(this.beginDate);
        let end: string = this.formatDate(this.endDate);

        this.selectionDayTxt = begin + " - " + end;

        this.showSelector = false;
        let bEpoc: number = this.getTimeInMilliseconds(this.beginDate) / 1000.0;
        let eEpoc: number = this.getTimeInMilliseconds(this.endDate) / 1000.0;

        this.dateRangeChanged.emit({
            beginDate: this.beginDate,
            endDate: this.endDate,
            formatted: this.selectionDayTxt,
            beginEpoc: bEpoc,
            endEpoc: eEpoc
        });
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

    isCurrDay(d: number, m: number, y: number, cmo: any): boolean {
        // Check is a given date the current date
        return d === this.today.getDate() && m === this.today.getMonth() + 1 && y === this.today.getFullYear() && cmo === 2;
    }

    isDisabledDay(date: IMyDate): boolean {
        // Check is a given date <= disabledUntil or given date >= disabledSince or disabled weekend
        let givenDate: number = this.getTimeInMilliseconds(date);
        if (this.disableUntil.year !== 0 && this.disableUntil.month !== 0 && this.disableUntil.day !== 0 && givenDate <= this.getTimeInMilliseconds(this.disableUntil)) {
            return true;
        }
        if (this.disableSince.year !== 0 && this.disableSince.month !== 0 && this.disableSince.day !== 0 && givenDate >= this.getTimeInMilliseconds(this.disableSince)) {
            return true;
        }
        return false;
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

    getDate(year: number, month: number, day: number): Date {
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    }

    sundayIdx(): number {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    }

    generateCalendar(m: number, y: number): void {
        this.dates.length = 0;
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
                    let date: IMyDate = {year: y, month: m - 1, day: j};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(j, m, y, cmo), dayNbr: this.getDayNumber(date), disabled: this.isDisabledDay(date)});
                }

                cmo = this.CURR_MONTH;
                // Current month
                let daysLeft: number = 7 - week.length;
                for (let j = 0; j < daysLeft; j++) {
                    let date: IMyDate = {year: y, month: m, day: dayNbr};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo), dayNbr: this.getDayNumber(date), disabled: this.isDisabledDay(date)});
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
                    }
                    let date: IMyDate = {year: y, month: cmo === this.CURR_MONTH ? m : m + 1, day: dayNbr};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo), dayNbr: this.getDayNumber(date), disabled: this.isDisabledDay(date)});
                    dayNbr++;
                }
            }
            this.dates.push(week);
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
