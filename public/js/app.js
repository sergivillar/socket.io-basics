var socket = io();

socket.on('connect', function(){
	console.log("Connected to socket.io server");
});

socket.on('message', function(message){
	console.log(message);
});

var form = $('#message-form');
var message = form.find('input[name=message]');

form.on('submit', function(evt){
	evt.preventDefault();

	socket.emit('message', {
		text: message.val()
	});

	message.val('');
});