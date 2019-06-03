import { LoggerModule } from '../../logger.module';
import { LoggerService } from '../../logger.service';
import { LoggerLevel, GroupLevel } from '../../logger.config';
import { Callback, GroupMethod } from '../../logger.interfaces';

import { GroupFactory } from '../../services/group-factory.service';
import { Type } from '@angular/core';

export function groupDecoratorFactory(
    level: LoggerLevel,
    groupType: GroupLevel,
    method: any,
    title: string | Callback<string>,
    args: any[],
    target: Type<unknown>
): unknown {
    let result: unknown;
    const logger: LoggerService = LoggerModule.logger;
    const groupFactory: GroupFactory = LoggerModule.groupFactory;
    const groupMethod: GroupMethod = groupFactory[groupType].bind(groupFactory);
    const label: string = typeof title === 'string' ? title : title(...args);

    groupMethod(label, null, logger, level);
    result = method.apply(target, args);

    if (logger.level <= level) {
        logger.close();
    }

    return result;
}
