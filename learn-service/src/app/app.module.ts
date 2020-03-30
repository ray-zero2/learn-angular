import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrefViewComponent } from './pref-view/pref-view.component';
import { CityViewComponent } from './city-view/city-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PrefViewComponent,
    CityViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
