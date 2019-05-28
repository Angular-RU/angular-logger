import { GroupLevel, LoggerLevel } from '../../logger.config';
import { groupDecoratorFactory } from './group.common';
import { Callback } from '../../logger.interfaces';

export function Group(title: string | Callback<string>, level: LoggerLevel = LoggerLevel.INFO): any {
    return (_target: any, _key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const method: any = descriptor.value;

        descriptor.value = function(...args: any[]): any {
            return groupDecoratorFactory(level, GroupLevel.GROUP, method, title, args, this);
        };

        return descriptor;
    };
}
