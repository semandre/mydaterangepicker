///<reference path="../../node_modules/@types/jasmine/index.d.ts"/>

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {MyDateRangePicker} from './my-date-range-picker.component';
import {InputFocusDirective} from './directives/my-date-range-picker.input.directive';

let comp: MyDateRangePicker;
let fixture: ComponentFixture<MyDateRangePicker>;
let de: DebugElement;
let el: HTMLElement;

function getDateString(date:any):string {
    return date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
}

function getElement(id:string):DebugElement {
    return de.query(By.css(id));
}

function getElements(id:string):Array<DebugElement> {
    return de.queryAll(By.css(id));
}

describe('MyDateRangePicker', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MyDateRangePicker, InputFocusDirective],
        });

        fixture = TestBed.createComponent(MyDateRangePicker);

        comp = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('.mydrp'));
        el = de.nativeElement;
    });

    it('set valid date range', () => {
        comp.selectionDayTxt = '2016-08-22 - 2016-08-23';
        fixture.detectChanges();
        let selection = getElement('.selection');
        expect(selection.nativeElement.value).toContain('2016-08-22 - 2016-08-23');
    });

    it('open/close selector', () => {
        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        let selector = getElement('.selector');
        expect(selector).toBe(null);

        btnpicker.nativeElement.click();
        fixture.detectChanges();
        selector = getElement('.selector');
        expect(selector).not.toBe(null);

        btnpicker.nativeElement.click();
        fixture.detectChanges();
        selector = getElement('.selector');
        expect(selector).toBe(null);
    });

    it('select first and last dates to date range and clear', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let selector = getElement('.selector');
        expect(selector).not.toBe(null);

        fixture.detectChanges();
        let currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);
        expect(currmonth.length).toBe(42);

        let first = currmonth[1];
        expect(first.nativeElement.textContent.trim()).toBe('1');
        expect(currmonth[30].nativeElement.textContent.trim()).toBe('30');

        fixture.detectChanges();
        first.nativeElement.click();

        fixture.detectChanges();
        let selectedday = getElement('.selectedday');
        expect(selectedday).not.toBe(null);

        fixture.detectChanges();
        let enddatebtn = getElement('.footerarea button:first-child');
        expect(enddatebtn).not.toBe(null);
        expect(enddatebtn.nativeElement.textContent.trim()).toBe('End Date');
        enddatebtn.nativeElement.click();

        fixture.detectChanges();
        currmonth = getElements('.caltable tbody tr td');
        currmonth[30].nativeElement.click();

        fixture.detectChanges();
        let selecteddaygreen = getElement('.selecteddaygreen');
        expect(selecteddaygreen).not.toBe(null);

        fixture.detectChanges();
        let range = getElements('.caltable .range');
        expect(range).not.toBe(null);
        expect(range.length).toBe(30);

        fixture.detectChanges();
        let okbtn = getElement('.footerarea button:last-child');
        expect(okbtn).not.toBe(null);
        expect(okbtn.nativeElement.textContent.trim()).toBe('Accept');
        okbtn.nativeElement.click();

        fixture.detectChanges();
        let selection = getElement('.selection');
        expect(selection.nativeElement.value).toContain('2016-11-01 - 2016-11-30');

        fixture.detectChanges();
        let btnclear = getElement('.btnclear');
        btnclear.nativeElement.click();

        fixture.detectChanges();
        selection = getElement('.selection');
        expect(selection.nativeElement.value).toEqual('');
    });

});





