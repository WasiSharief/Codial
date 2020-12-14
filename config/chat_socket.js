module.exports.ChatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection',function(socket){
        console.log('new Connection received',socket.id);
   
    
    socket.on('disconnect',function(){
        console.log("socket is disconnected");
         });
    

    socket.on('join_room',function(data){
        console.log('joining request rec..',data);
        

        socket.join(data.chatroom);
        
        io.in(data.chatroom).emit("user_joined",data);
        
    });

    // receiving emit messages send message with message content 
    socket.on('send_message', function(data){
        
        io.emit('receive_message',data);

        console.log(data.chatroom);
    });

    });
}