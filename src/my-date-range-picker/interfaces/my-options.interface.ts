import { IMyDayLabels } from "./my-day-labels.interface";
import { IMyMonthLabels } from "./my-month-labels.interface";

export interface IMyOptions {
    dayLabels?: IMyDayLabels;
    monthLabels?: IMyMonthLabels;
    dateFormat?: string;
    showClearBtn?: boolean;
    clearBtnTxt?: string;
    beginDateBtnTxt?: string;
    endDateBtnTxt?: string;
    acceptBtnTxt?: string;
    selectBeginDateTxt?: string;
    selectEndDateTxt?: string;
    firstDayOfWeek?: string;
    sunHighlight?: boolean;
    markCurrentDay?: boolean;
    height?: string;
    width?: string;
    inline: boolean;
    selectionTxtFontSize?: string;
    alignSelectorRight?: boolean;
    indicateInvalidDateRange?: boolean;
    showDateRangeFormatPlaceholder?: boolean;
    editableDateRangeField?: boolean;
    editableMonthAndYear?: boolean;
    minYear?: number;
    maxYear?: number;
    componentDisabled?: boolean;
}
