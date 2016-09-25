import { IMyDateRange } from '../interfaces/my-date-range.interface';
export declare class DateRangeValidatorService {
    isDateRangeValid(daterange: string, dateFormat: string): IMyDateRange;
    private isDateValid(date, separator, dpos, mpos, ypos);
    private getTimeInMilliseconds(date);
}
