import { Injectable } from '@angular/core';
import { ConsoleService } from './console.service';
import { Pipeline } from '../logger.interfaces';
import { LoggerService } from '../logger.service';

@Injectable()
export class GroupFactory {
    private counterOpenedGroup: number = 0;

    constructor(readonly console: ConsoleService) {}

    public close(): void {
        this.counterOpenedGroup--;
        this.console.instance.groupEnd();
    }

    public closeAll(): void {
        while (this.counterOpenedGroup > 0) {
            this.close();
        }
    }

    public group(title: string, pipeline: Pipeline, logger: LoggerService): void {
        this.counterOpenedGroup++;
        this.console.instance.group(title);
        if (pipeline) {
            pipeline(logger);
            this.close();
        }
    }

    public groupCollapsed(title: string, pipeline: Pipeline, logger: LoggerService): void {
        this.counterOpenedGroup++;
        this.console.instance.groupCollapsed(title);
        if (pipeline) {
            pipeline(logger);
            this.close();
        }
    }
}
