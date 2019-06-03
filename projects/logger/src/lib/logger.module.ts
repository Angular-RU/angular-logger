import { Injector, ModuleWithProviders, NgModule } from '@angular/core';

import { LoggerService } from './logger.service';
import { LoggerFactory } from './services/factory.service';
import { ConsoleService } from './services/console.service';
import {
    CONSOLE_API,
    MIN_LEVEL,
    LoggerOptions,
    LINE_STYLE,
    CSS_CLASS_MAP,
    USE_LEVEL_GROUP,
    LABEL_NAMES,
    LABEL_COLORS
} from './logger.interfaces';
import { GroupFactory } from './services/group-factory.service';
import { CssFactory } from './services/css-factory.service';
import { JsonFactory } from './services/json-factory.service';
import { ClipboardFactory } from './services/clipboard-factory.service';
import { LoggerConfigurator } from './logger.options';
import { TimerFactory } from './services/timer-factory.service';

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

// @dynamic
export class LoggerModule {
    private static injector: Injector = undefined;

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
        const options: LoggerOptions = new LoggerConfigurator().options(config);

        return {
            ngModule: LoggerModule,
            providers: [
                { provide: CONSOLE_API, useValue: options.instance },
                { provide: MIN_LEVEL, useValue: options.minLevel },
                { provide: LINE_STYLE, useValue: options.globalLineStyle },
                { provide: CSS_CLASS_MAP, useValue: options.cssClassMap },
                { provide: USE_LEVEL_GROUP, useValue: options.useLevelGroup },
                { provide: LABEL_NAMES, useValue: options.labelNames },
                { provide: LABEL_COLORS, useValue: options.labelColors }
            ]
        };
    }
}
