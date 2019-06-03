import { GroupLevel, LoggerLevel } from '../../logger.config';
import { groupDecoratorFactory } from './group.common';
import { Callback } from '../../logger.interfaces';
import { Type } from '@angular/core';

export function Group(title: string | Callback<string>, level: LoggerLevel = LoggerLevel.INFO): any {
    return (_target: Type<unknown>, _key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const method: Callback = descriptor.value;

        descriptor.value = function(...args: any[]): unknown {
            return groupDecoratorFactory(level, GroupLevel.GROUP, method, title, args, this);
        };

        return descriptor;
    };
}
