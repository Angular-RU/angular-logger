import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoggerService } from './logger.service';
import { LoggerFactory } from './utils/factory.service';
import { ConsoleService } from './utils/console.service';
import { CONSOLE_API, MIN_LEVEL } from './logger.interfaces';
import { GroupFactory } from './utils/group-factory.service';
import { LoggerOptions } from './logger.interfaces';

@NgModule({
    providers: [LoggerService, LoggerFactory, ConsoleService, GroupFactory],
})
export class LoggerModule {
    static forRoot(options: LoggerOptions = {}): ModuleWithProviders {
        return {
            ngModule: LoggerModule,
            providers: [
                { provide: CONSOLE_API, useValue: options.instance },
                { provide: MIN_LEVEL, useValue: options.minLevel },
            ],
        };
    }
}
