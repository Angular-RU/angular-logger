import { LoggerModule } from '../logger.module';
import { LoggerService } from '@angular-ru/logger';

export function Logger(): PropertyDecorator {
    return (target: any, propertyName: string): void => {
        Object.defineProperty(target, propertyName, {
            configurable: false,
            get(): LoggerService {
                return LoggerModule.logger;
            }
        });
    };
}
