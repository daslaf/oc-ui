# ngx-flexboxgrid

An Angular(v6+) wrapper for [flexboxgrid](https://github.com/kristoferjoseph/flexboxgrid) by [@dam](https://twitter.com/dam) because why not!

Have you noticed that working with `CSS` column grids can get really verbose real quickly? Nobody likes super poluted templates where you can't even tell how many classes an `HTML` tag has. 

#### `ngx-flexboxgrid` to the rescue!!!

`ngx-flexboxgrid` lets you create 12-column grid layouts with a really concise API so your templates feel clean and more readable. You have to get it first so, let's go to the installation.


## Installation

To use `ngx-flexboxgrid` in your project you need to install `flexboxgrid` and `ngx-flexboxgrid` via [npm](https://www.npmjs.com/package/ngx-flexboxgrid):

```bash
$ npm install --save flexboxgrid ngx-flexboxgrid
```

Once you've installed both packages, you need to import `flexboxgrid.css` into you project. If you're using the Angular CLI you can add `flexboxgrid.css` in `angular.json` under the `styles` property:

```JSONWitchComments
{
  // ...
  "projects": {
    "yourprojectname": {
      // ...
      "architect": {
        "build": {
          // ...
          "options": {
            // ...
            "styles": [
              "node_modules/flexboxgrid/dist/flexboxgrid.css", 
              "src/styles.css", // your default styles
            ]
          }
        }
      }
    }
  }
}
```

Once you're done with that, import `NgxFlexboxgridModule` into you `AppModule` and you're good to go:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxFlexboxgridModule } from 'ngx-flexboxgrid';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [ AppComponent ],
  imports: [ BrowserModule, NgxFlexboxgridModule ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```

## Usage

`ngx-flexboxgrid` has three (3) main components: `NgxFlexboxgridComponent`, `NgxFlexboxgridRowComponent` and `NgxFlexboxgridColumnComponent`. All of these components have both element selectors and attribute selectors, in case you want to apply them standalone or on top of another component.

```typescript
@Component({
  selector: 'fg-grid, [fgGrid]',
  // ...
})
export class NgxFlexboxgridComponent { /* ... */}

@Component({
  selector: 'fg-row, [fgRow]',
  // ...
})
export class NgxFlexboxgridRowComponent { /* ... */}


@Component({
  selector: 'fg-col, [fgCol]',
  // ...
})
export class NgxFlexboxgridColumnComponent { /* ... */}
``` 

So you usually would wrap columns in rows, and rows into a container. This is the basic shape of a `ngx-flexboxgrid` column grid:

```html
<fg-grid>
  <fg-row>
    <fg-col cols="6,3,4,2">Column 1</fg-col>
    <fg-col cols="6,3,4,2">Column 2</fg-col>
    <fg-col cols="6,3,4,2">Column 3</fg-col>
  </fg-row>
</fg-grid>
```

We'll discuss the API for each component right now. Let's start with `fg-col`.

### NgxFlexboxgridColumnComponent

`<fg-col>` takes a single input `cols`, which expects a string of one (1) to four (4) comma separated values:

```typescript
@Component({
  selector: 'custom-component',
  template: `
    <fg-grid>
      <fg-row>
        <fg-col cols="6,3,4,2">Column 1</fg-col>
        <fg-col [cols]="'6,3,4,2'">Column 2</fg-col>
        <fg-col [cols]="cols">Column 3</fg-col>
      </fg-row>
    </fg-grid>
  `
})
export class CustomComponent {
  cols: string = '6,3,4,2';
}
```

Each value in the string passed to `cols` maps to one of the four (4) breakpoints available for media queries (`xs`, `sm`, `md` and `lg`) in `flexboxgrid`, and they basically describe the width of the column for that breakpoint. So our input `cols="6,3,4,2"` will be reduced into a single string:

```
Values in `cols`
---6---3---4---2---

Mapped through each breakpoint
---xs--sm--md--lg--

Will be reduced into the following string
"col-xs-6 col-sm-3 col-md-4 col-lg-2"
```

And that value will be binded to the class property on the root `fg-col` element:

```html
<!-- Angular will output -->
<fg-col class="col-xs-6 col-sm-3 col-md-4 col-lg-2">Column 1</fg-col>
```

You can pass values from `1` to `12` for each breakpoint. 

#### Skipping values

If you want to skip a column for a given breakpoint, you can pass the `*` token and that breakpoint will be ignored. For instance, if you only need a `col-sm-4` and `col-lg-3` (notice we're skipping the `xs` and `md` breakpoints) your `cols` input should look like this:

```html
<fg-col cols="*,4,*,3">Column 1</fg-col>
```

Which wil translate into: 

```html
<!-- Angular will output -->
<fg-col class="col-sm-4 col-lg-3">Column 1</fg-col>
```

With our new knowledge of skipping columns, lets say we only need a column for the `xs` breakpoint, that means we would have to skip the `sm`, `md` and `lg` breakpoints with the `*` token (or maybe not):

```html
<!-- This two declarations will output the same HTML -->
<fg-col cols="6,*,*,*">Column 1</fg-col>
<fg-col cols="6">Column 2</fg-col>

<!-- Angular will output -->
<fg-col class="col-xs-6">Column 1</fg-col>
<fg-col class="col-xs-6">Column 2</fg-col>
```

Although both declarations output the same `HTML`, the second one is cheaper since we don't actually have to check the values for any of the breakpoints but `xs`. So, as a rule of thumb, only declare the columns you actually need.

#### Auto width columns

`flexboxgrid` also provides support for auto sizing columns, which means the column will take as much space as possible depending on its siblings and/or available remaining space. If you want auto sizing on a column, just pass the `auto` token to the specific breakpoint:

```html
<!-- Using `auto` in the `xs` and `lg` breakpoints -->
<fg-col cols="auto,4,3,auto">Column 1</fg-col>

<!-- Angular will output (notice there's no number in the `xs` and `lg` css classes) -->
<fg-col class="col-xs col-sm-4 col-md col-lg">Column 1</fg-col>
```

That will make the column to have auto width for the `xs` and `lg` breakpoints.

#### Offsets

In order to offset a column, you have to pass the `offset` and `width` values separated with a `-` to the specific breakpoint instead of only the column width. So if you want a regular `xs` column of width `9` and offset `3`:

```html
<!-- Using offset 3 and width 9 in the `xs` breakpoint and width 12 in `sm` breakpoint -->
<fg-col cols="3-9, 12">Column 1</fg-col>

<!-- Angular will output -->
<fg-col class="col-xs-offset-3 col-xs-9 col-sm-12">Column 1</fg-col>
```

And that pretty much covers the basics of the syntax for the `cols` input.

### NgxFlexboxgridRowComponent

The API for `NgxFlexboxgridRowComponent` follows the same conventions as `NgxFlexboxgridColumnComponent`. Lets discuss what are the capabilities of a row in `flexboxgrid` to begin with.

A `fg-row` is in charge of grouping a set of columns and describing three major fields of how columns will be distributed in the layout:

- Horizontal alignment (justify-ing)
- Vertical alignment
- Space distribution between columns

For implementing these capabilities, we provide three inputs for `fg-row`:

### fgJustify

To align content horizontally in `ngx-flexboxgrid` you want to pass a string of one (1) to four (4) comma separated values to `fgJustify`, each value mapping to a specific breakpoint just like with `fg-col`:

```html
<!-- Valid options are `start`, `center` and `end` -->
<fg-row stJustify="start,*,center,end">
   <!-- some columns here -->
</fg-row>

<!-- Angular will output-->
<fg-row class="row start-xs center-md end-lg">
    <!-- some columns here -->
</fg-row>
```

> Notice how we skipped the `sm` breakpoint using the `*` token.

### fgAlign

Same rules apply to aligning content vertically. For this we use `fgAlign` input:

```html
<!-- Valid options are `top`, `middle` and `bottom` -->
<fg-row stAlign="top,*,middle,bottom">
   <!-- some columns here -->
</fg-row>

<!-- Angular will output-->
<fg-row class="row top-xs middle-md bottom-lg">
    <!-- some columns here -->
</fg-row>
```

> Notice how we skipped the `sm` breakpoint using the `*` token.

### fgSpacing

For distribuiting whitespace within your columns, use `fgSpacing` input:


```html
<!-- Valid options are `around` and `betweem` -->
<fg-row stAlign="around,*,*,between">
   <!-- some columns here -->
</fg-row>

<!-- Angular will output-->
<fg-row class="row around-xs between-lg">
    <!-- some columns here -->
</fg-row>
```

> Notice how we skipped both `sm` and `md` breakpoints using the `*` token.

### fgReverse (NgxFlexboxgridRowReverseDirective)

Reverse the direction of your row using `fgReverse`:

```html
<!-- Use fgReverse -->
<fg-row fgReverse>
   <!-- some columns here -->
</fg-row>

<!-- Angular will output -->
<fg-row class="row reverse">
    <!-- some columns here -->
</fg-row>
```

> I might change `fgReverse` to be an `input` for next minor release of the package

### NgxFlexboxgridRowComponent

Last but not least, we need to contain our `fg-row`s in a container, and that's what `fg-grid` does:

```html
<!-- Wrap it in a grid container -->
<fg-grid>
  <fg-row>
    <!-- Some columns -->
  </fg-row>
  <!-- ... More rows -->
</fg-grid>

<!-- Angular will output -->
<fg-grid class="container">
  <fg-row class="row">
    <!-- Some columns -->
  </fg-row>
  <!-- ... More rows -->
</fg-grid>
```

Or even make it fluid:

```html
<!-- Wrap it in a fluid container -->
<fg-grid fgFluid>
  <fg-row>
    <!-- Some columns -->
  </fg-row>
  <!-- ... More rows -->
</fg-grid>

<!-- Angular will output -->
<fg-grid class="container-fluid">
  <fg-row class="row">
    <!-- Some columns -->
  </fg-row>
  <!-- ... More rows -->
</fg-grid>
```

> I might change `fgFluid` to be an `input` for next minor release of the package


## TODO

- [ ] Add tests
- [ ] Add validation for unexpected values passed to rows and columns
- [ ] Add support for reordering columns with `.first-` and `.last-` (might use a directive)

## Demo

Try it on [stackblitz](https://stackblitz.com/edit/ngx-flexboxgrid-demo).

