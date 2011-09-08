    var net = require('net');  
    var fs = require('fs');
    var mySocket;  
    var code = fs.createWriteStream('generated.js', {'flags': 'a','encoding': 'utf8'});
      
    // create the server and register event listeners  
    var server = net.createServer(function(socket) {  
        mySocket = socket;  
        mySocket.on("connect", onConnect);  
        mySocket.on("data", onData);  
    });  
      
    function onConnect()  
    {  
        console.log("[" + new Date() + "]   " + "Connected to Server."); 
		code.write("//Session Started: " + new Date() + "\n\n"); 
    }  
      
    // When flash sends us data, this method will handle it  
    function onData(d)  
    {  
        if(d == "exit\0")  
        {  
            console.log("exit");  
            mySocket.end();  
            server.close();  
        }  
        else  
        {  
            code.write(d + "\n\n\n"); 
            //mySocket.write(d, 'utf8');  
        }  
    }  
      
    // listen for connections  
    server.listen(9001, "127.0.0.1");  