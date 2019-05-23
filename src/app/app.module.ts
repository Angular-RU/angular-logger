import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoggerModule } from '@angular-ru/logger';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [AppComponent],
    imports: [
        LoggerModule.forRoot(
            environment.useConfig
                ? {
                      useLevelGroup: true,
                      globalLineStyle: 'color: red; text-decoration: underline; font-weight: bold; font-size: 15px'
                      // cssClassMap: {
                      //     bold: 'font-weight: bold',
                      //     'line-through': 'text-decoration: line-through',
                      //     'code-sandbox': `
                      //       color: #666;
                      //       background: #f4f4f4;
                      //       border-left: 3px solid #f36d33;
                      //       font-family: monospace;
                      //       font-size: 15px;`
                      // },
                      // labelNames: {
                      //     [LoggerLevel.TRACE]: '[trace]',
                      //     [LoggerLevel.DEBUG]: '[debug]',
                      //     [LoggerLevel.INFO]: '[info]',
                      //     [LoggerLevel.WARN]: '[warn]',
                      //     [LoggerLevel.ERROR]: '[error]'
                      // },
                      // labelColors: {
                      //     [LoggerLevel.TRACE]: 'violet',
                      //     [LoggerLevel.DEBUG]: 'black',
                      //     [LoggerLevel.INFO]: 'tomato',
                      //     [LoggerLevel.WARN]: 'green',
                      //     [LoggerLevel.ERROR]: 'cyan'
                      // }
                  }
                : {}
        ),
        BrowserModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
