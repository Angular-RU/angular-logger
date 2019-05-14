/* tslint:disable */
export enum TestLoggerLineType {
    TABLE = 'table',
    ASSERT = 'assert',
    TRACE = 'debug',
    DEBUG = 'info',
    LOG = 'log',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error'
}

export enum TestLoggerGroupType {
    GROUP_OPEN = 'group_open',
    GROUP_COLLAPSED_OPEN = 'group_collapsed_open',
    GROUP_END = 'group_end'
}

export const LoggerInjector = {
    referenceConsole: {},

    patch() {
        const that = this;
        const consoleForTest = {} as any;
        this.referenceConsole = consoleForTest;
        consoleForTest.history = [];

        consoleForTest.assert = function(condition, output) {
            if (!condition) {
                that.referenceConsole.history.push({
                    [TestLoggerLineType.ASSERT]: [output]
                });
            }
        };

        consoleForTest.table = function(data) {
            that.referenceConsole.history.push({
                [TestLoggerLineType.TABLE]: [data]
            });
        };

        consoleForTest.debug = function() {
            const args = Array.prototype.slice.call(arguments);
            that.referenceConsole.history.push({
                [TestLoggerLineType.TRACE]: args
            });
        };

        consoleForTest.log = function(): void {
            const args = Array.prototype.slice.call(arguments);
            args.unshift(null, null);
            that.referenceConsole.history.push({
                [TestLoggerLineType.LOG]: args
            });
        };

        consoleForTest.info = function() {
            const args = Array.prototype.slice.call(arguments);
            that.referenceConsole.history.push({
                [TestLoggerLineType.INFO]: args
            });
        };

        consoleForTest.warn = function() {
            const args = Array.prototype.slice.call(arguments);
            that.referenceConsole.history.push({
                [TestLoggerLineType.WARN]: args
            });
        };

        consoleForTest.error = function() {
            const args = Array.prototype.slice.call(arguments);
            that.referenceConsole.history.push({
                [TestLoggerLineType.ERROR]: args
            });
        };

        consoleForTest.group = function() {
            const args = Array.prototype.slice.call(arguments);
            that.referenceConsole.history.push({
                [TestLoggerGroupType.GROUP_OPEN]: args[0]
            });
        };

        consoleForTest.groupCollapsed = function() {
            const args = Array.prototype.slice.call(arguments);
            that.referenceConsole.history.push({
                [TestLoggerGroupType.GROUP_COLLAPSED_OPEN]: args[0]
            });
        };

        consoleForTest.groupEnd = function() {
            const args = Array.prototype.slice.call(arguments);
            that.referenceConsole.history.push({
                [TestLoggerGroupType.GROUP_END]: args
            });
        };

        consoleForTest.clear = function() {
            that.referenceConsole.history = [];
        };

        return that.referenceConsole;
    },

    createStack(...args: any[]) {
        return JSON.stringify(args);
    },

    stack(withoutLabel: number = 2) {
        const history = Object.assign([], this.referenceConsole.history);
        history.forEach((line: object, index: number) => {
            for (const arg in line) {
                if (line.hasOwnProperty(arg)) {
                    history[index] = { [arg]: line[arg].slice(withoutLabel) };
                }
            }
        });

        return JSON.stringify(history);
    },

    stackList(stack) {
        const stackObject = JSON.parse(stack);
        const stackList = [];

        stackObject.forEach((line)  => {
            for (const levelLog in line) {
                if (line.hasOwnProperty(levelLog)) {
                    stackList.push(line[levelLog]);
                }
            }
        });

        return stackList;
    },

    stackOptionsList(usageNext: boolean = false) {
        const stackList = this.stackList(this.stack(0));
        const stackOptionsList = [];

        stackList.forEach((line) => {
            stackOptionsList.push({
                label: String(line[0]).replace('%c', ''),
                styles: this.parseCssString(line[usageNext ? 2 : 1])
            });
        });

        return stackOptionsList;
    },

    parseCssString(css) {
        const result = {};
        const attributes = css.split(';');

        for (let i = 0; i < attributes.length; i++) {
            const entry = attributes[i].split(':');
            const property = String(entry.splice(0, 1)[0]).trim();
            const options = entry.join(':').trim();
            if (property.length) {
                result[property] = options;
            }
        }

        return result;
    }
};
