import { Inject, Injectable } from '@angular/core';
import { LoggerLevel } from '../logger.config';
import { CONSOLE_API, LABEL_COLORS, LABEL_NAMES, MIN_LEVEL } from '../logger.interfaces';

@Injectable()
export class ConsoleService {
    public instance: Console;
    public minLevel: LoggerLevel;

    constructor(
        @Inject(MIN_LEVEL) public readonly level: LoggerLevel,
        @Inject(CONSOLE_API) public readonly consoleApi: any,
        @Inject(LABEL_NAMES) public labelNames: any,
        @Inject(LABEL_COLORS) public labelColors: any
    ) {
        this.minLevel = level || LoggerLevel.ALL;
        this.instance = consoleApi || console;
    }

    public set console(instance: Console) {
        this.instance = instance;
    }

    public get console(): Console {
        return this.instance;
    }

    public getLabel(level: LoggerLevel): string {
        return this.labelNames[level];
    }
}
