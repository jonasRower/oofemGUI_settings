const { Socket } = require("socket.io");

module.exports = function (io) {
    
    io.on('connection', socket => {
        console.log('new User connected');
        socket.emit('draw_line', {});
    });
    
}