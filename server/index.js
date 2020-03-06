var path = require('path');
const express = require('express');
const app = express();

const host = '127.0.0.1';
const port = 3000;

app.use(express.static(`${__dirname}` + "../../public"));

app.get('/*/', function(req, res) {
    res.sendFile(path.resolve(`${__dirname}` + "../../public/index.html"))
});


app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});
