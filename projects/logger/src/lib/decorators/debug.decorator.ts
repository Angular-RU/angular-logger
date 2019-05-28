import { LogFn } from './../logger.interfaces';
import { LoggerService } from './../logger.service';
import { LoggerModule } from './../logger.module';

export function Debug(): PropertyDecorator {
  return (target: any, propertyName: string): void => {

    Object.defineProperty(target, propertyName, {
      configurable: false,
      get(): LogFn {
        const logger: LoggerService = LoggerModule.injector.get(LoggerService);
        return logger.debug;
      }
    });
  };
}
