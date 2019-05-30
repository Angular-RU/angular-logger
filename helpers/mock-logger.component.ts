import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoggerLevel } from 'projects/logger/src/lib/logger.config';
import { Timer } from 'projects/logger/src/lib/decorators/timer.decorator';

@Component({
    selector: 'mock-logger',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="hook">{{ hook }}</div>
    `
})
export class MockLoggerComponent implements OnInit {
    public hook: string;
    public doneHeavy: boolean;
    public name: string = 'MockLoggerComponent';

    @Timer('mock:ngOnInit', LoggerLevel.ALL)
    public ngOnInit(): void {
        this.hook = 'ngOnInit';
    }

    @Timer('longQueryBySecond', LoggerLevel.INFO, false)
    public longQueryBySecond(seconds: number, done: any): void {
        const e: number = new Date().getTime() + seconds * 1000;
        while (new Date().getTime() <= e) {
            this.doneHeavy = true;
        }
        done();
    }

    @Timer('badRequest', LoggerLevel.ALL, false)
    public badRequest(): void {
        throw new Error('error');
    }
}
