var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
    console.log("User connected via socket.io!");

    socket.on('message', function(message) {
        console.log("Message received: " + message.text);

        // Lo envia a todo el mundo incluido el emisor
        io.emit('message', message);	
        // Lo envia a todo el mundo exlcuido el emisor
        // socket.broadcast.emit('message', message);	
    });

    socket.emit('message', {
        text: 'Welcome to the chat application!'
    });
});

http.listen(PORT, function() {
    console.log("Server started!");
});
