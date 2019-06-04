import { Type } from '@angular/core';

import { LoggerLevel } from '../logger.config';
import { Any, DecoratorMethod, Fn, TimerInfo, TimerLevels } from '../logger.interfaces';
import { LoggerInjector } from '../logger.injector';
import { LoggerService } from '../logger.service';

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
