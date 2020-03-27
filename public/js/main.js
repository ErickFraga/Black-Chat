//var socket = io('http://localhost:3000/');



var socket = io('http://bl4ck-ch4t.herokuapp.com/');

const colors = {
    "Amarelo": "#ffc107",
    "Laranja": "#fd7e14",
    "Vermelho": "#dc3545",
    "Rosa": "#e83e8c",
    "Roxo": "#6f42c1",
    "Azul": "#007bff",
    "Azul Claro": "#17a2b8",
    "Verde Claro": "#5df580",
    "Verde": "#28a745",
}

const colorsByIndex = [ "Amarelo", "Laranja", "Vermelho", "Rosa", "Roxo", "Azul", "Azul Claro",  "Verde Claro", "Verde"]

function renderMessage(message) {
    $('.messages').append('<div class="message"><strong style="color: '+colors[message.color.replace("Nome ", "")]+'">'+ message.author +'</strong>:'+ message.message +'</div>');
}

function changeColor(color){
    console.log(color);
    $('button[name=username-color]').text("Nome "+ color);  
    $('button[name=username-color]').css("background-color", colors[color]);
    $('div[name=title]').css("color", colors[color]);
    
}


socket.on('previousMessages', function(messages){
    for(message of messages){
        renderMessage(message);
    }
});

socket.on('RandomUsernameColor', function(){
    var usernameColor = colorsByIndex[Math.floor(Math.random() * 9)];
    console.log(usernameColor);
    changeColor(usernameColor);
});

socket.on('recivedMessage', function(message){
    renderMessage(message);
});


$('#chat').submit(function(event){
    event.preventDefault();
    var color = $('button[name=username-color').text();
    var author = $('input[name=username]').val();
    var message = $('input[name=message]').val();
    $('input[name=message]').val('');

    if(author.length && message.length){
        var messageObject = {
            color: color,
            author:author,
            message: message,
        };
        
        renderMessage(messageObject);
        socket.emit('sendMessage', messageObject);
    }
});