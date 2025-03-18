// import & configure dotenv
// 1. -- via -- CommonJS
require('dotenv').config()
// 2. -- via -- ES6
//import 'dotenv/config'

// check they are loaded | process
console.log(process.env) // check | logs, that you can see `S3_BUCKET` & `SECRET_KEY`
