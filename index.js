#!/usr/bin/env node

var argvs = process.argv.slice(2);
if(argvs.length < 2) {
    console.error('usage: strandum-clock-test <device-file-conf-path> <csv-dest-file>');
    process.exit(1);
}

function readObjectFromFile(path, callback){
    var fs = require('fs');
    var obj;
    fs.readFile(path, 'utf8', function (err, data) {
    if (err) throw err;
        obj = JSON.parse(data);
        callback(obj);
    });
}

readObjectFromFile('teste.json', (obj) => console.log(obj));

var device_conf_file = argvs[0];
var csv_dest_file = argvs[1];

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

var t = [{name: 'teste', nota: 72.0},
         {name: 'teste2', nota: 80.2}];

var header = [];
Object.keys(t[0]).forEach(k => header.push({id: k, title: k}));

const csvWriter = createCsvWriter({
    path: csv_dest_file,
    header: header
});
 
csvWriter.writeRecords(t)  // returns a promise
    .then(() => {
        console.log('...Done');
    });