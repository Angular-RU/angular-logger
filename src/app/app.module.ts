import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoggerModule } from '@angular-ru/logger';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent],
    imports: [
        LoggerModule.forRoot({
            globalLineStyle: 'color: red',
            cssClassMap: {
                bold: 'font-weight: bold',
                'line-through': 'text-decoration: line-through',
                'code-sandbox': `
                    color: #666;
                    background: #f4f4f4;
                    border-left: 3px solid #f36d33;
                    font-family: monospace;
                    font-size: 15px;
                `
            }
        }),
        BrowserModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
