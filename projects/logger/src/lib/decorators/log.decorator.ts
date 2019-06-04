import { Type } from '@angular/core';

import { LogFn } from './../logger.interfaces';
import { LoggerInjector } from '../logger.injector';
import { LoggerService } from '../logger.service';

export function LoggerLog(): PropertyDecorator {
    return (target: Type<unknown>, propertyName: string): void => {
        Object.defineProperty(target, propertyName, {
            configurable: false,
            get(): LogFn {
                return LoggerInjector.getInjector().get<LoggerService>(LoggerService).log;
            }
        });
    };
}
