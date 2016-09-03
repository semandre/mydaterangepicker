import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef} from '@angular/core';
import {NgIf, NgFor, NgClass, NgStyle} from '@angular/common';
import {IMyDate, IMyMonth, IMyWeek, IMyDayLabels, IMyMonthLabels} from './interfaces/index';

declare var require:any;
const styles: string = require('./my-date-range-picker.component.css');
const template: string = require('./my-date-range-picker.component.html');

@Component({
    selector: 'my-date-range-picker',
    styles: [styles],
    template
})

export class MyDateRangePicker implements OnChanges {
    @Input() options:any;
    @Input() selDateRange:string;
    @Output() dateRangeChanged:EventEmitter<Object> = new EventEmitter();

    showSelector: boolean = false;
    visibleMonth: IMyMonth = {monthTxt: '', monthNbr: 0, year: 0};
    weekDays: Array<string> = [];
    dates: Array<Object> = [];
    selectionDayTxt: string = '';
    dayIdx: number = 0;
    today: Date = null;

    PREV_MONTH: number = 1;
    CURR_MONTH: number = 2;
    NEXT_MONTH: number = 3;

    isBeginDate: boolean = true;
    beginDate: IMyDate = {year: 0, month: 0, day: 0};
    endDate: IMyDate = {year: 0, month: 0, day: 0};
    disableUntil: IMyDate = {year: 0, month: 0, day: 0};
    disableSince: IMyDate = {year: 0, month: 0, day: 0};

    // Default options
    dayLabels: IMyDayLabels = {su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat'};
    monthLabels: IMyMonthLabels = { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' };
    dateFormat: string = 'yyyy-mm-dd'
    clearBtnTxt: string = 'Clear';
    beginDateBtnTxt: string = 'Begin Date';
    endDateBtnTxt: string = 'End Date';
    acceptBtnTxt: string = 'Accept';
    selectBeginDateBtnTxt: string = 'Select Begin Date';
    selectEndDateBtnTxt: string = 'Select End Date';
    firstDayOfWeek: string = 'mo';
    sunHighlight: boolean = true;
    height: string = '34px';
    width: string = '262px';
    inline: boolean = false;

    constructor(public elem: ElementRef) {
        this.today = new Date();
        let doc = document.getElementsByTagName('html')[0];
        doc.addEventListener('click', (event) => {
            if (this.showSelector && event.target && this.elem.nativeElement !== event.target && !this.elem.nativeElement.contains(event.target)) {
                this.showSelector = false;
            }
        }, false);
    }

    parseOptions() {
        // the relatively ugly casts to any in this loop are needed to
        // avoid tsc errors when noImplicitAny is true.
        let optionprops = ['dayLabels', 'monthLabels', 'dateFormat', 'clearBtnTxt', 'beginDateBtnTxt', 'endDateBtnTxt', 'acceptBtnTxt', 'selectBeginDateBtnTxt', 'selectEndDateBtnTxt', 'firstDayOfWeek', 'sunHighlight', 'height', 'width', 'inline'];
        for (let i = 0; i < optionprops.length; i++) {
            let propname = optionprops[i];
            if (this.options && (<any>this.options)[propname] !== undefined) {
                (<any>this)[propname] = (<any>this.options)[propname];
            }
        }

        let days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
        this.dayIdx = days.indexOf(this.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            let idx = this.dayIdx;
            for (var i = 0; i < days.length; i++) {
                this.weekDays.push(this.dayLabels[days[idx]]);
                idx = days[idx] === 'sa' ? 0 : idx + 1;
            }
        }
        
        if(this.inline) {
            this.openBtnClicked();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.hasOwnProperty('selDateRange')) {
            this.selectionDayTxt = changes['selDateRange'].currentValue;

            let split = this.selectionDayTxt.split(' - ');
            if(split.length === 2 && split[0].length === 10 && split[1].length === 10) {
                this.beginDate = this.parseDate(split[0]);
                this.endDate = this.parseDate(split[1]);
                this.toBeginDate();
            }
        }
        else {
            this.clearBtnClicked();
        }

        if (changes.hasOwnProperty('options')) {
            this.options = changes['options'].currentValue;
            this.weekDays.length = 0;
            this.parseOptions();
        }
    }

    removeBtnClicked():void {
        this.clearBtnClicked();
        this.dateRangeChanged.emit({beginDate: {}, endDate: {}, formatted: '', beginEpoc: 0, endEpoc: 0});
    }

    openBtnClicked():void {
        this.showSelector = !this.showSelector;
        if (this.showSelector || this.inline) {
            this.isBeginDate = true;

            if(this.beginDate.year !== 0 && this.beginDate.month !== 0 && this.beginDate.day !== 0) {
                this.toBeginDate();
            }
            else {
                let y = this.today.getFullYear();
                let m = this.today.getMonth() + 1;
                this.visibleMonth = {monthTxt: this.monthLabels[m], monthNbr: m, year: y};
                this.generateCalendar(m, y);
            }
        }
    }

    prevMonth():void {
        let m = this.visibleMonth.monthNbr;
        let y = this.visibleMonth.year;
        if (m === 1) {
            m = 12;
            y--;
        }
        else {
            m--;
        }
        this.visibleMonth = {monthTxt: this.monthText(m), monthNbr: m, year: y};
        this.generateCalendar(m, y);
    }

    nextMonth():void {
        let m = this.visibleMonth.monthNbr;
        let y = this.visibleMonth.year;
        if (m === 12) {
            m = 1;
            y++;
        }
        else {
            m++;
        }
        this.visibleMonth = {monthTxt: this.monthText(m), monthNbr: m, year: y};
        this.generateCalendar(m, y);
    }

    prevYear():void {
        this.visibleMonth.year--;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year);
    }

    nextYear():void {
        this.visibleMonth.year++;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year);
    }

