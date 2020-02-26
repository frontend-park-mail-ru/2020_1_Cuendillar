

const http = require("http");
var path = require('path');
const fs = require("fs");

const server = http.createServer((req,res) => {


    console.log("url:", req.url);

    const fileName = req.url === "/" ? req.url + "index.html" : req.url;

    var extname = path.extname(fileName);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }


    fs.readFile("public/"+fileName, (err, body) =>{


        if (err) {
            res.write("404");
            console.log("ERROR 404");
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.write(body);
        res.end();
    });

});

server.listen(3000);