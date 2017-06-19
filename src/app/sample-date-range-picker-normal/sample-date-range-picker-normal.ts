import {Component, OnInit} from '@angular/core';
import {IMyOptions, IMyDateRangeModel, IMyInputFieldChanged, IMyDateSelected, IMyInputFocusBlur, IMyCalendarViewChanged} from 'mydaterangepicker';

@Component({
    selector: 'sample-date-range-picker-normal',
    templateUrl: 'sample-date-range-picker-normal.html',
    moduleId: module.id,
})

export class SampleDateRangePickerNormal implements OnInit {

    myDateRangePickerOptionsNormal: IMyOptions = {
        dateFormat: 'dd mmm yyyy',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '250px',
        inline: false,
        minYear: 1900,
        maxYear: 2200,
        selectionTxtFontSize: '13px',
        alignSelectorRight: false,
        showWeekNumbers: false,
        openSelectorOnInputClick: false,
        showSelectDateText: true
    };

    selectedDateRangeNormal:string = '';

    selectedTextNormal: string = '';
    border: string = 'none';

    placeholderTxt: string = 'Select a date range';

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
        copy.openSelectorOnInputClick = !checked;
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

    onShowWeekNumbers(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.showWeekNumbers = checked;
        this.myDateRangePickerOptionsNormal = copy;
    }

    onShowSelectDateText(checked: boolean) {
        let copy = this.getCopyOfOptions();
        copy.showSelectDateText = checked;
        this.myDateRangePickerOptionsNormal = copy;
    }

    onDateRangeChanged(event: IMyDateRangeModel) {
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

    onInputFieldChanged(event: IMyInputFieldChanged) {
        console.log('onInputFieldChanged(): Value: ', event.value, ' - dateRangeFormat: ', event.dateRangeFormat, ' - valid: ', event.valid);
    }

    onCalendarViewChanged(event: IMyCalendarViewChanged) {
      console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
    }

    onDateSelected(event: IMyDateSelected) {
        console.log('onDateSelected(): Value: ', event);
    }

    onInputFocusBlur(event: IMyInputFocusBlur) {
        console.log('onInputFocusBlur(): Reason: ', event. reason, ' - Value: ', event.value);
    }

    getCopyOfOptions(): IMyOptions {
        return JSON.parse(JSON.stringify(this.myDateRangePickerOptionsNormal));
    }
}
