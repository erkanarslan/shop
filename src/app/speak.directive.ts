import { Directive, ElementRef } from '@angular/core';

@Directive({
	selector: '[appSpeak]'
})
export class SpeakDirective {

	constructor(private elemRef : ElementRef) { }

	ngOnInit() {
		let elem = this.elemRef.nativeElement as HTMLElement;
		elem.addEventListener("mouseover", () => this.speak())
	}

	speak() : void {
		let elem = this.elemRef.nativeElement as HTMLElement;
		let text = elem.innerText + " olsa da yesek.";

		speechSynthesis.speak(new SpeechSynthesisUtterance(text));
	}

}
