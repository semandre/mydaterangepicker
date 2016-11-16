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

    it('select clear button', () => {
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
        let headerclearbtn = getElement('.headerclearbtn');
        expect(headerclearbtn).not.toBe(null);
        expect(headerclearbtn.properties['disabled']).toBe(false);
        headerclearbtn.nativeElement.click();

        fixture.detectChanges();
        selectedday = getElement('.selectedday');
        expect(selectedday).toBe(null);

        selecteddaygreen = getElement('.selecteddaygreen');
        expect(selecteddaygreen).toBe(null);

        range = getElements('.caltable .range');
        expect(range.length).toBe(0);


        headerclearbtn = getElement('.headerclearbtn');
        expect(headerclearbtn.properties['disabled']).toBe(true);
    });

    it('select previous month', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Nov');

        fixture.detectChanges();
        let prevmonth = getElement('.header tr td:first-child .headerbtn:first-child');
        expect(prevmonth).not.toBe(null);

        fixture.detectChanges();
        prevmonth.nativeElement.click();

        expect(comp.visibleMonth.monthTxt).toBe('Oct');
        expect(comp.visibleMonth.monthNbr).toBe(10);
        expect(comp.visibleMonth.year).toBe(2016);

        fixture.detectChanges();
        monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Oct');
    });

    it('select next month', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Nov');

        fixture.detectChanges();
        let nextmonth = getElement('.header tr td:first-child .headerbtn:last-child');
        expect(nextmonth).not.toBe(null);

        fixture.detectChanges();
        nextmonth.nativeElement.click();

        expect(comp.visibleMonth.monthTxt).toBe('Dec');
        expect(comp.visibleMonth.monthNbr).toBe(12);
        expect(comp.visibleMonth.year).toBe(2016);

        fixture.detectChanges();
        monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Dec');
    });

    it('select previous month january change year', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 1, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Jan');

        fixture.detectChanges();
        let prevmonth = getElement('.header tr td:first-child .headerbtn:first-child');
        expect(prevmonth).not.toBe(null);

        fixture.detectChanges();
        prevmonth.nativeElement.click();

        expect(comp.visibleMonth.monthNbr).toBe(12);
        expect(comp.visibleMonth.year).toBe(2015);

        fixture.detectChanges();
        monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Dec');

        fixture.detectChanges();
        let yearlabel = getElement('.yearlabel');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent.trim()).toBe('2015');
    });

    it('select next month december change year', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 12, year: 2015};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Dec');

        fixture.detectChanges();
        let prevmonth = getElement('.header tr td:first-child .headerbtn:last-child');
        expect(prevmonth).not.toBe(null);

        fixture.detectChanges();
        prevmonth.nativeElement.click();

        expect(comp.visibleMonth.monthNbr).toBe(1);
        expect(comp.visibleMonth.year).toBe(2016);

        fixture.detectChanges();
        monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Jan');

        fixture.detectChanges();
        let yearlabel = getElement('.yearlabel');
        expect(yearlabel).not.toBe(null);
        expect(yearlabel.nativeElement.textContent.trim()).toBe('2016');
    });

    it('select previous and next month from selector', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Nov');

        fixture.detectChanges();
        let currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);
        expect(currmonth.length).toBe(42);

        fixture.detectChanges();
        currmonth[0].nativeElement.click();

        expect(comp.visibleMonth.monthNbr).toBe(11);
        expect(comp.visibleMonth.monthTxt).toBe('Nov');

        fixture.detectChanges();
        monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Nov');

        fixture.detectChanges();
        currmonth[41].nativeElement.click();

        expect(comp.visibleMonth.monthNbr).toBe(11);
        expect(comp.visibleMonth.monthTxt).toBe('Nov');

        fixture.detectChanges();
        monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent.trim()).toBe('Nov');
    });

    it('select previous year', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let prevyear = getElement('.header tr td:last-child .headerbtn:first-child');
        expect(prevyear).not.toBe(null);

        fixture.detectChanges();
        prevyear.nativeElement.click();

        expect(comp.visibleMonth.monthNbr).toBe(5);
        expect(comp.visibleMonth.monthTxt).toBe('May');
        expect(comp.visibleMonth.year).toBe(2015);

        fixture.detectChanges();
        let yearLabel = getElement('.yearlabel');
        expect(yearLabel).not.toBe(null);
        expect(yearLabel.nativeElement.textContent).toBe('2015');

        fixture.detectChanges();
        let monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent).toBe('May');
    });

    it('select next year', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 5, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let prevyear = getElement('.header tr td:last-child .headerbtn:last-child');
        expect(prevyear).not.toBe(null);

        fixture.detectChanges();
        prevyear.nativeElement.click();

        expect(comp.visibleMonth.monthNbr).toBe(5);
        expect(comp.visibleMonth.monthTxt).toBe('May');
        expect(comp.visibleMonth.year).toBe(2017);

        fixture.detectChanges();
        let yearLabel = getElement('.yearlabel');
        expect(yearLabel).not.toBe(null);
        expect(yearLabel.nativeElement.textContent).toBe('2017');

        fixture.detectChanges();
        let monthlabel = getElement('.monthlabel');
        expect(monthlabel).not.toBe(null);
        expect(monthlabel.nativeElement.textContent).toBe('May');
    });

    it('select end date, begin date and ok buttons', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let selector = getElement('.selector');
        expect(selector).not.toBe(null);

        fixture.detectChanges();
        let enddatebtn = getElement('.footerarea button:first-child');
        expect(enddatebtn).not.toBe(null);
        expect(enddatebtn.nativeElement.textContent.trim()).toBe('End Date');
        expect(enddatebtn.properties['disabled']).toBe(true);

        fixture.detectChanges();
        let currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);

        fixture.detectChanges();
        currmonth[1].nativeElement.click();

        fixture.detectChanges();
        enddatebtn = getElement('.footerarea button:first-child');
        expect(enddatebtn).not.toBe(null);
        expect(enddatebtn.properties['disabled']).toBe(false);

        // Click to end date button
        fixture.detectChanges();
        enddatebtn.nativeElement.click();

        fixture.detectChanges();
        let disabled = getElements('.disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(1);

        fixture.detectChanges();
        let begindatebtn = getElement('.footerarea button:first-child');
        expect(begindatebtn).not.toBe(null);
        expect(begindatebtn.nativeElement.textContent.trim()).toBe('Begin Date');

        fixture.detectChanges();
        let okbtn = getElement('.footerarea button:last-child');
        expect(okbtn).not.toBe(null);
        expect(okbtn.nativeElement.textContent.trim()).toBe('Accept');
        expect(okbtn.properties['disabled']).toBe(true);

        // Click to begin date button
        fixture.detectChanges();
        begindatebtn = getElement('.footerarea button:first-child');
        begindatebtn.nativeElement.click();

        fixture.detectChanges();
        disabled = getElements('.disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(0);

        fixture.detectChanges();
        let selectedday = getElement('.selectedday');
        expect(selectedday).not.toBe(null);

        // Click to end date button
        fixture.detectChanges();
        enddatebtn = getElement('.footerarea button:first-child');
        enddatebtn.nativeElement.click();

        fixture.detectChanges();
        currmonth = getElements('.caltable tbody tr td');
        currmonth[30].nativeElement.click();

        fixture.detectChanges();
        okbtn = getElement('.footerarea button:last-child');
        expect(okbtn).not.toBe(null);
        expect(okbtn.properties['disabled']).toBe(false);

        // Click to begin date button
        fixture.detectChanges();
        begindatebtn = getElement('.footerarea button:first-child');
        expect(begindatebtn).not.toBe(null);
        begindatebtn.nativeElement.click();

        fixture.detectChanges();
        disabled = getElements('.disabled');
        expect(disabled).not.toBe(null);
        expect(disabled.length).toBe(11);

        // Click to end date button
        fixture.detectChanges();
        enddatebtn = getElement('.footerarea button:first-child');
        enddatebtn.nativeElement.click();

        // Click to ok button
        fixture.detectChanges();
        okbtn = getElement('.footerarea button:last-child');
        okbtn.nativeElement.click();

        fixture.detectChanges();
        let selection = getElement('.selection');
        expect(selection.nativeElement.value).toContain('2016-11-01 - 2016-11-30');
    });

    it('popup title text', () => {
        comp.selectedMonth = {monthTxt: '', monthNbr: 11, year: 2016};

        comp.parseOptions();

        fixture.detectChanges();
        let btnpicker = getElement('.btnpicker');
        btnpicker.nativeElement.click();

        fixture.detectChanges();
        let selector = getElement('.selector');
        expect(selector).not.toBe(null);

        fixture.detectChanges();
        let titleareatxt = getElement('.titleareatxt');
        expect(titleareatxt).not.toBe(null);
        expect(titleareatxt.nativeElement.textContent).toBe('Select Begin Date');

        fixture.detectChanges();
        let currmonth = getElements('.caltable tbody tr td');
        expect(currmonth).not.toBe(null);

        fixture.detectChanges();
        currmonth[1].nativeElement.click();

        fixture.detectChanges();
        let enddatebtn = getElement('.footerarea button:first-child');
        expect(enddatebtn).not.toBe(null);

        fixture.detectChanges();
        enddatebtn.nativeElement.click();

        fixture.detectChanges();
        titleareatxt = getElement('.titleareatxt');
        expect(titleareatxt).not.toBe(null);
        expect(titleareatxt.nativeElement.textContent).toBe('Select End Date');

        fixture.detectChanges();
        let begindatebtn = getElement('.footerarea button:first-child');
        expect(begindatebtn).not.toBe(null);

        fixture.detectChanges();
        begindatebtn.nativeElement.click();

        fixture.detectChanges();
        titleareatxt = getElement('.titleareatxt');
        expect(titleareatxt).not.toBe(null);
        expect(titleareatxt.nativeElement.textContent).toBe('Select Begin Date');
    });

    // options



});





