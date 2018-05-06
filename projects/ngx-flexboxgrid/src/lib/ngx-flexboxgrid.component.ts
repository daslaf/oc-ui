import {
  Component,
  Directive,
  HostBinding,
  Self,
  ViewEncapsulation
} from '@angular/core';

/**
 * A flexboxgrid container.
 */
@Component({
  selector: 'fg-grid, [fgGrid]',
  encapsulation: ViewEncapsulation.None,
  styles: [` .container { display: block } `],
  template: `
    <ng-content></ng-content>
  `
})
export class NgxFlexboxgridComponent {
  @HostBinding('class.container') default = true;
}

/**
 * Converts a flexboxgrid container into a fuild container.
 */
@Directive({
  selector: 'fg-grid[fgFluid], [fgGrid][fgFluid]'
})
export class NgxFlexboxgridFluidDirective {
  @HostBinding('class.container-fluid') default = true;

  constructor(@Self() private grid: NgxFlexboxgridComponent) {
    grid.default = false;
  }
}
