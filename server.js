var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

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

app.get('/authors', function(req, res) {
    res.send(authors);
})

// add new author with post request
app.post('/authors', function(req, res) {
    var author = {
        id: Date.now(),
        name: req.body.name
    };
    authors.push(author);
    res.send(author);
})

// refresh data
app.put('/authors/:id', function (req, res) {
    var author = authors.find(function (author) {
        return author.id === Number(req.params.id)
    });
    author.name = req.body.name;
    res.sendStatus(200);
})

// delete author
app.delete('/authors/:id', function (req, res) {
    authors = authors.filter(function (author) {
        return author.id !== Number(req.params.id);
    })
    res.sendStatus(200);
})

app.listen(3012, function() {
    console.log('API app started');
})


