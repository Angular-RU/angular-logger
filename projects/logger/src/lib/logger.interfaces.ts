import { LoggerService } from './logger.service';
import { LoggerLevel } from './logger.config';
import { InjectionToken } from '@angular/core';

export type Pipeline<T = unknown> = (logger: LoggerService) => T;

export type Fn<T = unknown, U = unknown> = (...args: T[]) => U;

export interface GroupMethods extends Function {
    group(label: string, pipeline?: Pipeline): LoggerService;

    groupCollapsed(label: string, pipeline?: Pipeline): LoggerService;
}

export interface TimerInfo {
    title: string;
    startTime: number;
}

export type ConsoleOperation<T = unknown, P = unknown> = (message?: T, ...optionalParams: P[]) => void;
export type PipeOperation = GroupMethods | ConsoleOperation;
export type GroupMethod<T = unknown> = (groupTitle?: string, ...optionalParams: T[]) => unknown;
export type GroupFactoryMethod = (title: string, pipeline: Pipeline, logger: LoggerService, level: LoggerLevel) => void;
export type LogFn = GroupMethods & ConsoleOperation;
export type Arguments<T = unknown> = T[];

export interface ObjectKeyMap<T = Any> {
    [key: string]: T;
}

// tslint:disable-next-line:no-any
export type Any = any; // NOSONAR

export type DecoratorMethod = (target: Any, key: string, descriptor: PropertyDescriptor) => PropertyDescriptor;

export interface ClipboardData {
    setData: (type: string, value: string) => void | boolean;
}

export type Callback<T = void> = (...args: T[]) => T;

export type Descriptor<T = unknown> = PropertyDescriptor & ThisType<T>;

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

export const LOGGER_OPTIONS: InjectionToken<string> = new InjectionToken<string>('LOGGER_OPTIONS');

export interface ConsoleServiceInterface {
    getTemplateWithoutLabel(): string;
}

export interface Clipboard {
    readonly clipboardSetData: SetDataType;
    readonly queryCommandCopy: boolean;

    copyOnBuffer(data: unknown): boolean;

    textAreaSelectData(value: string): boolean;
}

export type SetDataType = (format: string, data: string) => void | boolean;

export type TimerLevels =
    | LoggerLevel.TRACE
    | LoggerLevel.DEBUG
    | LoggerLevel.INFO
    | LoggerLevel.WARN
    | LoggerLevel.ERROR;
