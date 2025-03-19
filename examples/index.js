// 1. -- via -- CommonJS
var dotenv = require('dotenv');   // import
const result = dotenv.config();  // config() dotenv

// 2. -- via -- ES6
//import 'dotenv/config'

// check they are loaded | process
console.log(process.env) // check | logs, that you can see `S3_BUCKET` & `SECRET_KEY`

// 3. `.config()`
// 3.1 returns Object / has `parsed` & `error`
console.log("result.parsed " + result.parsed)
console.log(result.parsed)
console.log("result.error " + result.error)
// 3.2 .config({path: ...})
console.log(dotenv.config({path: 'folder/another.env'}))
// 3.2.1 .config({path: []]})
// 3.2.1.1    if you pass MULTIPLE files -> ALL will be taken in account / if key duplicated -> FIRST win
console.log(".config({path: []]})")
console.log(dotenv.config({path: ['folder/another.env', '.env']}))
