import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoggerModule, LoggerLevel } from '@angular-ru/logger';

@NgModule({
    declarations: [AppComponent],
    imports: [LoggerModule.forRoot(), BrowserModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
