import { LoggerOptions, ObjectKeyMap } from './logger.interfaces';
import { COLORS, LABELS, LoggerLevel } from './logger.config';
import { Injectable } from '@angular/core';

@Injectable()
export class LoggerOptionsImpl implements LoggerOptions {
    public instance: Console = console;
    public minLevel: LoggerLevel = LoggerLevel.ALL;
    public globalLineStyle: string = '';
    public cssClassMap: object = {};
    public useLevelGroup: boolean = true;
    public labelColors: ObjectKeyMap<string> = {
        [LoggerLevel.TRACE]: COLORS.TRACE,
        [LoggerLevel.DEBUG]: COLORS.DEBUG,
        [LoggerLevel.INFO]: COLORS.INFO,
        [LoggerLevel.WARN]: COLORS.WARN,
        [LoggerLevel.ERROR]: COLORS.ERROR
    };

    public labelNames: ObjectKeyMap<string> = {
        [LoggerLevel.TRACE]: LABELS.TRACE,
        [LoggerLevel.DEBUG]: LABELS.DEBUG,
        [LoggerLevel.INFO]: LABELS.INFO,
        [LoggerLevel.WARN]: LABELS.WARN,
        [LoggerLevel.ERROR]: LABELS.ERROR
    };
}
