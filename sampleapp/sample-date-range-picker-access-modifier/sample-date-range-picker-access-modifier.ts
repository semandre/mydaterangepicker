import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {IMyDrpOptions} from '../../src/my-date-range-picker/interfaces';

declare var require:any;
const amSampleTpl: string = require('./sample-date-range-picker-access-modifier.html');

@Component({
    selector: 'sample-date-range-picker-access-modifier',
    template: amSampleTpl
})

export class SampleDateRangePickerAccessModifier implements OnInit {

    private myDateRangePickerOptions: IMyDrpOptions = {
        dateFormat: 'dd.mm.yyyy',
        height: '34px',
        width: '250px'
    };

    private myForm: FormGroup;

    private model: string = null;   // not initial date range set
    //private model: Object = {beginDate: {year: 2018, month: 10, day: 9}, endDate: {year: 2018, month: 10, day: 19}};   // this example is initialized to specific date range

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        console.log('onInit(): SampleDateRangePickerReactiveForms');
        this.myForm = this.formBuilder.group({
            //myDateRange: [null, Validators.required]   // not initial date range set
            myDateRange: [{beginDate: {year: 2018, month: 10, day: 9}, endDate: {year: 2018, month: 10, day: 19}}, Validators.required]   // this example is initialized to specific date range
        });
    }

    onSubmitNgModel(): void {
        console.log('Value: ', this.model);
    }

    onSubmitReactiveForms(): void {
        console.log('Value: ', this.myForm.controls['myDateRange'].value, ' - Valid: ', this.myForm.controls['myDateRange'].valid,
                    ' - Dirty: ', this.myForm.controls['myDateRange'].dirty, ' - Touched: ', this.myForm.controls['myDateRange'].touched);
    }

    setDateRange(): void {
        // Set today range using the setValue function
        let date: Date = new Date();
        let year: number = date.getFullYear();
        let month: number = date.getMonth() + 1;
        let day: number = date.getDate();
        this.myForm.setValue({myDateRange: {beginDate: {year: year, month: month, day: day}, endDate: {year: year, month: month, day: day}}});
    }

    resetDateRange(): void {
        // Reset date picker to specific date range (today)
        let date: Date = new Date();
        let year: number = date.getFullYear();
        let month: number = date.getMonth() + 1;
        let day: number = date.getDate();
        this.myForm.reset({myDateRange: {beginDate: {year: year, month: month, day: day}, endDate: {year: year, month: month, day: day}}});
    }

    clearDateRange(): void {
        // Clear the date range using the setValue function
        this.myForm.setValue({myDateRange: null});
    }
}
