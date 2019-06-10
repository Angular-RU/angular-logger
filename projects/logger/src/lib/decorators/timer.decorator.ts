import { Type } from '@angular/core';

import { LoggerInjector } from '../logger.injector';
import { LoggerService } from '../logger.service';
import { Any, DecoratorMethod, Fn } from '../interfaces/logger.internal';
import { LoggerLevel, TimerInfo, TimerLevels } from '../interfaces/logger.external';

export function TimerLog(
    title: string,
    level: TimerLevels = LoggerLevel.DEBUG,
    isMillisecond: boolean = true
): DecoratorMethod {
    return (_target: Type<unknown>, _key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        let result: PropertyDescriptor;
        const method: Fn = descriptor.value;
        descriptor.value = function(...args: Any[]): PropertyDescriptor {
            const info: TimerInfo | null = LoggerInjector.getInjector()
                .get<LoggerService>(LoggerService)
                .startTime(title, level);
            result = method.apply(this, args);
            LoggerInjector.getInjector()
                .get<LoggerService>(LoggerService)
                .endTime(info, level, isMillisecond);
            return result;
        };
        return descriptor;
    };
}
