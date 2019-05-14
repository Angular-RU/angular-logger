import { ObjectKeyMap } from './logger.interfaces';

export enum LABELS {
    TRACE = '[TRACE]:',
    DEBUG = '[DEBUG]:',
    INFO = '[INFO]:',
    WARN = '[WARN]:',
    ERROR = '[ERROR]:'
}

export enum COLORS {
    TRACE = '#000080',
    DEBUG = '#00BFFE',
    INFO = '#000000',
    WARN = '#FF6419',
    ERROR = '#F1062D'
}

export enum LoggerLevel {
    ALL = 1,
    TRACE,
    DEBUG,
    INFO,
    WARN,
    ERROR,
    OFF
}

export const DEFAULT_METHODS: ObjectKeyMap = {
    [LoggerLevel.TRACE]: 'debug',
    [LoggerLevel.DEBUG]: 'info',
    [LoggerLevel.INFO]: 'info',
    [LoggerLevel.WARN]: 'warn',
    [LoggerLevel.ERROR]: 'error'
};
