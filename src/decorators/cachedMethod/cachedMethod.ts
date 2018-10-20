import 'reflect-metadata';
// import * as request from 'request-promise';
import * as timespan from 'timespan-parser';
import * as request from 'request-promise';
import { CacheDriver } from './CacheDriver';
import { MemoryCacheDriver } from './MemoryCacheDriver';

export interface CachedMethodOptions<T> {
    time: number | string;
    driver?: CacheDriver<T>;
    resolveKeyFn?: (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor, args: any[]) => string;
}

export default function cachedMethod<T>(options: CachedMethodOptions<T>): MethodDecorator {
    if (!options.driver) {
        options.driver = new MemoryCacheDriver();
    }

    if (!options.resolveKeyFn) {
        options.resolveKeyFn =
            (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor, args: any[]) =>
                `${target.constructor.name}::${propertyKey}::${JSON.stringify(args)}`;
    }

    if (typeof options.time === 'string') {
        options.time = timespan.parse(options.time, 'msec');
    }

    return function(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        let original = descriptor.value;
        descriptor.value = async function(...args: any[]) {
            let key = options.resolveKeyFn(target, propertyKey, descriptor, args);
            let time = options.time as number;

            return options.driver.remember(key, time, async (): Promise<T> => {
                return await original.call(this, ...args);
            });
        };
    };
}

class Example {
    @cachedMethod({
        time: 1000 * 60
    })
    public async getLuke(): Promise<string> {
        return request.get('https://swapi.co/api/people/1');
    }

    @cachedMethod({
        time: 1000 * 60
    })
    public async getPerson(id: number): Promise<string> {
        let data = await request.get(`https://swapi.co/api/people/${id}`);
        return JSON.parse(data);
    }

    @cachedMethod({
        time: 1000 * 60
    })
    public async getPerson1(id: number): Promise<number> {
        return id;
    }
}

