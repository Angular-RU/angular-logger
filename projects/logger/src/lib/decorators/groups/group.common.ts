import { LoggerModule } from '../../logger.module';
import { LoggerService } from '../../logger.service';
import { LoggerLevel, GroupLevel } from '../../logger.config';
import { Callback, GroupMethod } from '../../logger.interfaces';

import { GroupFactory } from '../../services/group-factory.service';

export function groupDecoratorFactory(
    level: LoggerLevel,
    groupType: GroupLevel,
    method: any,
    title: string | Callback<string>,
    args: any[],
    target: any
): any {
    let result: any;
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
