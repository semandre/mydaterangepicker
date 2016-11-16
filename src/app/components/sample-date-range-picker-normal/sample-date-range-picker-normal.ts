import {Component, OnInit} from '@angular/core';

declare var require:any;
const sampleDrpNormalTemplate: string = require('./sample-date-range-picker-normal.html');

@Component({
    selector: 'sample-date-range-picker-normal',
    template: sampleDrpNormalTemplate
})

export class SampleDateRangePickerNormal implements OnInit {

    private myDateRangePickerOptionsNormal = {
        clearBtnTxt: 'Clear',
        beginDateBtnTxt: 'Begin Date',
        endDateBtnTxt: 'End Date',
        acceptBtnTxt: 'OK',
        dateFormat: 'dd mmm yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '260px',
        inline: false,
        selectionTxtFontSize: '14px',
        alignSelectorRight: false,
    };

    selectedDateRangeNormal:string = '04 Nov 2016 - 18 Nov 2016';

    selectedTextNormal: string = '';
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
            this.selectedTextNormal = 'Formatted: ' + event.formatted;
            this.border = '1px solid #CCC';
        }
        else {
            this.selectedTextNormal = '';
            this.border = 'none';
        }
    }
}