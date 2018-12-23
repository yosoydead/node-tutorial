//this is the file that is used to start a server
const fs = require("fs");

//the require function needs a path to a file or the name of a
//global module from node
const http = require("http");

//the two arguments are required
//request has data about the incoming request
//response helps send back some data to the user
// function rqListener(request, response) {

// }

// http.createServer(rqListener);
//OR

//the create server can use an anonymous function too
//that function is a callback
//this function returns a SERVER, so it needs to be stored for further usage
const server = http.createServer((request, response) => {
    //here i will use both the request and the response

    //store the url the user uses
    const url = request.url;
    const method = request.method;

    //if the url is "/"
    if(url === "/"){
        response.write("<html>");
        response.write("<head><title>Enter message</title></head>");
        response.write("<body> <form action='/message' method='post'> <input name='message' type='text'> <button type='submit'>Submit Message</button> </form> </body>");
        response.write("</html>");
        //used return here because after finishing the form stuff,
        //i dont want anything to be executed after this if block
        return response.end();
    }

    //do this only if the method is a post
    //the url will be /message by default after executing the form
    if(url === "/message" && method === 'POST'){
        
        //this is the request body
        const body = [];

        //this fires how many times it needs so that it adds to the body array
        //the entire message but in chunks of data
        request.on("data", (dataChunk) => {
            console.log(dataChunk);
            body.push(dataChunk);
        });
        
        //if the sending data event is finished
        //do this
        //this event will be run whenever the internal register knows it is finished
        return request.on('end', () => {
            //this returns a string that contains whatever you wrote in the form
            //it will be of the form message=<your message>
            const parsedBody = Buffer.concat(body).toString();
            //console.log(parsedBody);
            
            //i split the string on the = sign
            //ill have an array with two elements, the second one being the actual message
            const message = parsedBody.split('=')[1];

            //store the message in a file
            //if i use write file sync, this will block code execution until 
            //it is done writing
            //fs.writeFileSync("message.txt", message);
            fs.writeFile("message.txt", message, (error) =>{
                //run this redirect whenever the operation is finished
                //302 is a code for redirect
                response.statusCode = 302;
                response.setHeader("Location", '/');
                return response.end();
            });
        });

        
    }
    response.setHeader("Content-Type", "text/html");
    response.write("<html>");
    response.write("<head><title>My first page</title></head>");
    response.write("<body><h1>Hello from my server</h1></body>");
    response.write("</html>");
    response.end();
});

//this will actually start the server
//keeps running so it listens for incoming requests
//if it is not done, then the server is built but it is not running
//it requires a port for running or a hostname
//this server runs in something called the event loop managed by node
server.listen(3000);

