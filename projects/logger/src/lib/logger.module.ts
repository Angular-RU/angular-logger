import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoggerService } from './logger.service';
import { LoggerFactory } from './utils/factory.service';
import { ConsoleService } from './utils/console.service';
import { CONSOLE_API, MIN_LEVEL, LoggerOptions } from './logger.interfaces';
import { GroupFactory } from './utils/group-factory.service';
import { CssFactory } from './utils/css-factory.service';

@NgModule({
    providers: [LoggerService, LoggerFactory, ConsoleService, GroupFactory, CssFactory]
})
export class LoggerModule {
    public static forRoot(options: LoggerOptions = {}): ModuleWithProviders {
        return {
            ngModule: LoggerModule,
            providers: [
                { provide: CONSOLE_API, useValue: options.instance },
                { provide: MIN_LEVEL, useValue: options.minLevel }
            ]
        };
    }
}
