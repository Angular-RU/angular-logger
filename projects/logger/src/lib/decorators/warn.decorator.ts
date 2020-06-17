import { LoggerInjector } from '../logger.injector';
import { LoggerService } from '../logger.service';
import { LogFn } from '../interfaces/logger.external';

export function WarnLog(): PropertyDecorator {
    return (target: unknown, propertyName: string | symbol): void => {
        Object.defineProperty(target, propertyName, {
            configurable: false,
            get(): LogFn {
                return LoggerInjector.getInjector().get<LoggerService>(LoggerService).warn;
            }
        });
    };
}
