import { InjectionToken, Injector, ModuleWithProviders, NgModule } from '@angular/core';

import { LoggerService } from './logger.service';
import { LoggerFactory } from './services/factory.service';
import { ConsoleService } from './services/console.service';
import { LOGGER_OPTIONS, LoggerOptions } from './logger.interfaces';
import { GroupFactory } from './services/group-factory.service';
import { CssFactory } from './services/css-factory.service';
import { JsonFactory } from './services/json-factory.service';
import { ClipboardFactory } from './services/clipboard-factory.service';
import { TimerFactory } from './services/timer-factory.service';
import { LoggerOptionsImpl } from './logger.options';

@NgModule({
    providers: [
        LoggerService,
        LoggerFactory,
        ConsoleService,
        GroupFactory,
        CssFactory,
        JsonFactory,
        ClipboardFactory,
        TimerFactory
    ]
})
export class LoggerModule {
    public static injector: Injector = undefined;
    private static readonly ROOT_OPTIONS: InjectionToken<string> = new InjectionToken<string>('ROOT_OPTIONS');

    constructor(injector: Injector) {
        LoggerModule.injector = injector;
    }

    public static logger(): LoggerService {
        return LoggerModule.injector.get(LoggerService);
    }

    public static groupFactory(): GroupFactory {
        return LoggerModule.injector.get(GroupFactory);
    }

    public static forRoot(config: Partial<LoggerOptions> = {}): ModuleWithProviders {
        return {
            ngModule: LoggerModule,
            providers: [
                {
                    provide: LoggerModule.ROOT_OPTIONS,
                    useValue: config
                },
                {
                    provide: LOGGER_OPTIONS,
                    useFactory: LoggerModule.loggerConfigFactory,
                    deps: [LoggerModule.ROOT_OPTIONS]
                }
            ]
        };
    }

    private static loggerConfigFactory(config: Partial<LoggerOptions>): unknown {
        return new LoggerOptionsImpl().options(config);
    }
}
