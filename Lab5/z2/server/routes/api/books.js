var express = require('express') 
var fs = require('fs')
var router = express.Router()
var Person = require('../../../src/Person');
var Book = require('../../../src/Book');
var Validation = require('../../../src/Validation')
var qs = require('qs')
var lodash = require('lodash')

router.get('/',function(req,res){
	const filters = qs.parse(req.query)
	p = getFiles();
	p.then(
		function( files ) {
			var promises = [];
			for(var i = 0; i < files.length; i++ )
				promises.push(getData("./server/books/"+files[i]));
			Promise.all(promises).then(
				function(results) {
					var obj=[];
					for(var i = 0; i < results.length; i++ ){
						let f = true;
						let elem = JSON.parse(results[i]);
						if (typeof filters.title !== 'undefined' && elem.title !== filters.title)
							{f=false;console.log(elem.title)}
						if (typeof filters.publicationYear !== 'undefined' && elem.publicationYear != filters.publicationYear)
							{f=false;console.log(elem.publicationYear)}
						if (typeof filters.availability !== 'undefined' && elem.availability !== filters.availability)
							{f=false;console.log(elem.availability)}
						if(f)
							obj.push(elem);
					}
					res.status(200).send(obj);
				},function(error) {
					res.status(400).send(error);
				});
		},function( error ) {
			res.status(400).send(error);
	});
});

router.post('/',function(req,res){
	title = req.body.title;
	autors = req.body.autors;
	price = req.body.price;
	publicationYear = req.body.publicationYear;
	number = req.body.number;
	book = new Book(number,title,price,publicationYear,autors);
	validation = new Validation();
	data = JSON.stringify(book);
	path = "./server/books/"+number+".json";
	if(validation.isCorrectBook(book)){
		k = write(path,data);
		res.status(200).send("Success");
	}
	else
		res.status(400).send("Wrong json");
});

router.put('/:number',function(req,res){
	title = req.body.title;
	autors = req.body.autors;
	price = req.body.price;
	publicationYear = req.body.publicationYear;
	number = req.body.number;
	validation = new Validation();
	path = "./server/books/"+req.params.number+".json";
	var book;
	p=getData(path);
	p.then(function(x){
		book = JSON.parse(x);
		if (typeof title === 'undefined')
			title = book.title;
		if (typeof autors === 'undefined')
			autors = book.autors;
		if (typeof price === 'undefined')
			price = book.price;
		if (typeof publicationYear === 'undefined')
			publicationYear = book.publicationYear;
		
		book = new Book(number,title,price,publicationYear,autors);
		data = JSON.stringify(book);
		
		if(validation.isCorrectBook(book)){
			k = write(path,data);
			res.status(200).send("Success");
		}
		else
		res.status(400).send("Wrong json");
	});
});

router.delete('/:number',function(req,res){
	path = "./server/books/"+req.params.number+".json";
	p = new Promise(function(resolve, reject){
		fs.unlink(path, (err) => {
			err ? res.status(400).send(err) : res.status(200).send("success");
		});
	});
});

function getFiles(){
	return new Promise((resolve, reject) => {
		fs.readdir("./server/books/", function(err, filenames){
            err ? reject(err) : resolve(filenames);
        });})}

function getData(fileName) {
	return new Promise(function(resolve, reject){
		fs.readFile(fileName,'utf-8', (err, data) => {
			err ? reject(err) : resolve(data);
		});});}

function write(path,data){
	return new Promise(function(resolve, reject){
		fs.writeFile(path,data, (err) => {
			err ? reject(err) : resolve(1);
		});});}

module.exports = router


