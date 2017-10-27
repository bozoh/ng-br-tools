import { Directive, Input, HostBinding, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[mask-pattern]'
})
export class MaskPatternDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('mask-pattern') pattern = '';


  constructor() { }

  @HostListener('keyup', ['$event']) onkeyup(e) {
    let newValue = '';
    const input = e.target;
    if (input.value.length <= this.pattern.length) {
      for (let i = 0; i < input.value.length; i++) {
        if (this.pattern.charAt(i) === '#') {
          newValue += input.value.charAt(i);
        } else {
           if (input.value.charAt(i) !== this.pattern.charAt(i)) {
             newValue += this.pattern.charAt(i);
           }
           newValue += input.value.charAt(i);
        }
      }
      console.log(newValue);
      input.value = newValue;

    } else {
      e.preventDefault();
      input.value = input.value.slice(0, -1);
      return e;
    }
  }

}
