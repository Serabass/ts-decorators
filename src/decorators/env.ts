import 'reflect-metadata';
import ProcessEnv = NodeJS.ProcessEnv;

function env(key: keyof ProcessEnv): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol) {
        target[propertyKey] = process.env[key];
    };
}

class X {
    @env('HOMEPATH')
    public HOMEPATH: string;

    @env('ProgramData')
    public ProgramData: string;
}

let x = new X();
console.log(x.HOMEPATH);
console.log(x.ProgramData);
debugger;
