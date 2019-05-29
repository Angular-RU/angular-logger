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

    public group<T = any>(title: string, pipeline: Pipeline<T>, logger: LoggerService, level: LoggerLevel): T {
        const group: GroupMethod = this.console.instance.group.bind(this.console.instance);
        return this.createGroupLogger<T>(group, title, pipeline, logger, level);
    }

    public groupCollapsed<T = any>(title: string, pipeline: Pipeline<T>, logger: LoggerService, level: LoggerLevel): T {
        const groupCollapsed: GroupMethod = this.console.instance.groupCollapsed.bind(this.console.instance);
        return this.createGroupLogger<T>(groupCollapsed, title, pipeline, logger, level);
    }

    private createGroupLogger<T = any>(
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
                const pipe: any = pipeline(logger);
                this.close();
                pipeLineResult = pipe;
            }
        } else {
            this.executePipesGroup = false;
        }

        return pipeLineResult;
    }
}
