import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoggerLevel, LoggerService } from '@angular-ru/logger';
import * as devtools from 'devtools-detect';
import { DevToolsEvent } from 'devtools-detect';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    public isLoaded: boolean;
    public devToolsIsOpen: boolean = devtools.isOpen;

    constructor(private logger: LoggerService) {}

    public ngOnInit() {
        this.isLoaded = true;
        window.addEventListener('devtoolschange', (e: DevToolsEvent) => {
            this.devToolsIsOpen = e.detail.isOpen;
        });
    }

    showExample1() {
        this.logger.clear();

        this.logger.trace('trace is worked', 1, { a: 1 });
        this.logger.debug('debug is worked', 2, console);
        this.logger.info('info is worked', 3, Object);
        this.logger.warn('warn is worked', 4, String);
        this.logger.error('error is worked', 5, (2.55).toFixed());
    }

    showExample2() {
        this.logger.clear();

        this.logger.groupCollapsed('EXAMPLE 2: show stack', () => {
            this.logger.trace('trace is worked', 1, { a: 1 });
            this.logger.debug('debug is worked', 2, console);
            this.logger.info('info is worked', 3, Object);
            this.logger.warn('warn is worked', 4, String);
            this.logger.error('error is worked', 5, (2.55).toFixed());
        });

        this.logger.group('Show trace in opened group', ({ trace }) => {
            for (let i = 0; i < 20; i++) {
                trace('trace is worked', i);
            }
        });

        this.logger.groupCollapsed(
            'Show trace in collapsed group',
            ({ trace }) => {
                for (let i = 0; i < 20; i++) {
                    trace('trace is worked', i);
                }
            }
        );
    }

    showExample3() {
        this.logger.clear();

        this.logger
            .groupCollapsed('GROUP TEST')
            .pipe(({ trace, debug, info, warn, error }) => {
                trace('trace is worked');
                debug('debug is worked');
                info('info is worked');
                warn('warn is worked');
                error('error is worked');
            })
            .close();

        this.logger
            .group('A')
            .pipe(
                ({ trace }) => trace('trace is worked'),
                ({ debug }) => debug('debug is worked'),
                ({ info }) => info('info is worked'),
                ({ warn }) => warn('warn is worked'),
                ({ error }) => error('error is worked')
            )
            .groupCollapsed('B')
            .pipe(
                ({ trace }) => trace('trace is worked'),
                ({ debug }) => debug('debug is worked'),
                ({ info }) => info('info is worked'),
                ({ warn }) => warn('warn is worked'),
                ({ error }) => error('error is worked')
            )
            .group('C')
            .pipe(
                ({ trace }) => trace('trace is worked'),
                ({ debug }) => debug('debug is worked'),
                ({ info }) => info('info is worked'),
                ({ warn }) => warn('warn is worked'),
                ({ error }) => error('error is worked')
            )
            .closeAll();
    }

    showExample4() {
        this.logger.clear();

        this.logger.level = LoggerLevel.INFO;

        this.logger.trace('trace is worked', 4, String);
        this.logger.debug('debug is worked', 4, String);
        this.logger.warn('warn is worked', 4, String);
        this.logger.error('error is worked', 5, (2.55).toFixed());

        this.logger.level = LoggerLevel.ALL;
    }

    showExample5() {
      this.logger.clear();

      this.logger
        .css('text-transform: uppercase; font-weight: bold')
        .debug('window current ', window);

      this.logger
        .css('color: red; text-decoration: underline; font-weight: bold')
        .info('It is awesome logger');

      this.logger.warn('logger.css(...) does not define a global format!');
      this.logger.info('For global configuration, use the constructor parameters');
    }
}
