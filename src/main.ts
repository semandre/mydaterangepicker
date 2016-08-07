
import {bootstrap} from "@angular/platform-browser-dynamic";

// Sample app component
import {MyDateRangePickerApp} from "./sample-date-range-picker-app";

bootstrap(MyDateRangePickerApp, []).catch((error: Error) => console.error(error));