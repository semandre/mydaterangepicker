import { Injectable } from "@angular/core";
import { IMyDateRange } from "../interfaces/my-date-range.interface";
import { IMyMonthLabels } from "../interfaces/my-month-labels.interface";
import { IMyDate } from "../interfaces/my-date.interface";
import { IMyMonth } from "../interfaces/my-month.interface";

@Injectable()
export class DateRangeValidatorService {
    public isDateRangeValid(daterange: string, dateFormat: string, minYear: number, maxYear: number, disableUntil: IMyDate, disableSince: IMyDate, monthLabels: IMyMonthLabels): IMyDateRange {
        let invalidDateRange: IMyDateRange = {
            beginDate: {day: 0, month: 0, year: 0},
            endDate: {day: 0, month: 0, year: 0}
        };
        let isMonthStr: boolean = dateFormat.indexOf("mmm") !== -1;

        if (daterange.length !== 23 && !isMonthStr || daterange.length !== 25 && isMonthStr) {
            return invalidDateRange;
        }

        let dates: Array<string> = daterange.split(" - ");
        if (dates.length !== 2) {
            return invalidDateRange;
        }

        let validDates: Array<IMyDate> = [];
        let notSetDate: IMyDate = {day: 0, month: 0, year: 0};

        for (let i in dates) {
            let date: IMyDate = this.isDateValid(dates[i], dateFormat, minYear, maxYear, monthLabels, isMonthStr);
            if (date.day === 0 && date.month === 0 && date.year === 0) {
                return invalidDateRange;
            }
            if (this.isDisabledDay(date, disableUntil, disableSince, notSetDate, notSetDate)) {
                return invalidDateRange;
            }
            validDates.push(date);
        }

        if (this.getTimeInMilliseconds(validDates[1]) < this.getTimeInMilliseconds(validDates[0])) {
            return invalidDateRange;
        }

        // Valid date range
        return {
            beginDate: {day: validDates[0].day, month: validDates[0].month, year: validDates[0].year},
            endDate: {day: validDates[1].day, month: validDates[1].month, year: validDates[1].year}
        };
    }

    public isMonthLabelValid(monthLabel: string, monthLabels: IMyMonthLabels): number {
        for (let key = 1; key <= 12; key++) {
            if (monthLabel.toLowerCase() === monthLabels[key].toLowerCase()) {
                return key;
            }
        }
        return -1;
    }

    public isYearLabelValid(yearLabel: number, minYear: number, maxYear: number): number {
        if (yearLabel >= minYear && yearLabel <= maxYear) {
            return yearLabel;
        }
        return -1;
    }

    public parseDatePartNumber(dateFormat: string, dateString: string, datePart: string): number {
        let pos: number = dateFormat.indexOf(datePart);
        if (pos !== -1) {
            let value: string = dateString.substring(pos, pos + datePart.length);
            if (!/^\d+$/.test(value)) {
                return -1;
            }
            return parseInt(value);
        }
        return -1;
    }

    public parseDatePartMonthName(dateFormat: string, dateString: string, datePart: string, monthLabels: IMyMonthLabels): number {
        let pos: number = dateFormat.indexOf(datePart);
        if (pos !== -1) {
            return this.isMonthLabelValid(dateString.substring(pos, pos + datePart.length), monthLabels);
        }
        return -1;
    }

    public parseDefaultMonth(monthString: string): IMyMonth {
        let month: IMyMonth = {monthTxt: "", monthNbr: 0, year: 0};
        if (monthString !== "") {
            let split: Array<string> = monthString.split(monthString.match(/[^0-9]/)[0]);
            month.monthNbr = split[0].length === 2 ? parseInt(split[0]) : parseInt(split[1]);
            month.year = split[0].length === 2 ? parseInt(split[1]) : parseInt(split[0]);
        }
        return month;
    }

    public isDisabledDay(date: IMyDate, disableUntil: IMyDate, disableSince: IMyDate, preventBefore: IMyDate, preventAfter: IMyDate): boolean {
        let givenDate: number = this.getTimeInMilliseconds(date);
        if (disableUntil.year !== 0 && disableUntil.month !== 0 && disableUntil.day !== 0 && givenDate <= this.getTimeInMilliseconds(disableUntil)) {
            return true;
        }
        if (disableSince.year !== 0 && disableSince.month !== 0 && disableSince.day !== 0 && givenDate >= this.getTimeInMilliseconds(disableSince)) {
            return true;
        }
        if (preventBefore.year !== 0 && preventBefore.month !== 0 && preventBefore.day !== 0 && givenDate <= this.getTimeInMilliseconds(preventBefore)) {
            return true;
        }
        if (preventAfter.year !== 0 && preventAfter.month !== 0 && preventAfter.day !== 0 && givenDate >= this.getTimeInMilliseconds(preventAfter)) {
            return true;
        }
        return false;
    }

    private isDateValid(date: string, dateFormat: string, minYear: number, maxYear: number, monthLabels: IMyMonthLabels, isMonthStr: boolean): IMyDate {
        let daysInMonth: Array<number> = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let invalidDate: IMyDate = {day: 0, month: 0, year: 0};

        if (date.length !== 10 && !isMonthStr || date.length !== 11 && isMonthStr) {
            return invalidDate;
        }

        let separator: string = dateFormat.replace(/[dmy]/g, "")[0];

        let parts: Array<string> = date.split(separator);
        if (parts.length !== 3) {
            return invalidDate;
        }

        let day: number = this.parseDatePartNumber(dateFormat, date, "dd");
        let month: number = isMonthStr ? this.parseDatePartMonthName(dateFormat, date, "mmm", monthLabels) : this.parseDatePartNumber(dateFormat, date, "mm");
        let year: number = this.parseDatePartNumber(dateFormat, date, "yyyy");

        if (day !== -1 && month !== -1 && year !== -1) {
            if (year < minYear || year > maxYear || month < 1 || month > 12) {
                return invalidDate;
            }

            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                daysInMonth[1] = 29;
            }

            if (day < 1 || day > daysInMonth[month - 1]) {
                return invalidDate;
            }

            // Valid date
            return {day: day, month: month, year: year};
        }
        return invalidDate;
    }

    private getTimeInMilliseconds(date: IMyDate): number {
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getTime();
    }
}