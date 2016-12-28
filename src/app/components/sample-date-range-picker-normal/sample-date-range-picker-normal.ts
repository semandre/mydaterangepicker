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
        acceptBtnTxt: 'Apply',
        dateFormat: 'dd mmm yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '250px',
        inline: false,
        selectionTxtFontSize: '13px',
        alignSelectorRight: false
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

    onDisableComponent(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.componentDisabled = checked;
        this.myDateRangePickerOptionsNormal = copy;
    }

    onEditableDateRangeField(checked: boolean) {
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

    onInputFieldChanged(event:any) {
        console.log('onInputFieldChanged(): Value: ', event.value, ' - dateRangeFormat: ', event.dateRangeFormat, ' - valid: ', event.valid);
    }

    getCopyOfOptions() {
        return JSON.parse(JSON.stringify(this.myDateRangePickerOptionsNormal));
    }
}