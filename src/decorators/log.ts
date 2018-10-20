export function log(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const next = descriptor.value;
    descriptor.value = function(...args: any[]) {
        console.log(`Calling [${this.constructor.name}.${next.name}] with args: ${JSON.stringify(args)}`);
        let result = next.call(this, ...args);
        console.log(`Result: ${result}`);
        return result;
    };
}
