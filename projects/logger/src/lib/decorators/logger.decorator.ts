import { LoggerModule } from '../logger.module';
import { LoggerService } from '../logger.service';
import { Type } from '@angular/core';

export function Logger(): PropertyDecorator {
    return (target: Type<unknown>, propertyName: string): void => {
        Object.defineProperty(target, propertyName, {
            configurable: false,
            get(): LoggerService {
                return LoggerModule.logger;
            }
        });
    };
}
