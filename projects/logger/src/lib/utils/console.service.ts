import { Inject, Injectable } from '@angular/core';
import { LoggerLevel } from '../logger.config';
import { CONSOLE_API, MIN_LEVEL } from '../logger.interfaces';

@Injectable()
export class ConsoleService {
    public instance: Console;
    public minLevel: LoggerLevel;

    constructor(
        @Inject(MIN_LEVEL) public readonly level: LoggerLevel,
        @Inject(CONSOLE_API) public readonly consoleApi: any
    ) {
        this.minLevel = level || LoggerLevel.ALL;
        this.instance = consoleApi || console;
    }

    public set console(instance: Console) {
        this.instance = instance;
    }
}
