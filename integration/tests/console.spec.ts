import { ConsoleFake } from './helpers/console-fake';
import { TestBed } from '@angular/core/testing';
import { LoggerModule } from '../../lib/src/logger.module';
import { ConsoleService } from '../../lib/src/services/console.service';
import { LoggerService } from '../../lib/src/logger.service';
import { LoggerLevel } from '../../lib/src/interfaces/logger.external';

describe('[TEST]: ConsoleService', () => {
    let consoleInternal: ConsoleService;
    const fakeConsole: ConsoleFake = new ConsoleFake();

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

describe('[TEST]: ConsoleService without options', () => {
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

    it(`should be correct minLevel and instance`, () => {
        expect(consoleService.minLevel).toEqual(LoggerLevel.ALL);
        expect(consoleService.instance).toEqual(console);
    });
});
