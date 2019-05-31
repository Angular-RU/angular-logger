import { LoggerLevel } from '../logger.config';
import { Fn, TimerInfo, TimerLevels } from '../logger.interfaces';
import { LoggerModule } from '../logger.module';

export function Timer(title: string, level: TimerLevels = LoggerLevel.DEBUG, isMillisecond: boolean = true): any {
    return (_target: any, _key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        let result: any;
        const method: Fn = descriptor.value;
        descriptor.value = function(...args: any[]): PropertyDescriptor {
            const info: TimerInfo | null = LoggerModule.logger.startTime(title, level);
            result = method.apply(this, args);
            LoggerModule.logger.endTime(info, level, isMillisecond);
            return result;
        };
        return descriptor;
    };
}
