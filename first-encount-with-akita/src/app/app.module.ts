import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CounterComponentComponent } from './counter-component/counter-component.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponentComponent
  ],
  imports: [
    BrowserModule,
    environment.production ? [] : AkitaNgDevtools
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
