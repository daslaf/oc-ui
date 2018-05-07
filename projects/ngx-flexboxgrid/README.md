# ngx-flexboxgrid

An Angular(v6+) wrapper for [flexboxgrid](https://github.com/kristoferjoseph/flexboxgrid) by [@dam](https://twitter.com/dam) because why not!

Have you noticed that working with `CSS` column grids can get really verbose real quickly? Nobody likes super poluted templates where you can't even tell how many classes an `HTML` tag has. 

#### `ngx-flexboxgrid` to the rescue!!!

`ngx-flexboxgrid` lets you create 12-column grid layouts with a really concise API so your templates feel clean and more readable. You have to get it first so, let's go to the installation.


## Installation

To use `ngx-flexboxgrid` in your project you need to install `flexboxgrid` and `ngx-flexboxgrid` via [npm](https://www.npmjs.com/package/ngx-flexboxgrid):

```bash
// Get flexboxgrid and ngx-flexboxgrid
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



## Demo

Try it on [stackblitz](https://stackblitz.com/edit/ngx-flexboxgrid-demo).

