import { Type } from '@angular/core';

import { LoggerInjector } from '../logger.injector';
import { LoggerService } from '../logger.service';
import { LogFn } from '../interfaces/logger.external';

export function TraceLog(): PropertyDecorator {
    return (target: Type<unknown>, propertyName: string): void => {
        Object.defineProperty(target, propertyName, {
            configurable: false,
            get(): LogFn {
                return LoggerInjector.getInjector().get<LoggerService>(LoggerService).trace;
            }
        });
    };
}
