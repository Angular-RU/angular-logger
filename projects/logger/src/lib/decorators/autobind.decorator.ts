import { Any, Fn, ObjectKeyMap } from '../logger.interfaces';

const { defineProperty, getOwnPropertyDescriptor, getOwnPropertyNames, getOwnPropertySymbols }: ObjectKeyMap = Object;

function bind(fn: Fn, context: Any): Fn {
    return fn.bind(context);
}

function getOwnKeys(descs: ObjectKeyMap): string[] {
    return getOwnPropertyNames(descs).concat(getOwnPropertySymbols(descs));
}

function autobindClass(klass: ObjectKeyMap): Any {
    const descs: ObjectKeyMap = getOwnPropertyDescriptors(klass.prototype);
    const keys: Any = getOwnKeys(descs);

    for (let i: number = 0, l: number = keys.length; i < l; i++) {
        const key: string = keys[i];
        const desc: Any = descs[key];

        if (typeof desc.value !== 'function' || key === 'constructor') {
            continue;
        }

        defineProperty(klass.prototype, key, autobindMethod(klass.prototype, key, desc));
    }
}

function getOwnPropertyDescriptors(obj: ObjectKeyMap): ObjectKeyMap {
    const descs: ObjectKeyMap = {};

    getOwnKeys(obj).forEach((key: Any) => (descs[key] = getOwnPropertyDescriptor(obj, key)));

    return descs;
}

function autobindMethod(target: Any, key: Any, { value: fn, configurable, enumerable }: Any): PropertyDescriptor {
    return {
        configurable,
        enumerable,

        get(): Fn {
            if (this === target) {
                return fn;
            }

            const boundFn: Fn = bind(fn, this);

            defineProperty(this, key, {
                configurable: true,
                writable: true,

                enumerable: false,
                value: boundFn
            });

            return boundFn;
        },
        set: createDefaultSetter(key)
    };
}

function handle(args: Any[]): Fn {
    if (args.length === 1) {
        return autobindClass(args[0]);
    } else {
        // @ts-ignore
        return autobindMethod(...args);
    }
}

export function autobind(...args: Any[]): Any {
    if (args.length === 0) {
        return function(...argsClass: Any[]): Fn {
            return handle(argsClass);
        };
    } else {
        return handle(args);
    }
}

function createDefaultSetter(key: Any): Fn {
    return function set(newValue: unknown): unknown {
        Object.defineProperty(this, key, {
            configurable: true,
            writable: true,
            enumerable: true,
            value: newValue
        });

        return newValue;
    };
}
