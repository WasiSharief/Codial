module.exports.ChatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection',function(socket){
        console.log('new Connection received',socket.id);
   
    
    socket.on('disconnect',function(){
        console.log("socket is disconnected");
         })
    });
}