import { LoggerService } from './logger.service';
import { LoggerLevel } from './logger.config';
import { InjectionToken } from '@angular/core';

export type Pipeline = (logger: LoggerService) => void;

export interface GroupMethods extends Function {
    group(label: string, pipeline?: Pipeline): LoggerService;

    groupCollapsed(label: string, pipeline?: Pipeline): LoggerService;
}

export type ConsoleOperation = (message?: any, ...optionalParams: any[]) => void;

export type GroupFactoryMethod = (title: string, pipeline: Pipeline, logger: LoggerService) => void;

export type LogMethod = GroupMethods & ConsoleOperation;

export type Arguments = any[];

export interface ObjectKeyMap<T = any> {
    [key: string]: T;
}

export interface LoggerOptions {
    instance?: Console;
    minLevel?: LoggerLevel;
    globalLineStyle?: string;
    cssClassMap?: object;
}

export const CONSOLE_API: InjectionToken<string> = new InjectionToken<string>('CONSOLE_API');
export const MIN_LEVEL: InjectionToken<string> = new InjectionToken<string>('MIN_LEVEL');
export const LINE_STYLE: InjectionToken<string> = new InjectionToken<string>('LINE_STYLE');
export const CSS_CLASS_MAP: InjectionToken<string> = new InjectionToken<string>('CSS_CLASS_MAP');
