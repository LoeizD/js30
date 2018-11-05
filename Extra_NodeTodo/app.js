const _ = require('lodash');
const fs = require('fs');
const yargs = require('yargs');

const todo = require('./todo.js');

console.log("Running app.js");
const args = yargs.argv;

/*
fs.appendFile('file.txt', 'Writing To The Filesystem! ', (error) => {
    console.log(error);
});
*/
console.log(todo.addTask());
console.log("Love nodemon!");
