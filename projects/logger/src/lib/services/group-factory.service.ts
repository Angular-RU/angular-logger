import { Injectable } from '@angular/core';
import { ConsoleService } from './console.service';
import { LoggerService } from '../logger.service';
import { CssFactory } from './css-factory.service';
import { Any } from '../interfaces/logger.internal';
import { GroupMethod, LoggerLevel, Pipeline } from '../interfaces/logger.external';

@Injectable()
export class GroupFactory {
    public executePipesGroup: boolean;
    private counterOpenedGroup: number = 0;

    constructor(private readonly console: ConsoleService, private readonly cssFactory: CssFactory) {}

    public close(): void {
        if (this.executePipesGroup) {
            this.counterOpenedGroup--;
            this.console.instance.groupEnd();
        }
    }

    public closeAll(): void {
        while (this.counterOpenedGroup > 0) {
            this.close();
        }
    }

    public group<T = unknown>(title: string, pipeline: Pipeline<T>, logger: LoggerService, level: LoggerLevel): T {
        const group: GroupMethod = this.console.instance.group.bind(this.console.instance);
        return this.createGroupLogger<T>(group, title, pipeline, logger, level);
    }

    public groupCollapsed<T = unknown>(
        title: string,
        pipeline: Pipeline<T>,
        logger: LoggerService,
        level: LoggerLevel
    ): T {
        const groupCollapsed: GroupMethod = this.console.instance.groupCollapsed.bind(this.console.instance);
        return this.createGroupLogger<T>(groupCollapsed, title, pipeline, logger, level);
    }

    private createGroupLogger<T = unknown>(
        groupType: GroupMethod,
        title: string,
        pipeline: Pipeline,
        logger: LoggerService,
        level: LoggerLevel
    ): T {
        const showGroup: boolean = this.console.minLevel <= level;
        let pipeLineResult: T;
        if (showGroup) {
            this.executePipesGroup = true;
            this.counterOpenedGroup++;

            const label: string = this.console.getTemplateLabel(level);
            const lineStyle: string = this.cssFactory.getStyleLabel(level);

            groupType(label, lineStyle, title);
            if (pipeline) {
                const result: Any = pipeline(logger);
                this.close();
                pipeLineResult = result;
            }
        } else {
            this.executePipesGroup = false;
        }

        return pipeLineResult;
    }
}
