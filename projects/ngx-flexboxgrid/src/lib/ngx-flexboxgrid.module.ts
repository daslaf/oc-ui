import { NgModule } from '@angular/core';
import {
  NgxFlexboxgridComponent,
  NgxFlexboxgridFluidDirective
} from './ngx-flexboxgrid.component';
import { NgxFlexboxgridColumnComponent } from './ngx-flexboxgrid-column.component';
import {
  NgxFlexboxgridRowComponent,
  NgxFlexboxgridRowReverseDirective
} from './ngx-flexboxgrid-row.component';

const ELEMS = [
  NgxFlexboxgridComponent,
  NgxFlexboxgridFluidDirective,
  NgxFlexboxgridColumnComponent,
  NgxFlexboxgridRowComponent,
  NgxFlexboxgridRowReverseDirective
];

@NgModule({
  imports: [],
  declarations: ELEMS,
  exports: ELEMS
})
export class NgxFlexboxgridModule {}
