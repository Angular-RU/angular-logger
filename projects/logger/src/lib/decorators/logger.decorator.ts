import { LoggerModule } from '../logger.module';
import { LoggerService } from '../logger.service';

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
