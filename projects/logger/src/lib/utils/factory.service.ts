import { Inject, Injectable } from '@angular/core';
import { DEFAULT_METHODS, GroupLevel, LoggerLevel } from '../logger.config';
import { ConsoleService } from './console.service';
import {
    Arguments,
    ConsoleOperation as Operation,
    Descriptor,
    GroupFactoryMethod,
    PipeOperation,
    Pipeline,
    USE_LEVEL_GROUP,
    LABEL_NAMES,
    LABEL_COLORS
} from '../logger.interfaces';
import { CssFactory } from './css-factory.service';
import { GroupFactory } from './group-factory.service';
import { LoggerService } from '../logger.service';

@Injectable()
export class LoggerFactory {
    constructor(
        @Inject(USE_LEVEL_GROUP) private readonly useLevelGroup: any,
        @Inject(LABEL_NAMES) public readonly labelNames: any,
        @Inject(LABEL_COLORS) public readonly labelColors: any,
        private readonly console: ConsoleService,
        private readonly cssFactory: CssFactory,
        private readonly groupFactory: GroupFactory
    ) {}

    public createLogger<T>(level: LoggerLevel, logger: LoggerService): T {
        const args: Arguments = this.getArgumentsByType(level);
        const method: string = DEFAULT_METHODS[level];

        const operation: Operation =
            this.console.minLevel <= level ? this.console.instance[method].bind(...args) : (): void => {};

        const pipeOperation: PipeOperation = this.useLevelGroup
            ? this.defineLevelGroups(level, operation, logger)
            : operation;

        return (pipeOperation as any) as T;
    }

    private defineLevelGroups(level: LoggerLevel, operation: Operation, logger: LoggerService): Operation {
        const { GROUP, GROUP_COLLAPSED }: any = GroupLevel;
        const groupsIsNull: boolean = !(operation.hasOwnProperty(GROUP) || operation.hasOwnProperty(GROUP_COLLAPSED));

        if (groupsIsNull) {
            Object.defineProperties(operation, {
                [GROUP]: this.setGroupMethod(GROUP, level, logger),
                [GROUP_COLLAPSED]: this.setGroupMethod(GROUP_COLLAPSED, level, logger)
            });
        }

        return operation;
    }

    private setGroupMethod(methodName: GroupLevel, level: LoggerLevel, logger: LoggerService): Descriptor {
        return {
            enumerable: true,
            configurable: true,
            value: (label: string, pipeLine?: Pipeline): LoggerService => {
                const groupMethod: GroupFactoryMethod = this.groupFactory[methodName].bind(this.groupFactory);
                groupMethod(label, pipeLine, logger, level);

                return logger;
            }
        };
    }

    private getArgumentsByType(type: LoggerLevel): Arguments {
        const label: string = this.labelNames[type];
        const color: string = this.labelColors[type];
        const styleLabel: string = this.cssFactory.getStyleLabelByColor(color);
        const lineStyle: string = this.cssFactory.style;
        const args: Arguments = [this.console.instance];

        if (lineStyle) {
            args.push(`%c${label} %c%s`, styleLabel, lineStyle);
        } else {
            args.push(`%c${label}`, styleLabel);
        }

        return args;
    }
}
