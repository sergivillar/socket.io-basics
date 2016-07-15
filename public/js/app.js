var socket = io();
var name = getQueryVariable('name') || 'Yo soy tu padre';
var room = getQueryVariable('room');
var listMessages = $('.messages');

socket.on('connect', function(){
	console.log("Connected to socket.io server");
});

socket.on('message', function(message){
	var momentTimestamp = moment.utc(message.timestamp);
	listMessages.append('<div><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm') + '</strong> -> <span>' + message.text + '</span></div>');
});

var form = $('#message-form');
var message = form.find('input[name=message]');

form.on('submit', function(evt){
	evt.preventDefault();

	socket.emit('message', {
		name: name,
		text: message.val()
	});

	message.val('');
});