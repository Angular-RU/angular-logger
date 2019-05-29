import { Inject, Injectable } from '@angular/core';
import { ConsoleService } from './console.service';
import { GroupMethod, LABEL_NAMES, Pipeline } from '../logger.interfaces';
import { LoggerService } from '../logger.service';
import { LoggerLevel } from '../logger.config';
import { CssFactory } from './css-factory.service';

@Injectable()
export class GroupFactory {
    public executePipesGroup: boolean;
    private counterOpenedGroup: number = 0;

    constructor(
        @Inject(LABEL_NAMES) public labelNames: any,
        private readonly console: ConsoleService,
        private readonly cssFactory: CssFactory
    ) {}

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

    public group(title: string, pipeline: Pipeline, logger: LoggerService, level: LoggerLevel): any {
        const group: GroupMethod = this.console.instance.group.bind(this.console.instance);
        return this.createGroupLogger(group, title, pipeline, logger, level);
    }

    public groupCollapsed(title: string, pipeline: Pipeline, logger: LoggerService, level: LoggerLevel): any {
        const groupCollapsed: GroupMethod = this.console.instance.groupCollapsed.bind(this.console.instance);
        return this.createGroupLogger(groupCollapsed, title, pipeline, logger, level);
    }

    private createGroupLogger(
        groupType: GroupMethod,
        title: string,
        pipeline: Pipeline,
        logger: LoggerService,
        level: LoggerLevel
    ): any {
        const showGroup: boolean = this.console.minLevel <= level;
        if (showGroup) {
            this.executePipesGroup = true;
            this.counterOpenedGroup++;

            const label: string = this.console.getTemplateLabel(level);
            const lineStyle: string = this.cssFactory.getStyleLabel(level);

            groupType(label, lineStyle, title);
            if (pipeline) {
                const pipe: any = pipeline(logger);
                this.close();
                return pipe;
            }
        } else {
            this.executePipesGroup = false;
        }
    }
}
