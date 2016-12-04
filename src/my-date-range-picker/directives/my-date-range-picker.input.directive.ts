import { Directive, ElementRef, Renderer, OnInit } from "@angular/core";

@Directive({
    selector: "[inputFocus]"
})

export class InputFocusDirective implements OnInit {
    constructor(private el: ElementRef, private renderer: Renderer) {}

    ngOnInit() {
        // Sets focus to rendered input element (month or year value)
        this.renderer.invokeElementMethod(this.el.nativeElement, "focus", []);

        // Set cursor position at the end of text
        let len = this.el.nativeElement.value.length;
        this.el.nativeElement.setSelectionRange(len, len);
    }
}