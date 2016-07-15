var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
    socket.on('message', function(message) {
    	message.timestamp = moment().valueOf();

        // Lo envia a todo el mundo incluido el emisor
        io.emit('message', message);	
        // Lo envia a todo el mundo exlcuido el emisor
        // socket.broadcast.emit('message', message);	
    });

    socket.emit('message', {
    	name: 'System',
        text: 'Welcome to the chat application!',
        timestamp: moment().valueOf()
    });
});

http.listen(PORT, function() {
    console.log("Server started!");
});