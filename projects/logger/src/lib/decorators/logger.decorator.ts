import { LoggerService } from '../logger.service';
import { LoggerInjector } from '../logger.injector';

export function Logger(): PropertyDecorator {
    return (target: unknown, propertyName: string | symbol): void => {
        Object.defineProperty(target, propertyName, {
            configurable: false,
            get(): LoggerService {
                return LoggerInjector.getInjector().get<LoggerService>(LoggerService);
            }
        });
    };
}
