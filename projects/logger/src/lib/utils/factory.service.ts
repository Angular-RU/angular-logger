import { Injectable } from '@angular/core';
import { COLORS, DEFAULT_METHODS, GroupLevel, LABELS, LoggerLevel } from '../logger.config';
import { ConsoleService } from './console.service';
import { Arguments, ConsoleOperation, GroupFactoryMethod, Pipeline } from '../logger.interfaces';
import { CssFactory } from './css-factory.service';
import { GroupFactory } from './group-factory.service';
import { LoggerService } from '../logger.service';

@Injectable()
export class LoggerFactory {
    constructor(
        private readonly console: ConsoleService,
        private readonly cssFactory: CssFactory,
        private readonly groupFactory: GroupFactory
    ) {}

    public createLogger<T>(level: LoggerLevel, logger: LoggerService): T {
        const args: Arguments = this.getArgumentsByType(level);
        const method: string = DEFAULT_METHODS[level];

        const operation: ConsoleOperation =
            this.console.minLevel < level ? this.console.instance[method].bind(...args) : (): void => {};

        return this.defineProperties<T>(level, operation, logger);
    }

    private defineProperties<T>(level: LoggerLevel, operation: ConsoleOperation, logger: LoggerService): T {
        const groupMethods: string[] = [GroupLevel.GROUP, GroupLevel.GROUP_COLLAPSED];

        for (const methodName of groupMethods) {
            Object.defineProperty(operation, methodName, {
                enumerable: true,
                configurable: true,
                value: (label: string, pipeLine?: Pipeline): LoggerService => {
                    if (this.console.minLevel < level) {
                        const groupMethod: GroupFactoryMethod = this.groupFactory[methodName].bind(this.groupFactory);
                        groupMethod(label, pipeLine, logger);
                    }

                    return logger;
                }
            });
        }

        return (operation as any) as T;
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
