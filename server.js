var express = require('express');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID

var app = express();
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));



app.get('/', function (req, res) {
    res.send('Hello API');
})

app.get('/authors', function(req, res) {
    db.collection('authors').find().toArray(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
    
    // res.send(authors);
})

// get author by ID
app.get('/authors/:id', function (req, res) {
    db.collection('authors').findOne({ _id: ObjectID(req.params.id) }, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
})


// add new author with post request
app.post('/authors', function(req, res) {
    var author = {
        name: req.body.name
    };
    
    db.collection('authors').insert(author, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(author);
    })
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



mongoClient.connect('mongodb://localhost:27017/quoteApi',{ useUnifiedTopology: true },function(err, client){ 

    if(err){
        return console.log(err);
    }
    db = client.db('authors');

    app.listen(3012, function() {
        console.log("API app started");
      });

})


