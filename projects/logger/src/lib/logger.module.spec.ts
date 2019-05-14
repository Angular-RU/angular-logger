import { TestBed } from '@angular/core/testing';
import { LoggerModule } from './logger.module';
import { LoggerService } from './logger.service';
import { LoggerInjector, TestLoggerLineType } from '../stubs/console';

describe('console', () => {
    let logger: LoggerService;

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [LoggerModule.forRoot({ instance: LoggerInjector.patch()
            })]
        });
        logger = TestBed.get(LoggerService);
    });

    it('should be valid createLogger', () => {
        logger.debug(1, 2, 3);
        expect(LoggerInjector.stack()).toEqual(
            LoggerInjector.createStack({
                [TestLoggerLineType.DEBUG]: [1, 2, 3]
            })
        );
    });
});
