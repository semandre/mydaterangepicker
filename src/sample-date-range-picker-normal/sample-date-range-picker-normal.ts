import {Component, OnInit} from '@angular/core';
import {MyDateRangePicker} from '../my-date-range-picker/index';

@Component({
    selector: 'sample-date-range-picker-normal',
    directives: [MyDateRangePicker],
    template: '<div style="padding:4px;border-radius:4px;margin-bottom:8px;float:right" [ngStyle]="{border: border}">{{selectedText}}</div><my-date-range-picker [options]="myDatePickerOptions" (dateRangeChanged)="onDateRangeChanged($event)" [selDateRange]="selectedDateRange"></my-date-range-picker>'
})

export class SampleDateRangePickerNormal implements OnInit {
    selectedDateRange:string = '04.08.2016 - 07.08.2016';
    private myDatePickerOptions = {
        clearBtnTxt: 'Clear',
        beginDateBtnTxt: 'Begin Date',
        endDateBtnTxt: 'End Date',
        acceptBtnTxt: 'OK',
        dateFormat: 'dd.mm.yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '260px',
        inline: false
    };
    
    selectedText: string = '';
    border: string = 'none';

    constructor() {
        console.log('constructor(): SampleDateRangePickerNormal');
    }

    ngOnInit() {
        console.log('onInit(): SampleDateRangePickerNormal');
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