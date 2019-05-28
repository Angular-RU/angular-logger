import { GroupLevel, LoggerLevel } from '../../logger.config';
import { groupDecoratorFactory } from './group.common';
import { Callback } from '@angular-ru/logger';

export function GroupCollapsed(title: string | Callback<string>, level: LoggerLevel = LoggerLevel.INFO): any {
    return (_target: any, _key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const method: Callback = descriptor.value;

        descriptor.value = function(...args: any[]): any {
            return groupDecoratorFactory(level, GroupLevel.GROUP_COLLAPSED, method, title, args, this);
        };

        return descriptor;
    };
}
