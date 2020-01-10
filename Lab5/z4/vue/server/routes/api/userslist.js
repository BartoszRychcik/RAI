var express = require('express') 
var mongodb = require('mongodb') 
var mongoose = require('mongoose'); 
var router = express.Router()

var url = 'mongodb://127.0.0.1:27017/Baza';
mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true });
const Model = require('./models/usersmodel'); 

router.get('/', function(req, res) {
	mongoose.model('users').find(function(err, users) {
		err? res.status(400).send(err):res.send(users);
	});
});

router.delete('/:login', function(req, res) {
	Model.findOne({'login': req.params.login.toString()}, function(err, user){
		if(err) 
			res.status(400).send(err);
		else
		if(user == null){
			res.status(404).send("User not found");
		}
		else{
			Model.deleteOne({"login": req.params.login.toString()}, function(err){
				err? res.status(400).send(err):res.send("ok");
			});
		}
	});
	
});

router.put('/:login', function(req, res) {
	Model.findOne({'login': req.params.login.toString()}, function(err, user){
		if(err) 
			res.status(400).send(err);
		else
		if(user == null){
			res.status(404).send("User not found");
		}
		else{
			Model.updateOne({"login": req.params.login.toString()},{'$set':{"busstops": req.body.busstops,"password": req.body.password}}, function (err,resx){
				err? res.status(400).send(err):res.send("ok");
			});
		}
	});
});

router.post('/', function(req, res) {
	if(typeof req.body.login === "undefined" || typeof req.body.password === "undefined" || typeof req.body.busstops === "undefined") 
		res.status(400).send("Wrong parameters");
	
	Model.findOne({'login': req.body.login}, function(err, user){
		if(err) 
			res.status(400).send(err);
		else
		if(user == null){
			create(req.body.login,req.body.password,req.body.busstops);
			res.send("ok");
		}
		else
			res.status(404).send("User already exists");
	});
});

router.get('/:login', function(req, res) {
	const x = req.params.login.toString();
	Model.findOne({'login': x}, function(err, user){
		if(err) 
			res.status(400).send(err);
		else
		if(user == null)
			res.status(404).send("User not found");
		else
			res.send(user);
	});
});

function create(login,password,data)
{
	var u1 = new Model({"login":login,"password":password,"busstops":data});
	u1.save();
}

module.exports = router


