import {Component, OnInit} from '@angular/core';
import {MyDateRangePicker} from '../my-date-range-picker/index';

declare var require:any;
const template: string = require('./sample-date-range-picker-inline.html');

@Component({
    selector: 'sample-date-range-picker-inline',
    directives: [MyDateRangePicker],
    template: template
})

export class SampleDateRangePickerInline implements OnInit {
    selectedDateRange:string = '';
    private myDateRangePickerOptions = {
        clearBtnTxt: 'Clear',
        beginDateBtnTxt: 'Begin Date',
        endDateBtnTxt: 'End Date',
        acceptBtnTxt: 'OK',
        dateFormat: 'yyyy-mm-dd',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        inline: true
    };
    
    selectedText: string = '';
    border: string = 'none';

    dateFormats:Array<string> = new Array('yyyy-mm-dd', 'dd.mm.yyyy', 'dd/mm/yyyy');

    constructor() {
        console.log('constructor(): SampleDateRangePickerInline');
    }

    onChangeDateFormat(format:string) {
        this.myDateRangePickerOptions = {
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
            this.selectedText = 'Formatted: ' + event.formatted;
            this.border = '1px solid #CCC';
        }
        else {
            this.selectedText = '';
            this.border = 'none';
        }
    }
}