import { Inject, Injectable } from '@angular/core';
import { LoggerLevel } from '../logger.config';
import {
    CONSOLE_API,
    ConsoleOperation,
    ConsoleServiceInterface,
    LABEL_COLORS,
    LABEL_NAMES,
    MIN_LEVEL
} from '../logger.interfaces';

@Injectable()
export class ConsoleService implements ConsoleServiceInterface {
    public instance: Console;
    public minLevel: LoggerLevel;

    constructor(
        @Inject(MIN_LEVEL) public readonly level: LoggerLevel,
        @Inject(CONSOLE_API) public readonly consoleApi: any,
        @Inject(LABEL_NAMES) public labelNames: any,
        @Inject(LABEL_COLORS) public labelColors: any
    ) {
        this.minLevel = level;
        this.instance = consoleApi;
    }

    public set console(instance: Console) {
        this.instance = instance;
    }

    public get console(): Console {
        return this.instance;
    }

    public getTemplateLabel(level: LoggerLevel): string {
        return `%c${this.labelNames[level]}`;
    }

    public getFormatTemplateLabel(level: LoggerLevel): string {
        return `%c${this.labelNames[level]} %c%s`;
    }

    public getTemplateWithoutLabel(): string {
        return `%c%s`;
    }

    public get noop(): ConsoleOperation {
        return ((): void => {}) as ConsoleOperation;
    }
}
