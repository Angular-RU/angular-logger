import { Component } from '@angular/core';
import { LoggerService } from '../projects/logger/src/lib/logger.service';
import { Logger } from '../projects/logger/src/lib/decorators/logger.decorator';
import { Debug } from '../projects/logger/src/lib/decorators/debug.decorator';
import { Trace } from '../projects/logger/src/lib/decorators/trace.decorator';
import { Info } from '../projects/logger/src/lib/decorators/info.decorator';
import { Error } from '../projects/logger/src/lib/decorators/error.decorator';
import { Warn } from '../projects/logger/src/lib/decorators/warn.decorator';
import { Log } from '../projects/logger/src/lib/decorators/log.decorator';
import { Group } from '../projects/logger/src/lib/decorators/groups/group.decorator';
import { GroupCollapsed } from '../projects/logger/src/lib/decorators/groups/group-collapsed.decorator';
import { LoggerLevel } from '../projects/logger/src/lib/logger.config';
import { LogFn } from '@angular-ru/logger';

@Component({
    selector: 'lib-hello-test',
    template: ''
})
export class MyTestComponent {
    @Logger() public loggerInjection: LoggerService;
    @Trace() public trace: LogFn;
    @Debug() public debug: LogFn;
    @Info() public info: LogFn;
    @Error() public error: LogFn;
    @Warn() public warn: LogFn;
    @Log() public log: LogFn;

    public count: number = 0;

    @Group('Test group')
    public print(val: string): string {
        this.loggerInjection.log(val);
        return val;
    }

    @Group('Test group', LoggerLevel.WARN)
    public printLevel(val: string): string {
        this.loggerInjection.log(val);
        return val;
    }

    @GroupCollapsed('Test group-collapsed')
    public printCollapsed(val: string): string {
        this.loggerInjection.log(val);
        return val;
    }

    @GroupCollapsed('Test group-collapsed', LoggerLevel.WARN)
    public printCollapsedLevel(val: string): string {
        this.loggerInjection.log(val);
        return val;
    }

    public init(): void {
        this.loggerInjection.level = LoggerLevel.INFO;
        this.increment();
    }

    @Group('INCREMENT', LoggerLevel.DEBUG)
    public increment(): void {
        this.loggerInjection.debug('count', this.count);
        this.count++;
    }

    @Group((name: string) => `Test group with ${name}`)
    public method(name: string): string {
        this.loggerInjection.log('group is worked');
        return name;
    }
}
