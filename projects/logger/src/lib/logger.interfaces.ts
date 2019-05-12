import { LoggerService } from './logger.service';
import { LoggerLevel } from './logger.config';
import { InjectionToken } from '@angular/core';

export type Pipeline = (logger: LoggerService) => void;

export type LogMethod = (message?: any, ...optionalParams: any[]) => void;

export interface LoggerOptions {
    instance?: Console;
    minLevel?: LoggerLevel;
}

export const CONSOLE_API = new InjectionToken<string>('CONSOLE_API');
export const MIN_LEVEL = new InjectionToken<string>('MIN_LEVEL');
