//this is the file that is used to start a server

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
    console.log(request);
});

//this will actually start the server
//keeps running so it listens for incoming requests
//if it is not done, then the server is built but it is not running
//it requires a port for running or a hostname
server.listen(3000);

