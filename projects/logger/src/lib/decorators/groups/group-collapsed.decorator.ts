import { Type } from '@angular/core';

import { GroupLevel, LoggerLevel } from '../../logger.config';
import { groupDecoratorFactory } from './group.common';
import { Any, Callback, DecoratorMethod } from '../../logger.interfaces';

export function GroupCollapsed(
    title: string | Callback<Any>,
    level: LoggerLevel = LoggerLevel.INFO
): DecoratorMethod {
    return (_target: Type<unknown>, _key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const method: Callback = descriptor.value;

        descriptor.value = function(...args: Any[]): unknown {
            return groupDecoratorFactory(level, GroupLevel.GROUP_COLLAPSED, method, title, args, this);
        };

        return descriptor;
    };
}
