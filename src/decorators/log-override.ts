
export function logOverride(target: Object, propertyKey: string | symbol) {
    Reflect.set(target, propertyKey, function(...args: any[]) {
        console.log(this, args);
    });
}
