import { Type } from '@angular/core';
import { LoggerService } from '../../logger.service';
import { GroupLevel, LoggerLevel } from '../../logger.config';
import { Any, Callback, Fn, GroupMethod } from '../../logger.interfaces';
import { GroupFactory } from '../../services/group-factory.service';
import { LoggerInjector } from '../../logger.injector';

export function groupDecoratorFactory(
    level: LoggerLevel,
    groupType: GroupLevel,
    method: Fn,
    title: string | Callback<string>,
    args: Any[],
    target: Type<unknown>
): unknown {
    let result: unknown;
    const logger: LoggerService = LoggerInjector.getInjector().get<LoggerService>(LoggerService);
    const groupFactory: GroupFactory = LoggerInjector.getInjector().get<GroupFactory>(GroupFactory);
    const groupMethod: GroupMethod = groupFactory[groupType].bind(groupFactory);
    const label: string = typeof title === 'string' ? title : title(...args);

    groupMethod(label, null, logger, level);
    result = method.apply(target, args);

    if (logger.level <= level) {
        logger.close();
    }

    return result;
}
