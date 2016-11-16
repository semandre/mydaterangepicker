import { IMyDateRange } from '../interfaces/my-date-range.interface';
import { IMyMonthLabels } from '../interfaces/my-month-labels.interface';
import { IMyMonth } from '../interfaces/my-month.interface';
export declare class DateRangeValidatorService {
    isDateRangeValid(daterange: string, dateFormat: string, minYear: number, maxYear: number, monthLabels: IMyMonthLabels): IMyDateRange;
    isMonthLabelValid(monthLabel: string, monthLabels: IMyMonthLabels): number;
    isYearLabelValid(yearLabel: number, minYear: number, maxYear: number): number;
    parseDatePartNumber(dateFormat: string, dateString: string, datePart: string): number;
    parseDatePartMonthName(dateFormat: string, dateString: string, datePart: string, monthLabels: IMyMonthLabels): number;
    parseDefaultMonth(monthString: string): IMyMonth;
    private isDateValid(date, dateFormat, minYear, maxYear, monthLabels, isMonthStr);
    private getTimeInMilliseconds(date);
}
