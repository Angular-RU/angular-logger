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

  constructor(readonly logger: LoggerService) {
  }

  public ngOnInit(): void {
    this.isLoaded = true;
    window.addEventListener('devtoolschange', (e: devtools.DevToolsEvent) => {
      this.devToolsIsOpen = e.detail.isOpen;
    });
  }

  public showExample1(): void {
    this.logger.clear();

    this.logger.trace('trace is worked', 1, { a: 1 });
    this.logger.debug('debug is worked', 2, console);
    this.logger.info('info is worked', 3, Object);
    this.logger.warn('warn is worked', 4, String);
    this.logger.error('error is worked', 5, (2.55).toFixed());
  }

  public showExample2(): void {
    this.logger.clear();

    this.logger.groupCollapsed('EXAMPLE 2: show stack', () => {
      this.logger.trace('trace is worked', 1, { a: 1 });
      this.logger.debug('debug is worked', 2, console);
      this.logger.info('info is worked', 3, Object);
      this.logger.warn('warn is worked', 4, String);
      this.logger.error('error is worked', 5, (2.55).toFixed());
    });

    this.logger.group(
      'Show trace in opened group',
      ({ trace }: LoggerService): void => {
        for (let i: number = 0; i < 20; i++) {
          trace('trace is worked', i);
        }
      }
    );

    this.logger.groupCollapsed(
      'Show trace in collapsed group',
      ({ debug }: LoggerService): void => {
        for (let i: number = 0; i < 15; i++) {
          debug('trace is worked', i);
        }
      }
    );
  }

  public showExample3(): void {
    this.logger.clear();

    this.logger
      .groupCollapsed('GROUP TEST')
      .pipe(({ trace, debug, info, warn, error }: LoggerService) => {
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
        ({ trace }: LoggerService) => trace('trace is worked'),
        ({ debug }: LoggerService) => debug('debug is worked'),
        ({ info }: LoggerService) => info('info is worked'),
        ({ warn }: LoggerService) => warn('warn is worked'),
        ({ error }: LoggerService) => error('error is worked')
      )
      .groupCollapsed('B')
      .pipe(
        ({ trace }: LoggerService) => trace('trace is worked'),
        ({ debug }: LoggerService) => debug('debug is worked'),
        ({ info }: LoggerService) => info('info is worked'),
        ({ warn }: LoggerService) => warn('warn is worked'),
        ({ error }: LoggerService) => error('error is worked')
      )
      .group('C')
      .pipe(
        ({ trace }: LoggerService) => trace('trace is worked'),
        ({ debug }: LoggerService) => debug('debug is worked'),
        ({ info }: LoggerService) => info('info is worked'),
        ({ warn }: LoggerService) => warn('warn is worked'),
        ({ error }: LoggerService) => error('error is worked')
      )
      .closeAll();
  }

  public showExample4(): void {
    this.logger.clear();

    this.logger.level = LoggerLevel.INFO;

    this.logger.trace('trace is worked', 4, String);
    this.logger.debug('debug is worked', 4, String);
    this.logger.warn('warn is worked', 4, String);
    this.logger.error('error is worked', 5, (2.55).toFixed());

    this.logger.level = LoggerLevel.ALL;
  }

  public showExample5(): void {
    this.logger.clear();

    this.logger.css('text-transform: uppercase; font-weight: bold').debug('window current ', window);

    this.logger.css('color: red; text-decoration: underline; font-weight: bold').info('It is awesome logger');

    this.logger.debug({ a: 1})

    this.logger.warn('logger.css(...) does not define a global format!');
    this.logger.info('For global configuration, use the constructor parameters');
  }

  public showExample6(): void {
    this.logger.clear();
    const jsonExample  = {
          'id': 1,
          'hello': 'world'
    };

    // default browser print json
    this.logger.debug('Classic output json', jsonExample);

    // for pretty json usage logger.log method
    this.logger.log(...this.logger.prettyJSON(jsonExample));
  }

  public showExample7(): void {
    this.logger.clear();
  }
}
