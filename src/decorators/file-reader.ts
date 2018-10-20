import * as fs from 'fs-extra';

export type FileReaderDecoratorOptions<R> = {
    fileName?: '1.txt',
    resolve?: (buffer: Buffer, options: any) => R;
};

export function fileReader<R>(options: FileReaderDecoratorOptions<R>) {
    if (!options.resolve) {
        options.resolve = <any>((buffer: R, options: any) => {
            return buffer;
        });
    }
    return function(target: Object, propertyKey: string | symbol) {
        (target as any)[propertyKey] = async function(fileName?: string) {
            if (!fileName) {
                fileName = options.fileName;
            }
            let data = await fs.readFile(fileName);
            return options.resolve(data, options);
        };
    };
}

export type FileReaderFunction<T> = (fileName?: string) => Promise<T>;

class Example {
    @fileReader<string>({
        fileName: '1.txt',
        resolve: (buffer: Buffer, options: any) => {
            return buffer.toString();
        }
    })
    public read: FileReaderFunction<string>;
}

// (new Example).read().then(res => {
//     // res === <file contents>
// });