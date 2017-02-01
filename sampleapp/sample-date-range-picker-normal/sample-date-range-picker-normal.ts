import {Component, OnInit} from '@angular/core';
import {IMyOptions, IMyDateRangeModel, IMyDateRange, IMyInputFieldChanged, IMyCalendarViewChanged} from '../../src/my-date-range-picker/interfaces';

declare var require:any;
const sampleDrpNormalTemplate: string = require('./sample-date-range-picker-normal.html');

@Component({
    selector: 'sample-date-range-picker-normal',
    template: sampleDrpNormalTemplate
})

export class SampleDateRangePickerNormal implements OnInit {

    private myDateRangePickerOptionsNormal: IMyOptions = {
        clearBtnTxt: 'Clear',
        beginDateBtnTxt: 'Begin Date',
        endDateBtnTxt: 'End Date',
        acceptBtnTxt: 'Apply',
        dateFormat: 'dd mmm yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '250px',
        inline: false,
        selectionTxtFontSize: '13px',
        alignSelectorRight: false,
        indicateInvalidDateRange: true,
        minYear: 2000,
        maxYear: 2099,
        componentDisabled: false,
        showClearDateRangeBtn: true,
        showSelectorArrow: true
    };

    //selectedDateRangeNormal:string = '04 Nov 2016 - 26 Nov 2016';
    selectedDateRangeNormal:IMyDateRange = {beginDate: {year: 2018, month: 10, day: 9}, endDate: {year: 2018, month: 10, day: 19}};

    selectedTextNormal: string = '';
    border: string = 'none';

    placeholderTxt: string = '';

    constructor() {
        console.log('constructor(): SampleDateRangePickerNormal');
    }

    clearDateRange() {
        this.selectedDateRangeNormal = null;
    }

    onDisableComponent(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.componentDisabled = checked;
        this.myDateRangePickerOptionsNormal = copy;
    }

    onEditableDateField(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.editableDateRangeField = checked;
        this.myDateRangePickerOptionsNormal = copy;
    }

    onAlignSelectorRight(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.alignSelectorRight = checked;
        this.myDateRangePickerOptionsNormal = copy;
    }

    onShowClearButton(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.showClearDateRangeBtn = checked;
        this.myDateRangePickerOptionsNormal = copy;
    }

    onShowPlaceholderText(checked: boolean) {
        this.placeholderTxt = checked ? 'Select a date range' : '';
    }

    ngOnInit() {
        console.log('onInit(): SampleDateRangePickerNormal');
    }

    onDateRangeChanged(event: IMyDateRangeModel) {
        console.log('onDateRangeChanged(): Begin: ', event.beginDate, ' End: ', event.endDate, ' - formatted: ', event.formatted, ' - beginEpoc timestamp: ', event.beginEpoc, ' - endEpoc timestamp: ', event.endEpoc);
        if(event.formatted !== '') {
            this.selectedTextNormal = 'Formatted: ' + event.formatted;
            this.border = '1px solid #CCC';

            this.selectedDateRangeNormal = {beginDate: event.beginDate, endDate: event.endDate};
        }
        else {
            this.selectedTextNormal = '';
            this.border = 'none';
        }
    }

    onInputFieldChanged(event: IMyInputFieldChanged) {
        console.log('onInputFieldChanged(): Value: ', event.value, ' - dateRangeFormat: ', event.dateRangeFormat, ' - valid: ', event.valid);
    }

    onCalendarViewChanged(event: IMyCalendarViewChanged) {
        console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
    }

    getCopyOfOptions(): IMyOptions {
        return JSON.parse(JSON.stringify(this.myDateRangePickerOptionsNormal));
    }
}