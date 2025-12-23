
const http = require('http');
const express = require('express');
const app = express();
const hostname = 'localhost';
const port = 3006;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello, Web Developer from German Caceres</h1>');
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});