import { Inject, Injectable } from '@angular/core';
import { LoggerOptionsImpl } from '../logger.options';
import { ConsoleOperation, LOGGER_OPTIONS, LoggerLevel } from '../interfaces/logger.external';
import { ConsoleServiceInterface } from '../interfaces/logger.internal';

@Injectable()
export class ConsoleService implements ConsoleServiceInterface {
    public instance: Console;
    public minLevel: LoggerLevel;

    constructor(@Inject(LOGGER_OPTIONS) public readonly options: LoggerOptionsImpl) {
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

    public getTemplateLabel(text: string): string {
        return `%c${text}`;
    }

    public getFormatTemplateLabel(text: string): string {
        return `%c${text} %c%s`;
    }

    public getTemplateWithoutLabel(): string {
        return `%c%s`;
    }
}
