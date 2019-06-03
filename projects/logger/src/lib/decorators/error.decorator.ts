import { Type } from '@angular/core';
import { LogFn } from './../logger.interfaces';
import { LoggerModule } from './../logger.module';

export function ErrorLog(): PropertyDecorator {
    return (target: Type<unknown>, propertyName: string): void => {
        Object.defineProperty(target, propertyName, {
            configurable: false,
            get(): LogFn {
                return LoggerModule.logger.error;
            }
        });
    };
}
