const express = require('express');

const server = express();

server.use(express.static('public'));


server.get("/", (req,res) => {
    res.sendfile(__dirname + `/views/index.html`);
});
server.get("/create-point", (req,res) => {
    res.sendfile(__dirname + `/views/create-point.html`);
});
server.get("/search-results", (req,res) => {
    res.sendfile(__dirname + `/views/search-results.html`);
});


server.listen(3000);