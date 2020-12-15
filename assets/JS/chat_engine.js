class ChatEngine{

    
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        var connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        };

        this.socket = io.connect('http://34.203.193.223:5000',connectionOptions);

        if(this.userEmail){
            this.connectionHandler();
        }

    }
  
    connectionHandler(){
     
        let self = this;

        this.socket.on('connect',function(){
            console.log("chat connection established using sockets...!");

            self.socket.emit('join_room',{
                user_email: self.userEmail,
                chatroom:'codial'
            });

           self.socket.on("user_joined", function(data){
                
                console.log('a user joined!', data);
            });
            

        });
    
        $('#chatsendbtn').click(function(){

            let msg = $('#chatinput').val();

            if(msg != '')
            {
                
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'codail'
                });
            }
        });
        
        self.socket.on('receive_message',function(data){

            console.log('message received',data.message);

            let newMessage = $('<li>');

            let messagetype = 'sender'

            if(data.user_email == self.userEmail){
                messagetype = 'receiver';
            }

            newMessage.append($('<span>',{
                'html':data.message
            }));

            newMessage.append($('<small>',{
                'html':data.user_email
            }));

            newMessage.addClass(messagetype);

            $('#chatmessage-list').append(newMessage);

            var element = document.getElementById("conversationbox");
            element.scrollTop = element.scrollHeight;
        });

    }
}




