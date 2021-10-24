# NodeJs With TS Start Up

for note for starting ts project.
> make project for node-ts  

when typescript intall to local repo.

```shell
nolleh$ yarn add --dev typescript # install. and makes package.json
nolleh$ npx tsc --init # makes tsconfig.json
```

## 1. adjust ts configuration
``tsconfig.json``
```json
{
    "rootDir": "./src",  /* Specify the root folder within your source files. */
    "baseUrl": "./src",  /* Specify the base directory to resolve non-relative module names. */
    "outDir": "./build", /* Specify an output folder for all emitted files. */
}
```

## 2. add script

```shell
nolleh$ yarn add --dev nodemon
nolleh$ yarn add --dev ts-node
```

``package.json``
```json
{
  "scripts": {
    "build": "tsc",
    "start": "nodemon --watch 'src/**/*' -e ts,tsx --exec ts-node ./src/app.ts",
    "test": "jest --detectOpenHandles --forceExit"
  },
}
```

now, you can start with start command.
```shell
nolleh$ yarn start

yarn run v1.17.3
warning package.json: No license field
$ nodemon --watch 'src/**/*' -e ts,tsx --exec ts-node ./src/app.ts
[nodemon] 2.0.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src/**/*
[nodemon] watching extensions: ts,tsx
[nodemon] starting `ts-node ./src/app.ts`
[nodemon] clean exit - waiting for changes before restart

```

## 3. add jest
```shell
nolleh$ yarn add --dev jest 
nolleh$ yarn add --dev @types/jest
nolleh$ yarn add --dev ts-jest
```

``package.json``

```json
"jest": {
    "transform": {
      "^.+\\.ts$": "ts-jest"
    },
    "testRegex": "\\.test\\.ts$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "json"
    ],
    "globals": {
      "ts-jest": {
        "diagnostics": true
      }
    }
  },
```

``src/__tests__/my-awesome.test.ts``
```ts
test('awesome! test!', () => {
    expect('nolleh').toBe('nolleh');
});
```

and now, you can test your code.
( as expected, nolleh remains as nolleh... )

```shell

nolleh$ yarn test
yarn run v1.17.3
$ jest --detectOpenHandles --forceExit
 PASS  src/__tests__/my-awesome.test.ts
  ✓ awesome! test! (5 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.554 s
Ran all test suites.
✨  Done in 4.15s.

```
## 4. makes app configuration

```shell
nolleh$ yarn add config
nolleh$ yarn add --dev @types/config
```

``config/default.json``

```json
{
    "msg":"hello, world msg from configuraion."
}
```

now, read from this configuations data, and spit out in code.

``src/app.ts``
```ts

import config from 'config';

let msg = 'hello, world';
if (config.has('msg'))
    msg = config.get<string>('msg');
    
console.log(msg);

```

and, now you can see configuarions message.

```shell
yarn start
yarn run v1.17.3
$ nodemon --watch 'src/**/*' -e ts,tsx --exec ts-node ./src/app.ts
[nodemon] 2.0.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): src/**/*
[nodemon] watching extensions: ts,tsx
[nodemon] starting `ts-node ./src/app.ts`
hello, world msg from configuraion.
[nodemon] clean exit - waiting for changes before restart
```

done!  
enjoy happy coding!

---

## applendix

### 1. yarn.lock

https://github.com/yarnpkg/yarn/issues/1583

> should I need to put yarn.lock in .gitignore?


>>
>> You should add yarn.lock to your git, don't ignore it.

>> See https://yarnpkg.com/en/docs/migrating-from-npm

>> When you run either yarn or yarn add <package>, Yarn will generate a yarn.lock file within the root directory of your package. You don’t need to read or understand this file - just check it into source control. When other people start using Yarn instead of npm, the yarn.lock file will ensure that they get precisely the same dependencies as you have.
