import { ConsoleFake } from '../../../helpers/console-fake';
import { TestBed } from '@angular/core/testing';
import { LoggerModule } from '../src/lib/logger.module';
import { ConsoleService } from '../src/lib/utils/console.service';
import { LoggerService } from '../src/lib/logger.service';
import { LoggerLevel } from '../src/lib/logger.config';

describe('[TEST]: ConsoleService', () => {
    let consoleInternal: ConsoleService;
    const fakeConsole: Console & ConsoleFake = new ConsoleFake();

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [
                LoggerModule.forRoot({
                    instance: fakeConsole
                })
            ]
        });

        consoleInternal = TestBed.get(ConsoleService);
    });

    it(`check console instance`, () => {
        consoleInternal.console = console;
        expect(consoleInternal.console).toEqual(console);
    });
});

describe('[TEST]: ConsoleService based', () => {
    let logger: LoggerService;
    let consoleService: ConsoleService;

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [LoggerModule.forRoot()]
        });

        logger = TestBed.get(LoggerService);
        consoleService = TestBed.get(ConsoleService);
    });

    it(`should be truthy logger`, () => {
        expect(logger).toBeTruthy();
    });

    it(`should be truthy logger`, () => {
        expect(consoleService.minLevel).toEqual(LoggerLevel.ALL);
        expect(consoleService.instance).toEqual(console);
    });
});
