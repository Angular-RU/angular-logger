import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoggerService } from './logger.service';
import { LoggerFactory } from './utils/factory.service';
import { ConsoleService } from './utils/console.service';
import {
  CONSOLE_API,
  MIN_LEVEL,
  LoggerOptions,
  LINE_STYLE,
  CSS_CLASS_MAP,
  USE_LEVEL_GROUP,
  LABEL_NAMES, LABEL_COLORS
} from './logger.interfaces';
import { GroupFactory } from './utils/group-factory.service';
import { CssFactory } from './utils/css-factory.service';
import { JsonFactory } from './utils/json-factory.service';
import { ClipboardFactory } from './utils/clipboard-factory.service';
import { LoggerConfigurator } from './logger.options';

@NgModule({
    providers: [LoggerService, LoggerFactory, ConsoleService, GroupFactory, CssFactory, JsonFactory, ClipboardFactory]
})
export class LoggerModule {
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
