import { ICacheDriver } from './ICacheDriver';
import { CacheItem } from './cacheItem';

export abstract class CacheDriver<T> implements ICacheDriver<T> {
    public async remember(key: string, time: number, fn: () => Promise<T>): Promise<T> {
        if (await this.has(key)) {
            let time = Date.now();
            let data: CacheItem<T> = await this.get(key);

            if (data.expireTime > time) {
                return data.value;
            }

            await this.delete(key);
        }

        let value = await fn();
        await this.set(key, value, time);

        return value;
    }

    abstract has(key: string): Promise<boolean>;

    abstract get(key: string): Promise<CacheItem<T>>;

    abstract set(key: string, value: T, time: number): Promise<void>;

    abstract delete(key: string): Promise<void>;
}
