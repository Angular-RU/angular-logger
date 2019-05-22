/* tslint:disable:no-duplicate-string */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoggerLevel, LoggerService } from '@angular-ru/logger';
import * as devtools from 'devtools-detect';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    public isLoaded: boolean;
    public devToolsIsOpen: boolean = devtools.isOpen;

    constructor(private readonly logger: LoggerService) {}

    public ngOnInit(): void {
        this.isLoaded = true;
        window.addEventListener('devtoolschange', (e: devtools.DevToolsEvent) => {
            this.devToolsIsOpen = e.detail.isOpen;
        });
    }

    private readonly traceIsWork: string = 'trace is worked';
    private readonly debugIsWork: string = 'debug is worked';
    private readonly infoIsWork: string = 'info is worked';
    private readonly warnIsWork: string = 'warn is worked';
    private readonly errorIsWork: string = 'error is worked';

    public showExample1(): void {
        this.logger.clear();
        this.logger.css('color: red').log('text', this.traceIsWork, 1, { a: 1 });
        this.logger.debug(this.debugIsWork, 2, console);
        this.logger.info(this.infoIsWork, 3, Object);
        this.logger.warn(this.warnIsWork, 4, String);
        this.logger.error(this.errorIsWork, 5, (2.55).toFixed());
    }

    public showExample2(): void {
        this.logger.clear();

        this.logger.groupCollapsed('EXAMPLE 2: show stack', () => {
            this.logger.trace(this.traceIsWork, 1, { a: 1 });
            this.logger.debug(this.debugIsWork, 2, console);
            this.logger.info(this.infoIsWork, 3, Object);
            this.logger.warn(this.warnIsWork, 4, String);
            this.logger.error(this.errorIsWork, 5, (2.55).toFixed());
        });

        this.logger.group(
            'Show trace in opened group',
            ({ trace }: LoggerService): void => {
                for (let i: number = 0; i < 20; i++) {
                    trace(this.traceIsWork, i);
                }
            }
        );

        this.logger.groupCollapsed(
            'Show trace in collapsed group',
            ({ debug }: LoggerService): void => {
                for (let i: number = 0; i < 15; i++) {
                    debug(this.traceIsWork, i);
                }
            }
        );
    }

    public showExample3(): void {
        this.logger.clear();

        this.logger
            .groupCollapsed('GROUP TEST')
            .pipe(({ trace, debug, info, warn, error }: LoggerService) => {
                trace(this.traceIsWork);
                debug(this.debugIsWork);
                info(this.infoIsWork);
                warn(this.warnIsWork);
                error(this.errorIsWork);
            })
            .close();

        this.logger
            .group('A')
            .pipe(
                ({ trace }: LoggerService) => trace(this.traceIsWork),
                ({ debug }: LoggerService) => debug(this.debugIsWork),
                ({ info }: LoggerService) => info(this.infoIsWork),
                ({ warn }: LoggerService) => warn(this.warnIsWork),
                ({ error }: LoggerService) => error(this.errorIsWork)
            )
            .groupCollapsed('B')
            .pipe(
                ({ trace }: LoggerService) => trace(this.traceIsWork),
                ({ debug }: LoggerService) => debug(this.debugIsWork),
                ({ info }: LoggerService) => info(this.infoIsWork),
                ({ warn }: LoggerService) => warn(this.warnIsWork),
                ({ error }: LoggerService) => error(this.errorIsWork)
            )
            .group('C')
            .pipe(
                ({ trace }: LoggerService) => trace(this.traceIsWork),
                ({ debug }: LoggerService) => debug(this.debugIsWork),
                ({ info }: LoggerService) => info(this.infoIsWork),
                ({ warn }: LoggerService) => warn(this.warnIsWork),
                ({ error }: LoggerService) => error(this.errorIsWork)
            )
            .closeAll();
    }

    public showExample4(): void {
        this.logger.clear();

        this.logger.level = LoggerLevel.INFO;

        this.logger.log('log is working', 1, String);
        this.logger.trace(this.traceIsWork, 4, String);
        this.logger.debug(this.debugIsWork, 4, String);
        this.logger.warn(this.warnIsWork, 4, String);
        this.logger.error(this.errorIsWork, 5, (2.55).toFixed());

        this.logger.level = LoggerLevel.ALL;
    }

    public showExample5(): void {
        this.logger.clear();

        this.logger.css('text-transform: uppercase; font-weight: bold').debug('window current ', window);

        this.logger.css('color: red; text-decoration: underline; font-weight: bold').info('It is awesome logger');

        this.logger.debug({ a: 1 });

        this.logger.warn('logger.css(...) does not define a global format!');
        this.logger.info('For global configuration, use the constructor parameters');
    }

    public showExample6(): void {
        this.logger.clear();
        const jsonExample: object = {
            id: 1,
            hello: 'world'
        };

        // default browser print json
        this.logger.debug('Classic output json', jsonExample);

        // for pretty json usage logger.log method
        this.logger.log(...this.logger.prettyJSON(jsonExample));
    }

    public showExample7(): any {
        this.logger.clear();
        const example: string = 'your mom.';
        this.logger.log(example);
    }

    public showExample8(): any {
        this.logger.clear();
        this.logger.level = LoggerLevel.INFO;

        this.logger.trace
            .group('A')
            .pipe(
                ({ trace }: LoggerService) => trace(this.traceIsWork),
                ({ debug }: LoggerService) => debug(this.debugIsWork),
                ({ info }: LoggerService) => info(this.infoIsWork),
                ({ warn }: LoggerService) => warn(this.warnIsWork),
                ({ error }: LoggerService) => error(this.errorIsWork)
            )
            .close()

            .debug.group('B')
            .pipe(
                ({ trace }: LoggerService) => trace(this.traceIsWork),
                ({ debug }: LoggerService) => debug(this.debugIsWork),
                ({ info }: LoggerService) => info(this.infoIsWork),
                ({ warn }: LoggerService) => warn(this.warnIsWork),
                ({ error }: LoggerService) => error(this.errorIsWork)
            )
            .close()

            .info.group('C')
            .pipe(
                ({ trace }: LoggerService) => trace(this.traceIsWork),
                ({ debug }: LoggerService) => debug(this.debugIsWork),
                ({ info }: LoggerService) => info(this.infoIsWork),
                ({ warn }: LoggerService) => warn(this.warnIsWork),
                ({ error }: LoggerService) => error(this.errorIsWork)
            )
            .close()

            .warn.group('D')
            .pipe(
                ({ trace }: LoggerService) => trace(this.traceIsWork),
                ({ debug }: LoggerService) => debug(this.debugIsWork),
                ({ info }: LoggerService) => info(this.infoIsWork),
                ({ warn }: LoggerService) => warn(this.warnIsWork),
                ({ error }: LoggerService) => error(this.errorIsWork)
            )
            .close()

            .error.group('E')
            .pipe(
                ({ trace }: LoggerService) => trace(this.traceIsWork),
                ({ debug }: LoggerService) => debug(this.debugIsWork),
                ({ info }: LoggerService) => info(this.infoIsWork),
                ({ warn }: LoggerService) => warn(this.warnIsWork),
                ({ error }: LoggerService) => error(this.errorIsWork)
            )
            .close();

        this.logger.level = LoggerLevel.ALL;
    }

    public showExample9(): void {
        this.logger.clear();

        this.logger.css('font-weight: normal; text-decoration: none; color: blue; font-style: italic;').info(3.14);
    }

    public showExample10(): void {
        this.logger.clear();

        this.logger.cssClass('bold line-through').debug('JavaScript sucks', 'JavaScript is the best');
    }
}
