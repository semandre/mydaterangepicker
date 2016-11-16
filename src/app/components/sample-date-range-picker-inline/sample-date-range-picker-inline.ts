import {Component, OnInit} from '@angular/core';

declare var require:any;
const sampleDrpInlineTemplate: string = require('./sample-date-range-picker-inline.html');

@Component({
    selector: 'sample-date-range-picker-inline',
    template: sampleDrpInlineTemplate
})

export class SampleDateRangePickerInline implements OnInit {

    private myDateRangePickerOptionsInline = {
        clearBtnTxt: 'Clear',
        beginDateBtnTxt: 'Begin Date',
        endDateBtnTxt: 'End Date',
        acceptBtnTxt: 'OK',
        dateFormat: 'yyyy-mm-dd',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        inline: true
    };

    selectedDateRangeInline:string = '';
    selectedTextInline: string = '';
    border: string = 'none';

    dateFormats:Array<string> = new Array('yyyy-mm-dd', 'dd.mm.yyyy', 'dd/mm/yyyy', 'dd mmm yyyy');

    constructor() {
        console.log('constructor(): SampleDateRangePickerInline');
    }

    onChangeDateFormat(format:string) {
        this.myDateRangePickerOptionsInline = {
            clearBtnTxt: 'Clear',
            beginDateBtnTxt: 'Begin Date',
            endDateBtnTxt: 'End Date',
            acceptBtnTxt: 'OK',
            dateFormat: format,
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            inline: true
        };
    }

    ngOnInit() {
        console.log('onInit(): SampleDateRangePickerInline');
    }

    onDateRangeChanged(event:any) {
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
}