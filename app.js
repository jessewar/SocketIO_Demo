var express = require('express');
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

var nameList = [];

app.get('/', function(request, response) {
	response.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
	socket.on('name sent', function(data) {
		socket.name = data;  // add the name to this particular socket
		nameList.push(socket.name);
		updateNames();
	});

	socket.on('message sent', function(data) {
		io.sockets.emit('new message', data);
	});

	// emits the updated name list to all sockets
	function updateNames() {
		io.sockets.emit('update names', nameList)
	}
});