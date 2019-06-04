import { Type } from '@angular/core';

import { LoggerService } from '../logger.service';
import { LoggerInjector } from '../logger.injector';

export function Logger(): PropertyDecorator {
    return (target: Type<unknown>, propertyName: string): void => {
        Object.defineProperty(target, propertyName, {
            configurable: false,
            get(): LoggerService {
                return LoggerInjector.getInjector().get<LoggerService>(LoggerService);
            }
        });
    };
}
