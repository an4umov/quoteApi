var express = require('express');

var app = express();

var authors = [
    {
        id: 1,
        name: 'Homer'
    },
    {
        id: 2,
        name: 'Vladimir'
    },
    {
        id: 3,
        name: 'Albert'
    }
];

app.get('/', function (req, res) {
    res.send('Hello API');
})

app.listen(3012, function() {
    console.log('API app started');
})


