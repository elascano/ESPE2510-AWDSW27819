const http = require('node:http');
const hostname =  '127.0.0.1';
const port = 3007;
//this is a creational pattern (factory)
const server = http.createServer((req, res) =>{
    res.statusCode= 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('Hello, <b>Web Developers! </b> from <i> Saray Ca&ntilde;arte </i>');
}); //all the function is the parameter

server.listen(port, hostname, () =>{
    console.log(`Server running at http://${hostname}:${port}/`);
})

