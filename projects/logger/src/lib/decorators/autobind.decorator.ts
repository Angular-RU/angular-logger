import { Any, Fn, ObjectKeyMap } from '../logger.interfaces';

const { getPrototypeOf }: ObjectKeyMap = Object;
let mapStore: ObjectKeyMap;

const { defineProperty, getOwnPropertyDescriptor, getOwnPropertyNames, getOwnPropertySymbols }: ObjectKeyMap = Object;

function getBoundSuper(obj: ObjectKeyMap, fn: Fn): Fn {
    if (typeof WeakMap === 'undefined') {
        throw new Error(
            `Using @autobind on ${fn.name}() requires WeakMap support due to its use of super.${fn.name}()
      See https://github.com/jayphelps/core-decorators.js/issues/20`
        );
    }

    if (!mapStore) {
        mapStore = new WeakMap();
    }

    if (mapStore.has(obj) === false) {
        mapStore.set(obj, new WeakMap());
    }

    const superStore: ObjectKeyMap = mapStore.get(obj);

    if (superStore.has(fn) === false) {
        superStore.set(fn, bind(fn, obj));
    }

    return superStore.get(fn);
}

function bind(fn: Fn, context: Any): Fn {
    if (fn.bind) {
        return fn.bind(context);
    } else {
        return function __autobind__(): Fn {
            return fn.apply(context, arguments);
        };
    }
}

const getOwnKeys: Any = getOwnPropertySymbols
    ? function(object: ObjectKeyMap): string[] {
          return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
      }
    : getOwnPropertyNames;

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
    if (typeof fn !== 'function') {
        throw new SyntaxError(`@autobind can only be used on functions, not: ${fn}`);
    }

    const { constructor }: Any = target;

    return {
        configurable,
        enumerable,

        get(): Fn {
            // Class.prototype.key lookup
            // Someone accesses the property directly on the prototype on which it is
            // actually defined on, i.e. Class.prototype.hasOwnProperty(key)
            if (this === target) {
                return fn;
            }

            // Class.prototype.key lookup
            // Someone accesses the property directly on a prototype but it was found
            // up the chain, not defined directly on it
            // i.e. Class.prototype.hasOwnProperty(key) == false && key in Class.prototype
            if (this.constructor !== constructor && getPrototypeOf(this).constructor === constructor) {
                return fn;
            }

            // Autobound method calling super.sameMethod() which is also autobound and so on.
            if (this.constructor !== constructor && key in this.constructor.prototype) {
                return getBoundSuper(this, fn);
            }

            const boundFn: Fn = bind(fn, this);

            defineProperty(this, key, {
                configurable: true,
                writable: true,
                // NOT enumerable when it's a bound method
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
            // IS enumerable when reassigned by the outside word
            enumerable: true,
            value: newValue
        });

        return newValue;
    };
}
