
import config from 'config';

let msg = 'hello, world';
if (config.has('msg'))
    msg = config.get<string>('msg');
    
console.log(msg);