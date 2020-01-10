var mongoose = require('mongoose');

var schema = mongoose.Schema({
	login: String,
	password: String,
	busstops: [String]
	}); 

module.exports = mongoose.model('users', schema);
