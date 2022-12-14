const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

// initialization
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = 3000
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });




// settings
app.set('port', process.env.PORT || port);

// middlewares


//sockets
require('./sockets')(io);

// static files
app.use(express.static(path.join(__dirname, 'public')));
//console.log(__dirname);


// starting the server
server.listen(app.get('port'), () => {
    console.log('Server on port 3000');
})

