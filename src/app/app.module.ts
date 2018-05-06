import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxFlexboxgridModule } from 'ngx-flexboxgrid';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxFlexboxgridModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
