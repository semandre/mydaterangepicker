"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var DateRangeValidatorService = (function () {
    function DateRangeValidatorService() {
    }
    DateRangeValidatorService.prototype.isDateRangeValid = function (daterange, dateFormat) {
        var invalidDateRange = { beginDate: { day: 0, month: 0, year: 0 }, endDate: { day: 0, month: 0, year: 0 } };
        if (daterange.length !== 23) {
            return invalidDateRange;
        }
        var parts = daterange.split(' - ');
        if (parts.length !== 2) {
            return invalidDateRange;
        }
        var separator = dateFormat.replace(/[dmy]/g, '')[0];
        var dpos = dateFormat.indexOf('dd');
        var mpos = dateFormat.indexOf('mm');
        var ypos = dateFormat.indexOf('yyyy');
        var datesInMs = [];
        for (var i in parts) {
            var date = this.isDateValid(parts[i], separator, dpos, mpos, ypos);
            if (date.day === 0 && date.month === 0 && date.year === 0) {
                return invalidDateRange;
            }
            datesInMs.push(date);
        }
        if (this.getTimeInMilliseconds(datesInMs[1]) < this.getTimeInMilliseconds(datesInMs[0])) {
            return invalidDateRange;
        }
        return {
            beginDate: { day: datesInMs[0].day, month: datesInMs[0].month, year: datesInMs[0].year },
            endDate: { day: datesInMs[1].day, month: datesInMs[1].month, year: datesInMs[1].year }
        };
    };
    DateRangeValidatorService.prototype.isDateValid = function (date, separator, dpos, mpos, ypos) {
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var invalidDate = { day: 0, month: 0, year: 0 };
        if (date.length !== 10) {
            return invalidDate;
        }
        var parts = date.split(separator);
        if (parts.length !== 3) {
            return invalidDate;
        }
        if (dpos !== -1 && mpos !== -1 && ypos !== -1) {
            var day = parseInt(date.substring(dpos, dpos + 2)) || 0;
            var month = parseInt(date.substring(mpos, mpos + 2)) || 0;
            var year = parseInt(date.substring(ypos, ypos + 4)) || 0;
            if (day === 0 || month === 0 || year === 0) {
                return invalidDate;
            }
            if (year < 1000 || year > 9999 || month < 1 || month > 12) {
                return invalidDate;
            }
            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                daysInMonth[1] = 29;
            }
            if (day < 1 || day > daysInMonth[month - 1]) {
                return invalidDate;
            }
            return { day: day, month: month, year: year };
        }
        return invalidDate;
    };
    DateRangeValidatorService.prototype.getTimeInMilliseconds = function (date) {
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getTime();
    };
    DateRangeValidatorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DateRangeValidatorService);
    return DateRangeValidatorService;
}());
exports.DateRangeValidatorService = DateRangeValidatorService;
//# sourceMappingURL=my-date-range-picker.date.range.validator.service.js.map