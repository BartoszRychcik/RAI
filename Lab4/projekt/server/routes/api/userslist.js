var express = require('express') 
var mongodb = require('mongodb') 
var mongoose = require('mongoose'); 
var router = express.Router()

var url = 'mongodb://127.0.0.1:27017/Baza';
mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true });
const Model = require('./models/usersmodel'); 

//mongoose.model('users').remove().exec();

router.get('/', function(req, res) {
	mongoose.model('users').find(function(err, users) {
    res.send(users);
  });
});

router.post('/', function(req, res) {
	update(req.body.login,req.body.password,req.body.data);
	res.send("ok");
});

router.get('/:login/:password', function(req, res) {
	const x = req.params.login.toString();
	const y = req.params.password.toString();
	Model.findOne({'login': x, 'password': y}, function(err, user){
		if(err) handleError(err);
		res.send(user);
	});
});

function update(login,password,data)
{
	console.log(login);
	console.log(password);
	console.log(data);
	
	Model.updateOne({"login": login,"password": password},{'$set':{"busstops": data}}, function (err,res){if(err)console.log(err);});

}

function remove()
{
	Model.deleteOne({login: "Bartek"}, function(err){if(err)return handleError(err);});
}

function loadData()
{
	var u1 = new Model({login:"Bartek",password:"haslo123",busstops:["2018","2019"]});
	var u2 = new Model({login:"Jan",password:"haslo321",busstops:["2019"]});
	u1.save((err)=>{mongoose.disconnect();if (err) throw err;});
	u2.save((err)=>{mongoose.disconnect();if (err) throw err;});

}

module.exports = router


