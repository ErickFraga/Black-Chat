var socket = io('http://localhost:3000/');

function renderMessage(message) {
    
    var color = "whitesmoke";

    if(message.author == $('input[name=username]').val()){
        color = "#014f69";
    }
    $('.messages').append('<div class="message"><strong style="color: '+color+'">'+ message.author +'</strong>:'+ message.message +'</div>');
}

socket.on('previousMessages', function(messages){
    for(message of messages){
        console.log(message);
        renderMessage(message);
    }
});

socket.on('recivedMessage', function(message){
    renderMessage(message);
});


$('#chat').submit(function(event){
    event.preventDefault();
    
    var author = $('input[name=username]').val();
    var message = $('input[name=message]').val();

    if(author.length && message.length){
        var messageObject = {
            author:author,
            message: message,
        };
        
        renderMessage(messageObject);
        socket.emit('sendMessage', messageObject);
    }
});