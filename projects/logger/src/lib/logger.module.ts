import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoggerService } from './logger.service';
import { LoggerFactory } from './utils/factory.service';
import { ConsoleService } from './utils/console.service';
import { CONSOLE_API, MIN_LEVEL, LoggerOptions, LINE_STYLE, CSS_CLASS_MAP } from './logger.interfaces';
import { GroupFactory } from './utils/group-factory.service';
import { CssFactory } from './utils/css-factory.service';
import { JsonFactory } from './utils/json-factory.service';
import { ClipboardFactory } from './utils/clipboard-factory.service';

@NgModule({
    providers: [LoggerService, LoggerFactory, ConsoleService, GroupFactory, CssFactory, JsonFactory, ClipboardFactory]
})
export class LoggerModule {
    public static forRoot(config: LoggerOptions = {}): ModuleWithProviders {
        return {
            ngModule: LoggerModule,
            providers: [
                { provide: CONSOLE_API, useValue: config.instance },
                { provide: MIN_LEVEL, useValue: config.minLevel },
                { provide: LINE_STYLE, useValue: config.globalLineStyle },
                { provide: CSS_CLASS_MAP, useValue: config.cssClassMap }
            ]
        };
    }
}
