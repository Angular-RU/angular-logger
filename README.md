# ClientLogger

> Lightweight and configurable JavaScript logger (written on TypeScript)

## Motivation

This logger is a handy tool that can be useful in the design and development of the enterprise application level. Easy
setting of logging levels and convenient work with groups. Among other things, you can use meta programming
(decorators).

## Usage

You could easily use this Logger in the browser. You only need to install the package and import it in your scripts
before assembly. To see how to use the Logger please follow that's [link]().

You can also run the examples on webpack:

```ts
import { ClientLogger } from '@splincode/client-logger';

const logger = new ClientLogger();
```

## Table of contents

-   [Logging](#)
    -   [Basic usage API `trace`, `debug`, `info`, `warn`. `error`](#example-basic-methods)
    -   [Groups, `groupCollapsed`, `collapsible`](#example-groups)
    -   [Nested groups (usage pipe method)](#example-nested-groups)
    -   [Set logging level (worked in single or groups)](#example-set-minimal-logging-level)
    -   [Customization style line](#example-set-style-line)
    -   [Customization global style line](#example-set-global-style-line)
    -   [Add css classes](#example-css-classes)
    -   [Output pretty json `stringify`](#example-pretty-json)
    -   [Copy `json, object, text` to clipboard](#example-clipboard)
    -   [Configuration `ClientLogger`](#example-full-configurations)
-   [Todo](#todo)

## Logging

![](https://habrastorage.org/webt/xi/ku/d9/xikud9fkxwng2ndu66f_c8yolag.gif)

### Example: basic methods

```typescript
import { LoggerService } from '@angular-ru/logger';

export class AppComponent {
    constructor(private readonly logger: LoggerService) {}

    public showExample(): void {
        this.logger.trace('trace is worked', 1, { a: 1 });
        this.logger.debug('debug is worked', 2, {});
        this.logger.info('info is worked', 3, Object);
        this.logger.warn('warn is worked', 4, String);
        this.logger.error('error is worked', 5, (2.55).toFixed());
    }
}
```

-   **Default level: All**

![](https://habrastorage.org/webt/0u/yj/1t/0uyj1tli-mzh0cor1cg4jwphsdk.png)

-   **Disable trace on console (filter):**

```typescript
import { LoggerService } from '@angular-ru/logger';

export class AppComponent {
    constructor(private readonly logger: LoggerService) {}

    public showExample(): void {
        this.logger.group(
            'Show trace in opened group',
            ({ trace }: LoggerService): void => {
                for (let i: number = 0; i < 20; i++) {
                    trace(this.traceIsWork, i);
                }
            }
        );
    }
}
```

![](https://habrastorage.org/webt/un/fl/81/unfl81h_wjnltr184of-vx1skio.gif)

### Example: groups

-   **Logger groups with auto closed (usage callback):**

```typescript
import { LoggerService } from '@angular-ru/logger';

export class AppComponent {
    constructor(private readonly logger: LoggerService) {}

    public showExample(): void {
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
}
```

![](https://habrastorage.org/webt/oo/ob/uh/ooobuhwfa3ncpctwirtirgmth6y.png)

### Example: nested groups

-   **Logger nested groups (with pipe):**

```typescript
import { LoggerService } from '@angular-ru/logger';

export class AppComponent {
    constructor(private readonly logger: LoggerService) {}

    public showExample(): void {
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
}
```

![](https://habrastorage.org/webt/77/vi/gm/77vigmltfbdmxhiruv8xgxwjdrg.gif)

### Example: set minimal logging level

Basic parameterization

```typescript
import { LoggerService } from '@angular-ru/logger';

export class AppComponent {
    constructor(private readonly logger: LoggerService) {}

    public showExample(): void {
        this.logger.trace(this.traceIsWork, 1, { a: 1 });
        this.logger.debug(this.debugIsWork, 2, console);
        this.logger.info(this.infoIsWork, 3, Object);
        this.logger.warn(this.warnIsWork, 4, String);
        this.logger.error(this.errorIsWork, 5, (2.55).toFixed());

        this.logger.level = LoggerLevel.INFO;
        this.logger.log('Set new logger level');

        this.logger.trace(this.traceIsWork, 1, { a: 1 });
        this.logger.debug(this.debugIsWork, 2, console);
        this.logger.info(this.infoIsWork, 3, Object);
        this.logger.warn(this.warnIsWork, 4, String);
        this.logger.error(this.errorIsWork, 5, (2.55).toFixed());
    }
}
```

![](https://habrastorage.org/webt/0r/ya/xn/0ryaxnmaedlbc14imvodsezq4lg.png)

-   **Logger level groups (pretty usage API):**

```typescript
import { LoggerService } from '@angular-ru/logger';

export class AppComponent {
    constructor(private readonly logger: LoggerService) {}

    public showExample8(): any {
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
}
```

![](https://habrastorage.org/webt/x-/lm/pl/x-lmplcexk_nd0icuqe6ehslub4.png)

### Example: set style line

```typescript
import { LoggerService } from '@angular-ru/logger';

export class AppComponent {
    constructor(private readonly logger: LoggerService) {}

    public showExample5(): void {
        this.logger.clear();

        this.logger.css('text-transform: uppercase; font-weight: bold').debug('window current ', window);

        this.logger.css('color: red; text-decoration: underline; font-weight: bold').info('It is awesome logger');

        this.logger.debug({ a: 1 });

        this.logger.warn(setStyle);
        this.logger.info('For global configuration, use the constructor parameters');
    }
}
```

![](https://habrastorage.org/webt/8b/dn/nv/8bdnnvsgj1m2rxnssviqptks874.png)

### Example: set global style line

```typescript
import { LoggerService } from '@angular-ru/logger';

export class AppComponent {
    constructor(private readonly logger: LoggerService) {}

    public showExample(): void {
        this.logger.clear();

        this.logger.css('font-weight: normal; text-decoration: none; font-style: italic;').info(3.14);
        this.logger.css('font-weight: normal;').info(3.14);
        this.logger.warn('global format with style!');
    }
}
```

![](https://habrastorage.org/webt/y4/wm/vz/y4wmvzvsmtzt6zdqjcupxqmvodm.png)

### Example: CSS classes

```typescript
import { LoggerService } from '@angular-ru/logger';

export class AppComponent {
    constructor(private readonly logger: LoggerService) {}

    public showExample(): void {
        this.logger.cssClass('bold line-through').log('JavaScript sucks', 'JavaScript is the best');

        this.logger
            .cssClass('code-sandbox')
            .log('\n   @Component({ .. })' + '\n   export class AppComponent { .. }    \n\n');

        this.logger.cssClass('bold line-through').debug('JavaScript sucks', 'JavaScript is the best');
    }
}
```

![](https://habrastorage.org/webt/d5/tm/aa/d5tmaaomjql5px_wkzxnodhacnk.png)

### Example: pretty json

```typescript
import { LoggerService } from '@angular-ru/logger';

export class AppComponent {
    constructor(private readonly logger: LoggerService) {}

    public showExample(): void {
        // default browser print json
        this.logger.debug('Classic output json', jsonExample);

        // for pretty json usage logger.log method
        this.logger.log(...this.logger.prettyJSON(jsonExample));
    }
}
```

![](https://habrastorage.org/webt/eo/ej/k5/eoejk5t_hqvo2xeaitkbzm43grm.png)

### Example: clipboard

```typescript
import { LoggerService } from '@angular-ru/logger';

export class AppComponent {
    constructor(private readonly logger: LoggerService) {}

    public showExample(): void {
        const example: string = 'test string';
        this.logger.log(example);
        this.logger.copy(example);
    }
}
```

![](https://habrastorage.org/webt/nq/uo/0z/nquo0zs2_tbvpxkaut4eavh-qeq.gif)

### Example: full configurations

```ts
import { LoggerModule } from '@angular-ru/logger';

@NgModule({
    // ..
    imports: [
        LoggerModule.forRoot({
            useLevelGroup: true,
            globalLineStyle: 'color: red; text-decoration: underline; font-weight: bold; font-size: 15px',
            cssClassMap: {
                bold: 'font-weight: bold',
                'line-through': 'text-decoration: line-through',
                'code-sandbox': `
                  color: #666;
                  background: #f4f4f4;
                  border-left: 3px solid #f36d33;
                  font-family: monospace;
                  font-size: 15px;`
            },
            labelNames: {
                [LoggerLevel.TRACE]: '[trace]',
                [LoggerLevel.DEBUG]: '[debug]',
                [LoggerLevel.INFO]: '[info]',
                [LoggerLevel.WARN]: '[warn]',
                [LoggerLevel.ERROR]: '[error]'
            },
            labelColors: {
                [LoggerLevel.TRACE]: 'violet',
                [LoggerLevel.DEBUG]: 'black',
                [LoggerLevel.INFO]: 'tomato',
                [LoggerLevel.WARN]: 'green',
                [LoggerLevel.ERROR]: 'cyan'
            }
        })
    ]
    // ..
})
export class AppModule {}
```

```ts
import { LoggerService } from '@angular-ru/logger';

export class AppComponent {
    constructor(private readonly logger: LoggerService) {}

    public showExample(): void {
        this.logger.log('Example');
        this.logger.trace(this.traceIsWork, 1, { a: 1 });
        this.logger.debug(this.debugIsWork, 2, console);
        this.logger.info(this.infoIsWork, 3, Object);
        this.logger.warn(this.warnIsWork, 4, String);
        this.logger.error(this.errorIsWork, 5, (2.55).toFixed());
    }
}
```

![](https://habrastorage.org/webt/we/vi/xw/wevixwtlrik5gqxfif2wadprura.png)

## Todo

-   [x] Override console
-   [x] Logger method (trace, debug, info, warning, error)
-   [x] Logger group + groupCollapsible (pipes)
-   [x] Logger pretty write object
-   [x] Set style by css
-   [x] Logger level groups (trace, debug, info, warn, error)
-   [x] Clipboard data
-   [x] Set global style
-   [x] Added css classes
-   [x] Dependency Injection for Angular
-   [x] Switch enable/disable default console output
-   [ ] Profiling (memory usage, sizeof, time execute)
-   [ ] Timers (decorator)
-   [ ] Pre process output
-   [ ] Format output console
