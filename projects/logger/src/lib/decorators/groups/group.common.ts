import { Type } from '@angular/core';
import { LoggerService } from '../../logger.service';
import { GroupFactory } from '../../services/group-factory.service';
import { LoggerInjector } from '../../logger.injector';
import { Any, Callback, Fn } from '../../interfaces/logger.internal';
import { GroupLevel, GroupMethod, LoggerLevel } from '../../interfaces/logger.external';

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
    const groupMethod: GroupMethod = groupFactory[groupType].bind(groupFactory) as GroupMethod;
    const label: string = typeof title === 'string' ? title : title(...args);

    groupMethod(label, null, logger, level);
    result = method.apply(target, args);

    if (logger.level <= level) {
        logger.close();
    }

    return result;
}
