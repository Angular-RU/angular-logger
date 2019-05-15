import { Injectable } from '@angular/core';
import { COLORS, DEFAULT_METHODS, LABELS, LoggerLevel } from '../logger.config';
import { ConsoleService } from './console.service';
import { Arguments } from '../logger.interfaces';
import { CssFactory } from './css-factory.service';

@Injectable()
export class LoggerFactory {
    constructor(readonly console: ConsoleService, readonly cssFactory: CssFactory) {}

    public createLogger<T = any>(type: LoggerLevel): T {
        const args: Arguments = this.getArgumentsByType(type);
        const method: string = DEFAULT_METHODS[type];
        return this.console.instance[method].bind(...args);
    }

    private getArgumentsByType(type: LoggerLevel): Arguments {
        const label: string = LABELS[LoggerLevel[type]];
        const color: string = COLORS[LoggerLevel[type]];
        const styleLabel: string = this.cssFactory.getStyleLabelByColor(color);
        const lineStyle: string = this.cssFactory.style;
        const args: Arguments = [this.console.instance];

        if (lineStyle) {
            args.push(`%c${label} %c%s`, styleLabel, lineStyle);
        } else {
            args.push(`%c${label}`, styleLabel);
        }

        return args;
    }
}
