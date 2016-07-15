var socket = io();
var listMessages = $('.messages');

socket.on('connect', function(){
	console.log("Connected to socket.io server");
});

socket.on('message', function(message){
	listMessages.append('<p>' + message.text + '</p>')
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