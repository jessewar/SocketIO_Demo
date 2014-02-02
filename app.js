var express = require('express');
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

app.get('/', function(request, response) {
	response.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
	socket.on('message sent', function(data) {
		io.sockets.emit('new message', data);
	});
});