import { Injectable, HostBinding } from '@angular/core';
import { BreakpointMap } from './ngx-flexboxgrid.models';

/**
 * Utility service to parse `<fg-row>` and `<fg-col>` input into equivalent
 * flexboxgrid CSS classes.
 */
@Injectable({
  providedIn: 'root'
})
export class NgxFlexboxgridService {
  private breakpointMap: BreakpointMap = {
    0: 'xs',
    1: 'sm',
    2: 'md',
    3: 'lg'
  };

  /**
   * Takes a query string of comma separated values and returns a string with
   * CSS classes corresponding to the values of the initial string
   */
  composeAttrs(query: string): string {
    return this.reduceInputValue(query, this.stringReducer);
  }

  /**
   * Takes a query string of comma separated values and returns a string with
   * CSS classes corresponding to the columns of the initial string
   */
  composeColumns(query: string): string {
    return this.reduceInputValue(query, this.columnStringReducer);
  }

  /**
   * Parses current input and adds it to the accumulator.
   */
  private stringReducer(acc: string, item: string, index: number): string {
    const val = String(item);

    // If value has wildcard selector, skip it.
    return /[*]/.test(val)
      ? acc
      : `${acc} ${val.trim()}-${this.breakpointMap[index]}`;
  }

  /**
   * Parses current input and adds it to the accumulator.
   */
  private columnStringReducer(
    acc: string,
    item: string,
    index: number
  ): string {
    const tokens = item.trim().split('-');
    const offset =
      tokens.length === 2
        ? `col-${this.breakpointMap[index]}-offset-${tokens[0]}`
        : '';

    const colWidth = tokens[tokens.length - 1];
    const base = `${acc} ${offset}`.trim();

    if (colWidth.includes('auto')) {
      return `${base} col-${this.breakpointMap[index]}`;
    } else if (/[*]/.test(colWidth)) {
      return base;
    } else {
      return `${base} col-${this.breakpointMap[index]}-${colWidth}`;
    }
  }

  /**
   * Takes a list of comma separated values and a reducer and outputs a
   * transformed string.
   */
  private reduceInputValue(
    query: string,
    composer: (acc: string, item: string, index: number) => string
  ): string {
    return query
      .split(',')
      .reduce(composer.bind(this), '')
      .trim();
  }
}
