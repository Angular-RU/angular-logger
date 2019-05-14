import { Injectable } from '@angular/core';
import { COLORS, DEFAULT_METHODS, LABELS, LoggerLevel } from '../logger.config';
import { ConsoleService } from './console.service';
import { LogMethod } from '../logger.interfaces';

@Injectable()
export class LoggerFactory {
    constructor(private console: ConsoleService) {}

    public createLogger(type: LoggerLevel): LogMethod {
        if (this.console.minLevel > type) {
            return () => {}; // noop
        }

        const label = LABELS[LoggerLevel[type]];
        const color = COLORS[LoggerLevel[type]];
        const method = DEFAULT_METHODS[type];
        return this.console.instance[method].bind(
            console,
            `%c${label}`,
            `color: ${color}; font-weight: bold`
        );
    }

    public 
}
