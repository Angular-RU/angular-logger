import { Inject, Injectable } from '@angular/core';
import { LoggerLevel } from '../logger.config';
import { ConsoleOperation, ConsoleServiceInterface, LOGGER_OPTIONS } from '../logger.interfaces';
import { LoggerOptionsImpl } from '../logger.options';

@Injectable()
export class ConsoleService implements ConsoleServiceInterface {
    public instance: Console;
    public minLevel: LoggerLevel;

    constructor(@Inject(LOGGER_OPTIONS) private options: LoggerOptionsImpl) {
        this.minLevel = options.minLevel;
        this.instance = options.instance;
    }

    public get console(): Console {
        return this.instance;
    }

    public set console(instance: Console) {
        this.instance = instance;
    }

    public get noop(): ConsoleOperation {
        return ((): void => {}) as ConsoleOperation;
    }

    public getTemplateLabel(level: LoggerLevel): string {
        return `%c${this.options.labelNames[level]}`;
    }

    public getFormatTemplateLabel(level: LoggerLevel): string {
        return `%c${this.options.labelNames[level]} %c%s`;
    }

    public getTemplateWithoutLabel(): string {
        return `%c%s`;
    }
}
