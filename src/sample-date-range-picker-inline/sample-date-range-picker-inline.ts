import {Component, OnInit} from '@angular/core';
import {MyDateRangePicker} from '../my-date-range-picker/index';

@Component({
    selector: 'sample-date-range-picker-inline',
    directives: [MyDateRangePicker],
    template: '<div style="padding:4px;border-radius:4px;margin-bottom:8px;float:right" [ngStyle]="{border: border}">{{selectedText}}</div><my-date-range-picker [options]="myDatePickerOptions" (dateRangeChanged)="onDateRangeChanged($event)" [selDateRange]="selectedDateRange"></my-date-range-picker>'
})

export class SampleDateRangePickerInline implements OnInit {
    selectedDateRange:string = '';
    private myDatePickerOptions = {
        clearBtnTxt: 'Clear',
        beginDateBtnTxt: 'Set Begin Date',
        endDateBtnTxt: 'Set End Date',
        acceptBtnTxt: 'OK',
        dateFormat: 'yyyy-mm-dd',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        inline: true
    };
    
    selectedText: string = '';
    border: string = 'none';

    constructor() {
        console.log('constructor(): SampleDateRangePickerInline');
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