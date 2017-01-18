import { IMyDate } from "./my-date.interface";

export interface IMyDateRangeModel {
    beginDate: IMyDate;
    endDate: IMyDate;
    formatted: string;
    beginEpoc: number;
    endEpoc: number;
}

