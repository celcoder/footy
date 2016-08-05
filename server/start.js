var http = require('http');  //require http from node.
var server = http.createServer();  //create a server using http.createServer()
var Promise = require('bluebird');  //require promise from bluebird library
var chalk = require('chalk');



//turn on the server via request, and require ./index.js middleware
server.on('request', require('./index'));


var startServer = function () {

    var PORT = process.env.PORT || 1337;

    server.listen(PORT, function () {
        console.log(chalk.blue('Magic Happens on Port:', chalk.magenta(PORT)));
    });

}();

