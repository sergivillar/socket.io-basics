var socket = io();
var listMessages = $('.messages');

socket.on('connect', function(){
	console.log("Connected to socket.io server");
});

socket.on('message', function(message){
	var momentTimestamp = moment.utc(message.timestamp);
	listMessages.append('<p><strong>' + momentTimestamp.local().format('h:mm') + '</strong>: ' + message.text + '</p>')
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