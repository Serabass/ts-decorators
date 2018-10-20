export function wrap(fn: (next: Function, ...args: any[]) => any): MethodDecorator {
    return function(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const next = descriptor.value;
        descriptor.value = function(...args: any[]) {
            fn.call(this, next.bind(this), ...args);
        };
    };
}
