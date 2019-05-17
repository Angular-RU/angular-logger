import { Injectable } from '@angular/core';
import { ConsoleService } from './console.service';
import { GroupMethod, Pipeline } from '../logger.interfaces';
import { LoggerService } from '../logger.service';
import { LoggerLevel } from '../logger.config';

@Injectable()
export class GroupFactory {
    public executePipesGroup: boolean;
    private counterOpenedGroup: number = 0;

    constructor(private readonly console: ConsoleService) {}

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

    public group(title: string, pipeline: Pipeline, logger: LoggerService, level: LoggerLevel): void {
        const group: GroupMethod = this.console.instance.group;
        this.createGroupLogger(group, title, pipeline, logger, level);
    }

    public groupCollapsed(title: string, pipeline: Pipeline, logger: LoggerService, level: LoggerLevel): void {
        const groupCollapsed: GroupMethod = this.console.instance.groupCollapsed;
        this.createGroupLogger(groupCollapsed, title, pipeline, logger, level);
    }

    private createGroupLogger(
        groupType: GroupMethod,
        title: string,
        pipeline: Pipeline,
        logger: LoggerService,
        level: LoggerLevel
    ): void {
        const showGroup: boolean = this.console.minLevel <= level;
        if (showGroup) {
            this.executePipesGroup = true;
            this.counterOpenedGroup++;
            groupType(title);
            if (pipeline) {
                pipeline(logger);
                this.close();
            }
        } else {
            this.executePipesGroup = false;
        }
    }
}
