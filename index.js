'use strict';

var restify = require('restify');
var cors = require('cors');
const SocketIO = require('socket.io');
//var http = require('http');

var port = process.env.PORT || 3000;

var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
})

// var db_config = {
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   database: "pupilocm",
//   multipleStatements: true
// };

var db_config = {
  host: "69.87.220.221",
  user: "mysql_pupilo",
  password: "W3lcome.557223",
  database: "pupilocm",
  multipleStatements: true
};


var io = SocketIO.listen(server.server);
io.on('connection', (socket) =>{
    //console.log('new connection', socket.id);
    //io.emit('newsms','ho mundo');
});

server.use(restify.plugins.bodyParser());

server.get(/\/uploads\/?.*/, restify.plugins.serveStatic({
    directory: __dirname 
}));

server.pre(cors());
// const corsOptions = {
//     origin: 'http://localhost:4200',
//     credentials: true,

// }
// server.use(cors(corsOptions));

require('./fillpreparer')(server, db_config);
require('./reception')(server, db_config);
require('./taxclient')(server, db_config);
require('./immigration')(server, db_config);
require('./waitinglist')(server, db_config);
require('./workflow')(server, db_config);
require('./faxlog')(server, db_config);
require('./login')(server, db_config);
require('./register')(server, db_config);
require('./sendemail')(server, db_config);
require('./sms')(server, db_config, io);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});



