const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, 'public/html'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//express

app.use('/', (req, res) => {
    res.render('index.html');
});


// socket.io
let messages = new Array();

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previousMessages', messages);
    socket.emit('RandomUsernameColor');

    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('recivedMessage', data);
    });
});

server.listen(process.env.PORT || 3000);
