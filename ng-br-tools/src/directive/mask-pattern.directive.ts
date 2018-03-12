import { Directive, Input, HostBinding, HostListener, OnInit, ElementRef} from '@angular/core';
import { StringFormatter } from '../locallib/string-formatter.class';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngBrToolsMaskPattern]'
})
export class MaskPatternDirective implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('ngBrToolsMaskPattern') pattern;
  // tslint:disable-next-line:no-input-rename
  @Input('ngBrToolsShowPlacholder') showPlaceholder = true;
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
