const http = require(`node:http`);
const hostname = `127.0.0.1`;
const port = 3014;
const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader(`Content-Type`, `text/html`);
    res.end(`Hello, <b>web developvers!</b> from Ariel Llumiquinga`);
});
server.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});