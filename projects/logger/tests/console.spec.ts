import { ConsoleFake } from '../../../helpers/console-fake';
import { TestBed } from '@angular/core/testing';
import { LoggerModule } from '../src/lib/logger.module';
import { ConsoleService } from '../src/lib/utils/console.service';

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
