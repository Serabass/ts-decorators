import { CacheDriver } from './CacheDriver';
import { CacheItem } from './cacheItem';

export class MemoryCacheDriver<T> extends CacheDriver<T> {
    private data: any = {};

    async has(key: string): Promise<boolean> {
        return key in this.data;
    }

    async get(key: string): Promise<CacheItem<T>> {
        return this.data[key];
    }

    async set(key: string, value: any, time: number): Promise<void> {
        let expireTime: number = Date.now() + time;
        this.data[key] = {
            value, expireTime
        };
        return;
    }

    async delete(key: string): Promise<void> {
        delete this.data[key];
    }
}
