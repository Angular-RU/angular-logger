import { Injectable } from '@angular/core';
import { DEFAULT_METHODS, LoggerLevel, TimerInfo } from '@angular-ru/logger';
import { ConsoleService } from './console.service';

@Injectable()
export class TimerFactory {
    constructor(private readonly console: ConsoleService) {}

    public startTime(title: string, level: LoggerLevel = LoggerLevel.DEBUG): TimerInfo | null {
        let result: TimerInfo = null;
        const canExecute: boolean = !(this.console.minLevel > level);
        if (canExecute) {
            result = { startTime: performance.now(), title };
        }
        return result;
    }

    public endTime(info: TimerInfo, level: LoggerLevel = LoggerLevel.DEBUG, isMillisecond: boolean = true): void {
        const canExecute: boolean = !(this.console.minLevel > level);

        if (canExecute) {
            const msTime: number = parseFloat((performance.now() - info.startTime).toFixed(4));
            const time: string = isMillisecond ? `${msTime}ms` : `${Math.floor(msTime / 1000)}s`;
            const methodName: string = DEFAULT_METHODS[level];
            const logMethod: (...args: string[]) => void = this[methodName];
            logMethod(`Timer: ${info.title}`, `took ${time} to execute`);
        }
    }
}