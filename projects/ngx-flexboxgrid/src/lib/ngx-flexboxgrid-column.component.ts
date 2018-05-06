import {
  Component,
  Input,
  HostBinding,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { NgxFlexboxgridService } from './ngx-flexboxgrid.service';

/**
 * A flexboxgrid column component.
 */
@Component({
  selector: 'fg-col, [fgCol]',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `
})
export class NgxFlexboxgridColumnComponent implements OnInit {
  /**
   * Get a hold of whatever classes are set to the HTML element, so we don't end
   * up overwriting those classes, when binding `cols` to the `class` attribute.
   */
  // tslint:disable-next-line: no-input-rename
  @Input('class') classList = '';

  /**
   * Listen for input at 'cols' attribute and bind it to 'class'.
   */
  @Input()
  @HostBinding('class')
  set cols(cols: string) {
    if (cols) {
      const _cols = this.gridUtil.composeColumns(cols);

      this._cols = this.classList ? `${this.classList} ${_cols}` : _cols;
    }
  }
  get cols(): string {
    return this._cols || '';
  }

  private _cols: string;

  constructor(private gridUtil: NgxFlexboxgridService) {}

  ngOnInit() {
    if (this._cols === undefined) {
      throw new Error(
        'Input `cols` declaration is missing. You must provide a definition for `cols`.'
      );
    }
  }
}
