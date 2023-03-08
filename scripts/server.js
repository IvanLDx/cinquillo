var express = require('express');
var app = express();
var serv = require('http').Server(app);

var server = {
    start: (dir) => {
        app.get('/', function(req, res) {
            res.sendFile(dir + '/client/index.html');
        });
        app.use('/client', express.static(dir + '/client'));
        serv.listen(3000);
        
    },
    self: () => {
        return serv;
    }
}

module.exports = server;