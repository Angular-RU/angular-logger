import { Inject, Injectable } from '@angular/core';
import { COLORS, LABELS, LoggerLevel } from '../logger.config';
import {
  Any,
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
        @Inject(CONSOLE_API) public readonly consoleApi: Any,
        @Inject(LABEL_NAMES) public labelNames: LABELS[],
        @Inject(LABEL_COLORS) public labelColors: COLORS[]
    ) {
        this.minLevel = level;
        this.instance = consoleApi;
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
        return `%c${this.labelNames[level]}`;
    }

    public getFormatTemplateLabel(level: LoggerLevel): string {
        return `%c${this.labelNames[level]} %c%s`;
    }

    public getTemplateWithoutLabel(): string {
        return `%c%s`;
    }
}