    clearBtnClicked():void {
        // Clear button selected
        this.isBeginDate = true;
        this.selectionDayTxt = '';
        this.beginDate = {year: 0, month: 0, day: 0};
        this.endDate = {year: 0, month: 0, day: 0};
        this.disableSince = {year: 0, month: 0, day: 0};
        this.disableUntil = {year: 0, month: 0, day: 0};
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year);
    }

    cellClicked(cell:any):void {
        // Cell clicked in the selector
        if(this.isBeginDate) {
            this.beginDate = cell.dateObj;
        }
        else {
            this.endDate = cell.dateObj;
        }
    }

    toEndDate():void {
        // To end date clicked
        this.isBeginDate = false;

        this.disableSince = {year: 0, month: 0, day: 0};
        this.disableUntil = this.getPreviousDate(this.beginDate);

        if(this.endDate.year === 0 && this.endDate.month === 0 && this.endDate.day === 0) {
            this.visibleMonth = {monthTxt: this.monthText(this.beginDate.month), monthNbr: this.beginDate.month, year: this.beginDate.year};
            this.generateCalendar(this.beginDate.month, this.beginDate.year);
        }
        else {
            this.visibleMonth = {monthTxt: this.monthText(this.endDate.month), monthNbr: this.endDate.month, year: this.endDate.year};
            this.generateCalendar(this.endDate.month, this.endDate.year);
        }
    }

    toBeginDate():void {
        // To begin date clicked
        this.isBeginDate = true;

        this.disableUntil = {year: 0, month: 0, day: 0};
        this.disableSince = this.getNextDate(this.endDate);

        this.visibleMonth = {monthTxt: this.monthText(this.beginDate.month), monthNbr: this.beginDate.month, year: this.beginDate.year};
        this.generateCalendar(this.beginDate.month, this.beginDate.year);
    }

    rangeSelected():void {
        // Accept button clicked
        let begin = this.formatDate(this.beginDate);
        let end = this.formatDate(this.endDate);

        this.selectionDayTxt = begin + ' - ' + end;

        this.showSelector = false;
        let beginEpoc = this.getTimeInMilliseconds(this.beginDate) / 1000.0;
        let endEpoc = this.getTimeInMilliseconds(this.endDate) / 1000.0;

        this.dateRangeChanged.emit({beginDate: this.beginDate, endDate: this.endDate, formatted: this.selectionDayTxt, beginEpoc: beginEpoc, endEpoc: endEpoc});
    }

    isInRange(val:any):boolean {
        // Check is input date in range between the beginDate and the endDate
        if(this.beginDate.year === 0 && this.beginDate.month === 0 && this.beginDate.day === 0 || this.endDate.year === 0 && this.endDate.month === 0 && this.endDate.day === 0) {
            return false;
        }

        let input = this.getTimeInMilliseconds(val.dateObj);
        let begin = this.getTimeInMilliseconds(this.beginDate);
        let end = this.getTimeInMilliseconds(this.endDate);

        if(input >= begin && input <= end) {
            return true;
        }
        return false;
    }

    preZero(val:string):string {
        // Prepend zero if smaller than 10
        return parseInt(val) < 10 ? '0' + val : val;
    }

    formatDate(val:any):string {
        return this.dateFormat.replace('yyyy', val.year).replace('mm', this.preZero(val.month)).replace('dd', this.preZero(val.day));
    }

    monthText(m:number):string {
        // Returns mont as a text
        return this.monthLabels[m];
    }

    monthStartIdx(y:number, m:number):number {
        // Month start index
        let d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        let idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    }

    daysInMonth(m:number, y:number):number {
        // Return number of days of current month
        return new Date(y, m, 0).getDate();
    }

    daysInPrevMonth(m:number, y:number):number {
        // Return number of days of the previous month
        if (m === 1) {
            m = 12;
            y--;
        }
        else {
            m--;
        }
        return this.daysInMonth(m, y);
    }

    isCurrDay(d:number, m:number, y:number, cmo:any):boolean {
        // Check is a given date the current date
        return d === this.today.getDate() && m === this.today.getMonth() + 1 && y === this.today.getFullYear() && cmo === 2;
    }
    
    isDisabledDay(date:IMyDate):boolean {
        // Check is a given date <= disabledUntil or given date >= disabledSince or disabled weekend
        let givenDate = this.getTimeInMilliseconds(date);
        if(this.disableUntil.year !== 0 && this.disableUntil.month !== 0 && this.disableUntil.day !== 0 && givenDate <= this.getTimeInMilliseconds(this.disableUntil)) {
            return true;
        }
        if(this.disableSince.year !== 0 && this.disableSince.month !== 0 && this.disableSince.day !== 0 && givenDate >= this.getTimeInMilliseconds(this.disableSince)) {
            return true;
        }
        return false;
    }

    getPreviousDate(date:IMyDate):IMyDate {
        // Get previous date from the given date
        let d = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        d.setDate(d.getDate() - 1);
        return {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()};
    }

    getNextDate(date:IMyDate):IMyDate {
        // Get next date from the given date
        let d = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        d.setDate(d.getDate() + 1);
        return {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()};
    }
    
    getTimeInMilliseconds(date:IMyDate):number {
        // Returns time in millisecons
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getTime();
    }

    getDayNumber(date:IMyDate):number {
        // Get day number: sun=0, mon=1, tue=2, wed=3 ...
        let d = new Date(date.year, date.month - 1 , date.day, 0, 0, 0, 0);
        return d.getDay();
    }
    
    sundayIdx():number {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    }

    generateCalendar(m:number, y:number): void {
        this.dates.length = 0;
        let monthStart = this.monthStartIdx(y, m);
        let dInThisM = this.daysInMonth(m, y);
        let dInPrevM = this.daysInPrevMonth(m, y);

        let dayNbr = 1;
        let cmo = this.PREV_MONTH;
        for (let i = 1; i < 7; i++) {
            let week: IMyWeek[] = [];
            if (i === 1) {
                // First week
                var pm = dInPrevM - monthStart + 1;
                // Previous month
                for (var j = pm; j <= dInPrevM; j++) {
                    let date: IMyDate = {year: y, month: m - 1, day: j};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(j, m, y, cmo), dayNbr: this.getDayNumber(date), disabled: this.isDisabledDay(date)});
                }
                
                cmo = this.CURR_MONTH;
                // Current month
                var daysLeft = 7 - week.length;
                for (var j = 0; j < daysLeft; j++) {
                    let date: IMyDate = {year: y, month: m, day: dayNbr};
                    week.push({dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo), dayNbr: this.getDayNumber(date), disabled: this.isDisabledDay(date)});
                    dayNbr++;
                }
            }
            else {
                // Rest of the weeks
                for (var j = 1; j < 8; j++) {
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

    parseDate(ds:string): IMyDate {
        let date:IMyDate = {day: 0, month: 0, year: 0};
        if (ds !== '') {
            let fmt = this.options && this.options.dateFormat !== undefined ? this.options.dateFormat : this.dateFormat;
            let dpos = fmt.indexOf('dd');
            if (dpos >= 0) {
                date.day = parseInt(ds.substring(dpos, dpos + 2));
            }
            let mpos = fmt.indexOf('mm');
            if (mpos >= 0) {
                date.month = parseInt(ds.substring(mpos, mpos + 2));
            }
            let ypos = fmt.indexOf('yyyy');
            if (ypos >= 0) {
                date.year = parseInt(ds.substring(ypos, ypos + 4));
            }
        }
        return date;
    }
}
