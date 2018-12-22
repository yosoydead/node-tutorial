//1. start a server
//2. handle two routes: / and /users (users has a dummy list with usernames)
//3. on the / page, display a form to add a new user
//4. after you console log the username, redirect to /
const http = require("http");

const server = http.createServer( (request,response) => {
    //save the url
    const url = request.url;

    if(url === "/"){
        //send a response with a header and some html code
        response.setHeader("Content-Type", "text/html");
        response.write("<html>");
        response.write("<head><title>First assignment</title></head>");
        //response.write("<body><h1>Welcome to my page</h1></body>");
        response.write("<body> <form action='/create-user' method='post'> <input name='username' type='text'> <button type='submit'>Submit</button> </form> </body>");
        response.write("</html>");
        return response.end();
    }

    if(url === "/users"){
        //send a response with a header and some html code
        response.setHeader("Content-Type", "text/html");
        response.write("<html>");
        response.write("<head><title>First assignment</title></head>");
        response.write("<body><ul> <li>abc</li> <li>def</li> </ul></body>");
        response.write("</html>");
        return response.end();
    }

    if(url ==='/create-user'){
        const body = [];

        request.on('data', (chunk) =>{
            body.push(chunk);
        });

        request.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split("=")[1]);
        });
        //redirect
        response.statusCode = 302;
        response.setHeader("Location", '/');
        response.end();
    }
});

server.listen(2000);