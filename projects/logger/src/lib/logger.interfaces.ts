import { LoggerService } from './logger.service';
import { LoggerLevel } from './logger.config';
import { InjectionToken } from '@angular/core';

export type Pipeline = (logger: LoggerService) => void;

export type LogMethod = (message?: any, ...optionalParams: any[]) => void;

export type Arguments = any[];

export interface ObjectKeyMap<T = any> {
  [key: string]: T;
}
export interface LoggerOptions {
    instance?: Console;
    minLevel?: LoggerLevel;
}

export const CONSOLE_API: InjectionToken<string> = new InjectionToken<string>('CONSOLE_API');
export const MIN_LEVEL: InjectionToken<string> = new InjectionToken<string>('MIN_LEVEL');
