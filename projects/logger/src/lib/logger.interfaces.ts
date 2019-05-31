import { LoggerService } from './logger.service';
import { LoggerLevel } from './logger.config';
import { InjectionToken } from '@angular/core';

export type Pipeline<T = any> = (logger: LoggerService) => T;

export interface GroupMethods extends Function {
    group(label: string, pipeline?: Pipeline): LoggerService;

    groupCollapsed(label: string, pipeline?: Pipeline): LoggerService;
}

export interface TimerInfo {
    title: string;
    startTime: number;
}

export type ConsoleOperation<T = any, P = any> = (message?: T, ...optionalParams: P[]) => void;
export type PipeOperation = GroupMethods | ConsoleOperation;
export type GroupMethod<T = any> = (groupTitle?: string, ...optionalParams: T[]) => any;
export type GroupFactoryMethod = (title: string, pipeline: Pipeline, logger: LoggerService, level: LoggerLevel) => void;
export type LogFn = GroupMethods & ConsoleOperation;
export type Arguments<T = any> = T[];

export interface ObjectKeyMap<T = any> {
    [key: string]: T;
}

export type Callback<T = void> = (...args: any[]) => T;

export type Descriptor<T = any> = PropertyDescriptor & ThisType<T>;

export interface LoggerOptions {
    instance: Console;
    minLevel: LoggerLevel;
    globalLineStyle: string;
    cssClassMap: object;
    useLevelGroup: boolean;
    labelColors: ObjectKeyMap;
    labelNames: ObjectKeyMap;

    options?(config: Partial<LoggerOptions>): LoggerOptions;
}

export const CONSOLE_API: InjectionToken<string> = new InjectionToken<string>('CONSOLE_API');
export const MIN_LEVEL: InjectionToken<string> = new InjectionToken<string>('MIN_LEVEL');
export const LINE_STYLE: InjectionToken<string> = new InjectionToken<string>('LINE_STYLE');
export const CSS_CLASS_MAP: InjectionToken<string> = new InjectionToken<string>('CSS_CLASS_MAP');
export const USE_LEVEL_GROUP: InjectionToken<string> = new InjectionToken<string>('USE_LEVEL_GROUP');
export const LABEL_COLORS: InjectionToken<string> = new InjectionToken<string>('LABEL_COLORS');
export const LABEL_NAMES: InjectionToken<string> = new InjectionToken<string>('LABEL_NAMES');

export interface ConsoleServiceInterface {
    getTemplateWithoutLabel(): string;
}

export interface Clipboard {
    copyOnBuffer(data: unknown): boolean;
    readonly clipboardSetData: SetDataType;
    readonly queryCommandCopy: boolean;
    textAreaSelectData(value: string): boolean;
}

export type SetDataType = (format: string, data: string) => void | boolean;

export type TimerLevels =
    | LoggerLevel.TRACE
    | LoggerLevel.DEBUG
    | LoggerLevel.INFO
    | LoggerLevel.WARN
    | LoggerLevel.ERROR;
