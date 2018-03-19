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
  // tslint:disable-next-line:no-input-rename
  @Input('ngBrToolsMaskChars') maskChars;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (this.showPlaceholder && !this.el.nativeElement.placeholder) {
      this.el.nativeElement.placeholder = this.pattern;
    }
  }

  @HostListener('keyup', ['$event'])
  onInput(event: KeyboardEvent) {
    const input = (event.target as HTMLInputElement);
    let oldStart = input.selectionStart;
    let oldEnd = input.selectionEnd;
    // const oldInptLen = input.value.length;
    let maskChars: string[] = [];
    if (this.maskChars) {
      maskChars = maskChars.concat(this.maskChars.split(','));
    }
    const strFmt = StringFormatter.getStringFormatter(this.pattern, maskChars);
    input.value = strFmt.format(input.value);

    if (oldEnd + 1 === strFmt.getCaretPosition()) {
      oldStart += 1;
      oldEnd += 1;
    }
    input.selectionStart = oldStart;
    input.selectionEnd = oldEnd;
  }

}
