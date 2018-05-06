import {
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

import { NgxFlexboxgridService } from './ngx-flexboxgrid.service';

/**
 * A flexboxgrid row component.
 */
@Component({
  selector: 'fg-row, [fgRow]',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '[align, justify, spacing].join(" ")'
  },
  template: `
    <ng-content></ng-content>
  `
})
export class NgxFlexboxgridRowComponent {
  @HostBinding('class.row') defaultClass = true;

  /**
   * Parses input to align flexboxgrid columns horizontally.
   */
  @Input('fgJustify')
  set justify(justify: string) {
    if (justify) {
      this._justify = this.gridUtil.composeAttrs(justify);
    }
  }
  get justify(): string {
    return this._justify;
  }

  /**
   * Parses input to align flexboxgrid columns vertically.
   */
  @Input('fgAlign')
  set align(align: string) {
    if (align) {
      this._align = this.gridUtil.composeAttrs(align);
    }
  }
  get align(): string {
    return this._align;
  }

  /**
   * Parses input to distribute horizontal whitespace between flexboxgrid columns.
   */
  @Input('fgSpacing')
  set spacing(spacing: string) {
    if (spacing) {
      this._spacing = this.gridUtil.composeAttrs(spacing);
    }
  }
  get spacing(): string {
    return this._spacing;
  }

  private _align: string;
  private _justify: string;
  private _spacing: string;

  constructor(private gridUtil: NgxFlexboxgridService) {}
}

/**
 * Reverts the direction of a flexboxgrid row component.
 */
@Directive({
  selector: 'fg-row[fgReverse], [fgRow][fgReverse]'
})
export class NgxFlexboxgridRowReverseDirective {
  @HostBinding('class.reverse') default = true;
}
