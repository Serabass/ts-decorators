import { CacheItem } from './cacheItem';

export interface ICacheDriver<T> {
    remember(key: string, time: number, fn: () => Promise<T>): Promise<T>;

    has(key: string): Promise<boolean>;

    get(key: string): Promise<CacheItem<T>>;

    set(key: string, value: T, time: number): Promise<void>;

    delete(key: string): Promise<void>;
}
