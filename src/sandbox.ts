import * as request from 'request-promise';
import cachedMethod from './decorators/cachedMethod/cachedMethod';

class Example {
    @cachedMethod({
        time: '60s'
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

    @cachedMethod({
        time: 1000 * 60
    })
    public add(a: number, b: number): number {
        return a + b;
    }
}

(async () => {
    let example = new Example();
    let a = await example.add(1, 5);
    debugger;
    let b = await example.add(1, 5);
    debugger;
})();