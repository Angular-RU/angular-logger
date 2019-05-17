import { Injectable } from '@angular/core';
import { LoggerFactory } from './utils/factory.service';
import { LoggerLevel } from './logger.config';
import { ConsoleService } from './utils/console.service';
import { GroupFactory } from './utils/group-factory.service';
import { LogMethod, Pipeline } from './logger.interfaces';
import { CssFactory } from './utils/css-factory.service';
import { JsonFactory } from './utils/json-factory.service';
import { ClipboardFactory } from './utils/clipboard-factory.service';

@Injectable()
export class LoggerService {
    constructor(
        private readonly console: ConsoleService,
        private readonly factory: LoggerFactory,
        private readonly groupFactory: GroupFactory,
        private readonly cssFactory: CssFactory,
        private readonly jsonFactory: JsonFactory,
        private readonly clipboardFactory: ClipboardFactory
    ) {}

    public get clear(): LogMethod {
        return this.console.instance.clear.bind(console);
    }

    public get log(): LogMethod {
        return this.console.instance.log.bind(console);
    }

    public get trace(): LogMethod {
        return this.factory.createLogger<LogMethod>(LoggerLevel.TRACE, this);
    }

    public get debug(): LogMethod {
        return this.factory.createLogger<LogMethod>(LoggerLevel.DEBUG, this);
    }

    public get info(): LogMethod {
        return this.factory.createLogger<LogMethod>(LoggerLevel.INFO, this);
    }

    public get warn(): LogMethod {
        return this.factory.createLogger<LogMethod>(LoggerLevel.WARN, this);
    }

    public get error(): LogMethod {
        return this.factory.createLogger<LogMethod>(LoggerLevel.ERROR, this);
    }

    public get level(): LoggerLevel {
        return this.console.minLevel;
    }

    public set level(level: LoggerLevel) {
        this.console.minLevel = level;
    }

    public pipe(...pipelines: Pipeline[]): LoggerService {
        if (this.groupFactory.executePipesGroup) {
            pipelines.forEach((pipeline: Pipeline) => pipeline(this));
        }

        return this;
    }

    public groupCollapsed(title: string, pipeline?: Pipeline): LoggerService {
        this.groupFactory.groupCollapsed(title, pipeline, this, LoggerLevel.INFO);
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
        this.groupFactory.group(title, pipeline, this, LoggerLevel.INFO);
        return this;
    }

    public css(style: string): LoggerService {
        this.cssFactory.style = style;
        return this;
    }

    public prettyJSON(json: any): string[] {
        json = JSON.stringify(json, null, 2);
        return this.jsonFactory.colorsJSON(json);
    }

    public copy(value: any): boolean {
        return this.clipboardFactory.copyData(value);
    }

    public cssClass(cssClassName: string): LoggerService {
        this.cssFactory.setClass(cssClassName);
        return this;
    }
}
