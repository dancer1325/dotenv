* [dotenvx](https://github.com/dotenvx/dotenvx)
  * allows
    * run encrypted envs
      * anywhere
      * MULTI-environment 

# dotenv [![NPM version](https://img.shields.io/npm/v/dotenv.svg?style=flat-square)](https://www.npmjs.com/package/dotenv)

* Dotenv
  * == 0-dependency module / 💡from a `.env` file -- loads -- environment variables | [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env) 💡
    * == follows [Twelve-Factor App](https://12factor.net/config) methodology

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![LICENSE](https://img.shields.io/github/license/motdotla/dotenv.svg)](LICENSE)
[![codecov](https://codecov.io/gh/motdotla/dotenv-expand/graph/badge.svg?token=pawWEyaMfg)](https://codecov.io/gh/motdotla/dotenv-expand)

* [🌱 Install](#-install)
* [🏗️ Usage (.env)](#%EF%B8%8F-usage)
* [🌴 Multiple Environments 🆕](#-manage-multiple-environments)
* [🚀 Deploying (encryption) 🆕](#-deploying)
* [📚 Examples](#-examples)
* [📖 Docs](#-documentation)
* [❓ FAQ](#-faq)
* [⏱️ Changelog](./CHANGELOG.md)

## 🌱 How to install?

```bash
npm install dotenv --save
# or
yarn add dotenv
# or
bun add dotenv
```

## 🏗️ How to use?
* [video](https://www.youtube.com/watch?v=YtkZR0NFd1g)
* steps
  * create a `.env` file 
    * | your project's root OR
    * if you use monorepos -> | folder / `app.js`, | root
  * import & configure dotenv
    ```
    # 1. -- via -- CommonJS
    require('dotenv').config()
    
    # 2. -- via -- ES6
    import 'dotenv/config'
    ```
    * see [how to use ES6?](#how-do-i-use-dotenv-with-import)

### Multiline values

* requirements
  * `>= v15.0.0`
* ways to specify
  * line breaks DIRECTLY
  * `"\n"`
* use cases
  * private keys

### Comments

* `#`
* if a value contains `#` & `>= v15.0.0` -> `"#"`

### Parsing
* TODO:
The engine which parses the contents of your file containing environment variables is available to use. 
It accepts a String or Buffer and will return an Object with the parsed keys and values.

```javascript
const dotenv = require('dotenv')
const buf = Buffer.from('BASIC=basic')
const config = dotenv.parse(buf) // will return an object
console.log(typeof config, config) // object { BASIC : 'basic' }
```

### Preload

> Note: Consider using [`dotenvx`](https://github.com/dotenvx/dotenvx) instead of preloading.
> I am now doing (and recommending) so.
>
> It serves the same purpose (you do not need to require and load dotenv), 
> adds better debugging, and works with ANY language, framework, or platform. – [motdotla](https://github.com/motdotla)

You can use the `--require` (`-r`) [command line option](https://nodejs.org/api/cli.html#-r---require-module) to preload dotenv. 
By doing this, you do not need to require and load dotenv in your application code.

```bash
$ node -r dotenv/config your_script.js
```

The configuration options below are supported as command line arguments in the format `dotenv_config_<option>=value`

```bash
$ node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/.env dotenv_config_debug=true
```

Additionally, you can use environment variables to set configuration options.
Command line arguments will precede these.

```bash
$ DOTENV_CONFIG_<OPTION>=value node -r dotenv/config your_script.js
```

```bash
$ DOTENV_CONFIG_ENCODING=latin1 DOTENV_CONFIG_DEBUG=true node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/.env
```

### Variable Expansion

You need to add the value of another variable in one of your variables? Use [dotenv-expand](https://github.com/motdotla/dotenv-expand).

### Command Substitution

Use [dotenvx](https://github.com/dotenvx/dotenvx) to use command substitution.

Add the output of a command to one of your variables in your .env file.

```ini
# .env
DATABASE_URL="postgres://$(whoami)@localhost/my_database"
```
```js
// index.js
console.log('DATABASE_URL', process.env.DATABASE_URL)
```
```sh
$ dotenvx run --debug -- node index.js
[dotenvx@0.14.1] injecting env (1) from .env
DATABASE_URL postgres://yourusername@localhost/my_database
```

### Syncing

You need to keep `.env` files in sync between machines, environments, or team members? Use [dotenvx](https://github.com/dotenvx/dotenvx) to encrypt your `.env` files and safely include them in source control. This still subscribes to the twelve-factor app rules by generating a decryption key separate from code.

### Multiple Environments

Use [dotenvx](https://github.com/dotenvx/dotenvx) to generate `.env.ci`, `.env.production` files, and more.

### Deploying

You need to deploy your secrets in a cloud-agnostic manner? Use [dotenvx](https://github.com/dotenvx/dotenvx) to generate a private decryption key that is set on your production server.

## 🌴 Manage Multiple Environments

Use [dotenvx](https://github.com/dotenvx/dotenvx)

Run any environment locally. Create a `.env.ENVIRONMENT` file and use `--env-file` to load it. It's straightforward, yet flexible.

```bash
$ echo "HELLO=production" > .env.production
$ echo "console.log('Hello ' + process.env.HELLO)" > index.js

$ dotenvx run --env-file=.env.production -- node index.js
Hello production
> ^^
```

or with multiple .env files

```bash
$ echo "HELLO=local" > .env.local
$ echo "HELLO=World" > .env
$ echo "console.log('Hello ' + process.env.HELLO)" > index.js

$ dotenvx run --env-file=.env.local --env-file=.env -- node index.js
Hello local
```

[more environment examples](https://dotenvx.com/docs/quickstart/environments)

## 🚀 Deploying

Use [dotenvx](https://github.com/dotenvx/dotenvx).

Add encryption to your `.env` files with a single command. Pass the `--encrypt` flag.

```
$ dotenvx set HELLO Production --encrypt -f .env.production
$ echo "console.log('Hello ' + process.env.HELLO)" > index.js

$ DOTENV_PRIVATE_KEY_PRODUCTION="<.env.production private key>" dotenvx run -- node index.js
[dotenvx] injecting env (2) from .env.production
Hello Production
```

[learn more](https://github.com/dotenvx/dotenvx?tab=readme-ov-file#encryption)

## 📚 Examples

* see 
  * [here](examples)
  * [examples | DIFFERENT frameworks, languages, and configurations](https://github.com/dotenv-org/examples)

## 📖 Documentation

* 👀functions / -- exposed by -- `dotenv` 👀
  * `config`
  * `parse`
  * `populate`
  * `decrypt`

### `config`

* what does it make?
  * read your `.env` file
  * parse the contents,
  * 👀assign the content | [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env) 👀
  * return an Object / 
    * `parsed` key
      * == loaded content
    * `error` key
      * if loaded content failed

#### options == `config(options)`

##### path == `config({path:["pathToEnvFile"]})`

* by default, `path.resolve(process.cwd(), '.env')`
  * == .env | CURRENT working directory
* use cases
  * environment file is located ELSEWHERE
* if you pass MULTIPLE files -> ALL will be taken in account / if key duplicated -> FIRST win
* if you pass MULTIPLE files & `options.override=true` -> ALL will be taken in account / if key duplicated -> LAST win

##### encoding

* TODO:
Default: `utf8`

Specify the encoding of your file containing environment variables.

```js
require('dotenv').config({ encoding: 'latin1' })
```

##### debug

Default: `false`

Turn on logging to help debug why certain keys or values are not being set as you expect.

```js
require('dotenv').config({ debug: process.env.DEBUG })
```

##### override

Default: `false`

Override any environment variables that have already been set on your machine with values from your .env file(s). If multiple files have been provided in `option.path` the override will also be used as each file is combined with the next. Without `override` being set, the first value wins. With `override` set the last value wins. 

```js
require('dotenv').config({ override: true })
```

##### processEnv

Default: `process.env`

Specify an object to write your environment variables to. Defaults to `process.env` environment variables.

```js
const myObject = {}
require('dotenv').config({ processEnv: myObject })

console.log(myObject) // values from .env
console.log(process.env) // this was not changed or written to
```

### `parse`

The engine which parses the contents of your file containing environment
variables is available to use. It accepts a String or Buffer and will return
an Object with the parsed keys and values.

```js
const dotenv = require('dotenv')
const buf = Buffer.from('BASIC=basic')
const config = dotenv.parse(buf) // will return an object
console.log(typeof config, config) // object { BASIC : 'basic' }
```

#### Options

##### debug

Default: `false`

Turn on logging to help debug why certain keys or values are not being set as you expect.

```js
const dotenv = require('dotenv')
const buf = Buffer.from('hello world')
const opt = { debug: true }
const config = dotenv.parse(buf, opt)
// expect a debug message because the buffer is not in KEY=VAL form
```

### `populate`

The engine which populates the contents of your .env file to `process.env` is available for use. It accepts a target, a source, and options. This is useful for power users who want to supply their own objects.

For example, customizing the source:

```js
const dotenv = require('dotenv')
const parsed = { HELLO: 'world' }

dotenv.populate(process.env, parsed)

console.log(process.env.HELLO) // world
```

For example, customizing the source AND target:

```js
const dotenv = require('dotenv')
const parsed = { HELLO: 'universe' }
const target = { HELLO: 'world' } // empty object

dotenv.populate(target, parsed, { override: true, debug: true })

console.log(target) // { HELLO: 'universe' }
```

#### options

##### Debug

Default: `false`

Turn on logging to help debug why certain keys or values are not being populated as you expect.

##### override

Default: `false`

Override any environment variables that have already been set.

## ❓ FAQ

### Why is the `.env` file not loading my environment variables successfully?

Most likely your `.env` file is not in the correct place. [See this stack overflow](https://stackoverflow.com/questions/42335016/dotenv-file-is-not-loading-environment-variables).

Turn on debug mode and try again..

```js
require('dotenv').config({ debug: true })
```

You will receive a helpful error outputted to your console.

### Should I commit my `.env` file?

No. We **strongly** recommend against committing your `.env` file to version
control. It should only include environment-specific values such as database
passwords or API keys. Your production database should have a different
password than your development database.

### Should I have multiple `.env` files?

We recommend creating one `.env` file per environment. Use `.env` for local/development, `.env.production` for production and so on. This still follows the twelve factor principles as each is attributed individually to its own environment. Avoid custom set ups that work in inheritance somehow (`.env.production` inherits values form `.env` for example). It is better to duplicate values if necessary across each `.env.environment` file.

> In a twelve-factor app, env vars are granular controls, each fully orthogonal to other env vars. They are never grouped together as “environments”, but instead are independently managed for each deploy. This is a model that scales up smoothly as the app naturally expands into more deploys over its lifetime.
>
> – [The Twelve-Factor App](http://12factor.net/config)

### What rules does the parsing engine follow?

The parsing engine currently supports the following rules:

- `BASIC=basic` becomes `{BASIC: 'basic'}`
- empty lines are skipped
- lines beginning with `#` are treated as comments
- `#` marks the beginning of a comment (unless when the value is wrapped in quotes)
- empty values become empty strings (`EMPTY=` becomes `{EMPTY: ''}`)
- inner quotes are maintained (think JSON) (`JSON={"foo": "bar"}` becomes `{JSON:"{\"foo\": \"bar\"}"`)
- whitespace is removed from both ends of unquoted values (see more on [`trim`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)) (`FOO=  some value  ` becomes `{FOO: 'some value'}`)
- single and double quoted values are escaped (`SINGLE_QUOTE='quoted'` becomes `{SINGLE_QUOTE: "quoted"}`)
- single and double quoted values maintain whitespace from both ends (`FOO="  some value  "` becomes `{FOO: '  some value  '}`)
- double quoted values expand new lines (`MULTILINE="new\nline"` becomes

```
{MULTILINE: 'new
line'}
```

- backticks are supported (`` BACKTICK_KEY=`This has 'single' and "double" quotes inside of it.` ``)

### What happens to environment variables that were already set?

By default, we will never modify any environment variables that have already been set. In particular, if there is a variable in your `.env` file which collides with one that already exists in your environment, then that variable will be skipped.

If instead, you want to override `process.env` use the `override` option.

```javascript
require('dotenv').config({ override: true })
```

### How come my environment variables are not showing up for React?

Your React code is run in Webpack, where the `fs` module or even the `process` global itself are not accessible out-of-the-box. `process.env` can only be injected through Webpack configuration.

If you are using [`react-scripts`](https://www.npmjs.com/package/react-scripts), which is distributed through [`create-react-app`](https://create-react-app.dev/), it has dotenv built in but with a quirk. Preface your environment variables with `REACT_APP_`. See [this stack overflow](https://stackoverflow.com/questions/42182577/is-it-possible-to-use-dotenv-in-a-react-project) for more details.

If you are using other frameworks (e.g. Next.js, Gatsby...), you need to consult their documentation for how to inject environment variables into the client.

### Can I customize/write plugins for dotenv?

Yes! `dotenv.config()` returns an object representing the parsed `.env` file. This gives you everything you need to continue setting values on `process.env`. For example:

```js
const dotenv = require('dotenv')
const variableExpansion = require('dotenv-expand')
const myEnv = dotenv.config()
variableExpansion(myEnv)
```

### How do I use dotenv with `import`?
 
* _Example:_ [here](examples/index.mjs)
* | run a module / contains `import` -> 👀imported modules -- are loaded -- first 👀
  * -> EACH module body -- is -- executed | dependency graph's depth-first traversal
    * Reason: 🧠avoid cycles / skip anything ALREADY executed 🧠
    * see [ES6 In Depth: Modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/)
  * TODO:

What does this mean in plain language? It means you would think the following would work but it won't.

`errorReporter.mjs`:
```js
class Client {
  constructor (apiKey) {
    console.log('apiKey', apiKey)

    this.apiKey = apiKey
  }
}

export default new Client(process.env.API_KEY)
```
`index.mjs`:
```js
// Note: this is INCORRECT and will not work
import * as dotenv from 'dotenv'
dotenv.config()

import errorReporter from './errorReporter.mjs' // process.env.API_KEY will be blank!
```

`process.env.API_KEY` will be blank.

Instead, `index.mjs` should be written as..

```js
import 'dotenv/config'

import errorReporter from './errorReporter.mjs'
```

Does that make sense? 
It's a bit unintuitive, but it is how importing of ES6 modules work.
Here is a [working example of this pitfall](https://github.com/dotenv-org/examples/tree/master/usage/dotenv-es6-import-pitfall).

There are two alternatives to this approach:

1. Preload dotenv: `node --require dotenv/config index.js` (_Note: you do not need to `import` dotenv with this approach_)
2. Create a separate file that will execute `config` first as outlined in [this comment on #133](https://github.com/motdotla/dotenv/issues/133#issuecomment-255298822)

### Why am I getting the error `Module not found: Error: Can't resolve 'crypto|os|path'`?

You are using dotenv on the front-end and have not included a polyfill. Webpack < 5 used to include these for you. Do the following:

```bash
npm install node-polyfill-webpack-plugin
```

Configure your `webpack.config.js` to something like the following.

```js
require('dotenv').config()

const path = require('path');
const webpack = require('webpack')

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        HELLO: JSON.stringify(process.env.HELLO)
      }
    }),
  ]
};
```

Alternatively, just use [dotenv-webpack](https://github.com/mrsteele/dotenv-webpack) which does this and more behind the scenes for you.

### What about variable expansion?

Try [dotenv-expand](https://github.com/motdotla/dotenv-expand)

### What about syncing and securing .env files?

Use [dotenvx](https://github.com/dotenvx/dotenvx)

### What if I accidentally commit my `.env` file to code?

Remove it, [remove git history](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository) and then install the [git pre-commit hook](https://github.com/dotenvx/dotenvx#pre-commit) to prevent this from ever happening again. 

```
brew install dotenvx/brew/dotenvx
dotenvx precommit --install
```

### How can I prevent committing my `.env` file to a Docker build?

Use the [docker prebuild hook](https://dotenvx.com/docs/features/prebuild).

```bash
# Dockerfile
...
RUN curl -fsS https://dotenvx.sh/ | sh
...
RUN dotenvx prebuild
CMD ["dotenvx", "run", "--", "node", "index.js"]
```
