import {Component, OnInit} from '@angular/core';
import {IMyDrpOptions, IMyDateRangeModel} from '../../src/my-date-range-picker/interfaces';

declare var require:any;
const sampleDrpInlineTemplate: string = require('./sample-date-range-picker-inline.html');

@Component({
    selector: 'sample-date-range-picker-inline',
    template: sampleDrpInlineTemplate
})

export class SampleDateRangePickerInline implements OnInit {

    private myDateRangePickerOptionsInline: IMyDrpOptions = {
        dateFormat: 'yyyy-mm-dd',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        inline: true,
        markCurrentDay: true,
        selectorHeight: '232px',
        selectorWidth: '252px',
        showSelectDateText: false
    };

    selectedDateRangeInline:string = '';
    selectedTextInline: string = '';
    border: string = 'none';

    dateFormats:Array<string> = new Array('yyyy-mm-dd', 'dd.mm.yyyy', 'dd/mm/yyyy');
    selectorSizes: Array<string> = new Array('normal', 'small', 'big');

    constructor() {
        console.log('constructor(): SampleDateRangePickerInline');
    }

    onChangeDateFormat(format:string) {
        let copy = this.getCopyOfOptions();
        copy.dateFormat = format;
        this.myDateRangePickerOptionsInline = copy;
    }

    onDisablePast(checked:boolean) {
        let date = new Date();

        // Disable/enable dates from 5th backward
        date.setMonth(date.getMonth() - 1);
        let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        let copy = this.getCopyOfOptions();
        copy.disableUntil = checked ? {year: date.getFullYear(), month: date.getMonth() + 1, day: lastDayOfMonth} : {year: 0, month: 0, day: 0};
        this.myDateRangePickerOptionsInline = copy;
    }

    onDisableFuture(checked:boolean) {
        let date = new Date();

        // Disable/enable dates from 5th forward
        date.setMonth(date.getMonth() + 1);

        let copy = this.getCopyOfOptions();
        copy.disableSince = checked ? {year: date.getFullYear(), month: date.getMonth() + 1, day: 1} : {year: 0, month: 0, day: 0};
        this.myDateRangePickerOptionsInline = copy;
    }

    onSelectorSize(size:string) {
        let copy = this.getCopyOfOptions();
        if (size === 'normal') {
            copy.selectorHeight = '232px';
            copy.selectorWidth = '252px';
            this.myDateRangePickerOptionsInline = copy;
        }
        else if (size === 'small') {
            copy.selectorHeight = '200px';
            copy.selectorWidth = '220px';
            this.myDateRangePickerOptionsInline = copy;
        }
        else {
            copy.selectorHeight = '260px';
            copy.selectorWidth = '290px';
            this.myDateRangePickerOptionsInline = copy;
        }
    }

    ngOnInit() {
        console.log('onInit(): SampleDateRangePickerInline');
    }

    onDateRangeChanged(event: IMyDateRangeModel) {
        console.log('onDateRangeChanged(): Begin: ', event.beginDate, ' End: ', event.endDate, ' - formatted: ', event.formatted, ' - beginEpoc timestamp: ', event.beginEpoc, ' - endEpoc timestamp: ', event.endEpoc);
        if(event.formatted !== '') {
            this.selectedTextInline = 'Formatted: ' + event.formatted;
            this.border = '1px solid #CCC';
        }
        else {
            this.selectedTextInline = '';
            this.border = 'none';
        }
    }

    getCopyOfOptions(): IMyDrpOptions {
        return JSON.parse(JSON.stringify(this.myDateRangePickerOptionsInline));
    }
}