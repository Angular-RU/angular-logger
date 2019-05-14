import { Injectable } from '@angular/core';
import { COLORS, DEFAULT_METHODS, LABELS, LoggerLevel } from '../logger.config';
import { ConsoleService } from './console.service';
import { LogMethod } from '../logger.interfaces';
import { CssFactory } from './css-factory.service';
type Arguments = any[];
@Injectable()
export class LoggerFactory {
    constructor(readonly console: ConsoleService, readonly cssFactory: CssFactory) {}

    public createLogger(type: LoggerLevel): LogMethod {
      const args: Arguments = this.getArgumentsByType(type);
      const method: string = DEFAULT_METHODS[type];
      return this.console.instance[method].bind(...args);
    }

    private getArgumentsByType(type: LoggerLevel): Arguments {
        const label: string = LABELS[LoggerLevel[type]];
        const color: string = COLORS[LoggerLevel[type]];
        const lineStyle: string = this.cssFactory.style;
        const args: Arguments = [console, `%c${label} %c%s`,
          `color: ${color}; font-weight: bold`
        ];

        if (lineStyle) {
          args.push(lineStyle);
        }
        return args;
    }
}
