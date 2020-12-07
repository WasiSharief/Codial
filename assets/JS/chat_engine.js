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

        this.socket = io.connect('http://localhost:5000',connectionOptions);

        if(this.userEmail){
            this.connectionHandler();
        }

    }
   // , { transport : ['websocket'] },{secure: true}
    connectionHandler(){
        console.log("here");
        this.socket.on('connect',function(){
            console.log("connection established using sockets...!");
        });
    }
}