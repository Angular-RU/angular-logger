import { Type } from '@angular/core';

import { LoggerService } from '../logger.service';
import { LoggerModule } from '../logger.module';

export function Logger(): PropertyDecorator {
    return (target: Type<unknown>, propertyName: string): void => {
        Object.defineProperty(target, propertyName, {
            configurable: false,
            get(): LoggerService {
                return LoggerModule.logger();
            }
        });
    };
}
