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
    //when you access the localhost:xxxx, this will print the content of the 
    //request body
    //console.log(request);

    //url will return the path that you accessed in the browser, IE home page, etc
    //method will return which method you used. for accessing a page is a GET request
    //headers returns alot of information about the browser used, cookies, encoding, etc etc.
    console.log(request.url, request.method, request.headers);
});

//this will actually start the server
//keeps running so it listens for incoming requests
//if it is not done, then the server is built but it is not running
//it requires a port for running or a hostname
//this server runs in something called the event loop managed by node
server.listen(3000);

