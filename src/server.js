const express = require('express');
const res = require('express/lib/response');

const server = express();

//pega o banco de dados;

// const db = require("./database/db");

server.use(express.static('public'));
server.use(express.urlencoded({extended:true}));
// Utilizando template Engine

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

server.get("/", (req,res) => {
    return res.render(`index.html`);
});

server.get('/ps', (request,response) => {
    const DataPortodeSantana = require('./database/portodesantana.json');
    return response.render(`portodesantana.html`, {DataPortodeSantana});
});

server.get('/grauna', (request,response) => {
    const DataGrauna = require('./database/grauna.json');
    return response.render('grauna.html', {DataGrauna})
})

server.listen(3000);