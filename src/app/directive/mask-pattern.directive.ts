import { Directive, Input, HostBinding, HostListener, OnInit, ElementRef } from '@angular/core';
import { StringFormatter } from '../locallib/string-formatter.class';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[placeholder]'
  // selector: '[mask-pattern]'
})
export class MaskPatternDirective implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('placeholder') pattern = '';
  // @Input('mask-pattern') pattern = '';
  @Input() showPlaceholder = true;
  private patternStr: string[] = [];
  private patternArr: string[] = [];

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (this.showPlaceholder && !this.el.nativeElement.placeholder) {
      this.el.nativeElement.placeholder = this.pattern;
    }

  }

  @HostListener('input', ['$event'])  onkeyup(e) {
    const input = e.target;
    input.value = StringFormatter.maskedFormatter(input.value, this.pattern);
  }

}
