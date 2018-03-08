import { Directive, Input, HostBinding, HostListener, OnInit, ElementRef} from '@angular/core';
import { StringFormatter } from '../locallib/string-formatter.class';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ng-br-tools-mask-pattern]'
})
export class MaskPatternDirective implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('ng-br-tools-mask-pattern') pattern;
  // tslint:disable-next-line:no-input-rename
  @Input('ng-br-tools-show-placeholder') showPlaceholder = true;
  private patternStr: string[] = [];
  private patternArr: string[] = [];

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (this.showPlaceholder && !this.el.nativeElement.placeholder) {
      this.el.nativeElement.placeholder = this.pattern;
    }
  }


  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent) {
    const input = (event.target as HTMLInputElement);
    input.value = StringFormatter.maskedFormatter(input.value, this.pattern);
  }
}
