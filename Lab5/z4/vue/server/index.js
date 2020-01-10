var express = require('express') 
var cors = require('cors') 
var bodyParser = parser = require('body-parser')

var app = express()

app.use(bodyParser.json()) 
app.use(cors()) 

var users = require('./routes/api/userslist')
app.use('/api/userslist', users);

var busstop = require('./routes/api/busstop')
app.use('/api/busstop', busstop);

app.listen(3000, () => { console.log("Server running on port " + 3000); }); 
