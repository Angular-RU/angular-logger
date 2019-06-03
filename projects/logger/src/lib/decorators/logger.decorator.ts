import { Type } from '@angular/core';

import { LoggerModule } from '../logger.module';
import { LoggerService } from '../logger.service';

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
