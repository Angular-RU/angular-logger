import { LoggerService } from '../src/lib/logger.service';
import { ConsoleFake, TestLoggerLineType } from './helpers/console-fake';
import { LoggerLevel } from '../src/lib/logger.config';
import { TestBed } from '@angular/core/testing';
import { LoggerModule } from '../src/lib/logger.module';

describe('[TEST]: Check style', () => {
    let logger: LoggerService;
    const fakeConsole: Console & ConsoleFake = new ConsoleFake();

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [
                LoggerModule.forRoot({
                    instance: fakeConsole,
                    cssClassMap: {
                        // tslint:disable-next-line:no-duplicate-string
                        'class-1': 'font-weight: bold',
                        // tslint:disable-next-line:no-duplicate-string
                        'class-2': 'text-decoration: line-through',
                        'class-3': 'color: #666'
                    }
                })
            ]
        });

        logger = TestBed.get(LoggerService);
    });

    beforeEach(() => logger.clear());

    it(`Set style another console line `, () => {
        logger.level = LoggerLevel.ALL;

        logger.css('color: red; text-decoration: underline; font-weight: bold').info(`It's awesome`);

        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack({
                [TestLoggerLineType.INFO]: ['color: red; text-decoration: underline; font-weight: bold', `It's awesome`]
            })
        );
    });

    it('Add css class', () => {
        logger.cssClass('class-1 class-3').log('Hello world');

        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack({
                [TestLoggerLineType.LOG]: ['%c%s', 'font-weight: bold; color: #666', 'Hello world']
            })
        );

        logger.clear();

        logger.cssClass('class-2').debug('Test 2');
        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack({ [TestLoggerLineType.DEBUG]: ['text-decoration: line-through', 'Test 2'] })
        );
    });

    it('Clear line style', () => {
        // with style
        logger.css('font-weight: bold');
        expect(logger.getCurrentLineStyle()).toEqual('font-weight: bold');

        // without style
        logger.css('font-weight: bold');
        logger.clearCssCurrentLine();
        expect(logger.getCurrentLineStyle()).toEqual('');
    });

    it('Get current line style', () => {
        logger.css('text-transform: uppercase, font-weight: bold, font-size: 12px, margin: 10px, padding: 10px');

        expect(logger.getCurrentLineStyle()).toEqual(
            'text-transform: uppercase, font-weight: bold, font-size: 12px, margin: 10px, padding: 10px'
        );
    });

    it('do not get styles', () => {
        logger.cssClass('').debug('test string');

        expect(logger.getCurrentLineStyle()).toEqual('');
    });
});

describe('[TEST]: Check style', () => {
    let logger: LoggerService;
    const fakeConsole: Console & ConsoleFake = new ConsoleFake();

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [
                LoggerModule.forRoot({
                    instance: fakeConsole,
                    globalLineStyle: 'color: violet, font-weight: bold, font-size: 12px'
                })
            ]
        });

        logger = TestBed.get(LoggerService);
    });

    beforeEach(() => logger.clear());

    it('do not get styles v2', () => {
        logger.css('').debug('test string');

        expect(logger.getCurrentLineStyle()).toEqual('');
    });
});
