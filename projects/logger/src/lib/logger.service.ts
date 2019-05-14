import { Injectable } from '@angular/core';
import { LoggerFactory } from './utils/factory.service';
import { LoggerLevel } from './logger.config';
import { ConsoleService } from './utils/console.service';
import { GroupFactory } from './utils/group-factory.service';
import { LogMethod, Pipeline } from './logger.interfaces';
import { CssFactory } from './utils/css-factory.service';

@Injectable()
export class LoggerService {
    constructor(
        readonly console: ConsoleService,
        readonly factory: LoggerFactory,
        readonly groupFactory: GroupFactory,
        readonly cssFactory: CssFactory
    ) {}

    public get clear(): LogMethod {
        return this.console.instance.clear.bind(console);
    }

    public get log(): LogMethod {
        return this.console.instance.log.bind(console);
    }

    public get trace(): LogMethod {
        return this.factory.createLogger(LoggerLevel.TRACE);
    }

    public get debug(): LogMethod {
        return this.factory.createLogger(LoggerLevel.DEBUG);
    }

    public get info(): LogMethod {
        return this.factory.createLogger(LoggerLevel.INFO);
    }

    public get warn(): LogMethod {
        return this.factory.createLogger(LoggerLevel.WARN);
    }

    public get error(): LogMethod {
        return this.factory.createLogger(LoggerLevel.ERROR);
    }

    public get level(): LoggerLevel {
        return this.console.minLevel;
    }

    public set level(level: LoggerLevel) {
        this.console.minLevel = level;
    }

    public pipe(...pipelines: Pipeline[]): LoggerService {
        pipelines.forEach((pipeline: Pipeline) => pipeline(this));
        return this;
    }

    public groupCollapsed(title: string, pipeline?: Pipeline): LoggerService {
        this.groupFactory.groupCollapsed(title, pipeline, this);
        return this;
    }

    public close(): LoggerService {
        this.groupFactory.close();
        return this;
    }

    public closeAll(): LoggerService {
        this.groupFactory.closeAll();
        return this;
    }

    public group(title: string, pipeline?: Pipeline): LoggerService {
        this.groupFactory.group(title, pipeline, this);
        return this;
    }

    public css(style: string): LoggerService {
        this.cssFactory.style = style;
        return this;
    }

}
