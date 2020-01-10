var express = require('express') 
var bodyParser = parser = require('body-parser')

var app = express()

app.use(bodyParser.json()) 

var books = require('./routes/api/books')
app.use('/api/books', books);

app.listen(3000, () => { console.log("Server running on port " + 3000); }); 
