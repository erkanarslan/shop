import { Directive, ElementRef, Input, EventEmitter, Output } from '@angular/core';

@Directive({
	selector: '[appAutoHide]'
})
export class AutoHideDirective {

	@Input()
	set showWhen(value : boolean) {
		let elem = this.elemRef.nativeElement as HTMLElement;
		if(value) {
			elem.style.display = "block";
			setTimeout(() => {
				elem.style.display = "none";
				this.showWhenChange.emit(false);
			}, 3000);
		}
		else {
			elem.style.display = "none";
		}
	}

	@Output()
	showWhenChange = new EventEmitter<boolean>();

	constructor(private elemRef : ElementRef) { }

	ngOnInit() : void {
		let elem = this.elemRef.nativeElement as HTMLElement;
		elem.style.display = "none";
	}

}
