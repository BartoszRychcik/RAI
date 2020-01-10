import Book = require('../src/Book');
import Person = require('../src/Person');
import Library = require('../src/Library');
import {Validation} from '../src/Validation';
import { expect } from 'chai';
import 'mocha';

describe('library/validation-tests', function() 
{
	var library:Library.Library;
	var autor1:Person.Person;
	var autor2:Person.Person;
	var book1:Book.Book;
	var books:Array<Book.Book>;
	var person1:Person.Person;
	var person2:Person.Person;
	var person3:Person.Person;
	
	beforeEach(function(){
		library = new Library.Library("Biblioteka")
		autor1 = new Person.Person("Imie1","Nazwisko2");
		autor2 = new Person.Person("Imie2","Nazwisko2");
		book1 = new Book.Book(10,"Tytuł",49.99,2019,[autor1,autor2]);
		books = [book1];
		for(let i=1;i<=10;i++)
			books[i] = new Book.Book(10+i,"Tytuł",49.99,2019,[autor1,autor2]);
		for(let i of books){library.addBook(i);}
		person1 = new Person.Person("Imie3","Nazwisko3");
		person2 = new Person.Person("Imie4","Nazwisko4");
		person3 = new Person.Person("Imie5","Nazwisko5");
	});
	
	it('validation incorrect strings', function() 
	{
		let string1:string = "";
		let string2:any = undefined;
		let res1:boolean = Validation.isNotEmptyString(string1);
		let res2:boolean = Validation.isNotEmptyString(string2);
		expect(res1).to.false;
		expect(res2).to.false;
	});
	
	it('validation correct strings', function() 
	{
		let string1:string = "tytuł";
		let string2:string = "10";
		let res1:boolean = Validation.isNotEmptyString(string1);
		let res2:boolean = Validation.isNotEmptyString(string2);
		expect(res1).to.true;
		expect(res2).to.true;
	});
	
	it('validation incorrect persons ', function() 
	{
		let person1:Person.Person = new Person.Person("","Nazwisko");
		let person2:Person.Person = new Person.Person("Imie","");
		let res1:boolean = Validation.isCorrectPerson(person1);
		let res2:boolean = Validation.isCorrectPerson(person2);
		expect(res1).to.false;
		expect(res2).to.false;
	});
	
	it('validation correct persons ', function() 
	{
		let person1:Person.Person = new Person.Person("Imie","Nazwisko");
		let res1:boolean = Validation.isCorrectPerson(person1);
		expect(res1).to.true;
	});
	
	it('validation incorrect autors', function() 
	{
		let person1:Person.Person = new Person.Person("Imie","Nazwisko");
		let person2:Person.Person = new Person.Person("","Nazwisko2");
		let person3:Person.Person = new Person.Person("Imie3","Nazwisko3");
		let autors:Array<Person.Person> = [person1,person2,person3];
		let res1:boolean = Validation.isCorrectAutors(autors);
		expect(res1).to.false;
	});
	
	it('validation correct autors', function() 
	{
		let person1:Person.Person = new Person.Person("Imie","Nazwisko");
		let person2:Person.Person = new Person.Person("Imie2","Nazwisko2");
		let person3:Person.Person = new Person.Person("Imie3","Nazwisko3");
		let autors:Array<Person.Person> = [person1,person2,person3];
		let res1:boolean = Validation.isCorrectAutors(autors);
		expect(res1).to.true;
	});
	
	it('book with incorrect autors is incorrect', function() 
	{
		let autor3:Person.Person = new Person.Person("","Nazwisko2");
		book1 = new Book.Book(1,"Tytuł",49.99,2019,[autor1,autor2,autor3]);
		let res:boolean = Validation.isCorrectBook(book1);
		expect(res).to.false;
	});
	
	it('book with incorrect title is incorrect', function() 
	{
		book1 = new Book.Book(100,"",49.99,2019,[autor1,autor2]);
		let res:boolean = Validation.isCorrectBook(book1);
		expect(res).to.false;
	});
	
	it('book with incorrect price is incorrect', function() 
	{
		book1 = new Book.Book(100,"Tytuł",-1,2019,[autor1,autor2]);
		let res:boolean = Validation.isCorrectBook(book1);
		expect(res).to.false;
	});
	
	it('book with incorrect publicationYear is incorrect', function() 
	{
		book1 = new Book.Book(100,"Tytuł",49.99,-1,[autor1,autor2]);
		let res:boolean = Validation.isCorrectBook(book1);
		expect(res).to.false;
	});
	
	it('correct book can be added to library', function() 
	{
		book1 = new Book.Book(100,"Tytuł",49.99,2019,[autor1,autor2]);
		library.addBook(book1);
		expect(library.books.length).to.eql(12);
		expect(library.books[library.books.length-1]).to.eql(book1);
	});
	
	it('same book cant be added again', function() 
	{
		book1 = new Book.Book(100,"Tytuł",49.99,2019,[autor1,autor2]);
		library.addBook(book1);
		library.addBook(book1);
		expect(library.books.length).to.eql(12);
	});
	
	it('incorrect book cant be added to library', function() 
	{
		book1 = new Book.Book(100,"",49.99,2019,[autor1,autor2]);
		library.addBook(book1);
		expect(library.books.length).to.eql(11);
	});
	
	it('getAmountRentedBooks for 2 rented books from library should return 2', function() 
	{
		library.books[3].rentBook(person1);
		library.books[5].rentBook(person2);
		library.books[8].rentBook(person3);
		library.books[8].returnBook();
		let res:number = library.getAmountRentedBooks();
		expect(res).to.eql(2);
	});
	
	it('available book from library should be available', function() 
	{
		let res:boolean = library.isAvailableBook(library.books[2]);
		expect(res).to.true;
	});
	
	it('available book not from library should not be available', function() 
	{
		book1 = new Book.Book(300,"Tytuł",49.99,2019,[autor1,autor2]);
		let res:boolean = library.isAvailableBook(book1);
		expect(res).to.false;
	});
	
	it('not available book from library should not be available', function() 
	{
		library.books[3].rentBook(person1);
		let res:boolean = library.isAvailableBook(library.books[3]);
		expect(res).to.false;
	});
	
	it('getlistExpiredBooks should return empty list for not rented books', function() 
	{
		let res:Array<Book.Book> = library.getListExpiredBooks();
		expect(res.length).to.eql(0);
	});
	
	it('getlistExpiredBooks should return 2 books for 2 expired books', function() 
	{
		library.books[3].rentBook(person1);
		library.books[5].rentBook(person2);
		library.books[8].rentBook(person3);
		//emulowanie przeterminowania
		library.books[3].rents[0].expiryDate=new Date("December 17, 2019 03:24:00");
		library.books[5].rents[0].expiryDate=new Date("December 17, 2019 03:24:00");
		
		let res:Array<Book.Book> = library.getListExpiredBooks();
		expect(res.length).to.eql(2);
		expect(res[0]).to.eql(library.books[3]);
		expect(res[1]).to.eql(library.books[5]);
	});
	
	it('not rented book from library should be available now', function() 
	{
		let res:Date = library.whenAvailableBook(library.books[3]);
		let eql:Date = new Date()
		let eql2:number = Math.floor(eql.getTime()/1000);
		let res2:number = Math.floor(res.getTime()/1000);
		expect(res2).to.above(eql2-1);
	});
	
	it('rented now book should be available after 2 weeks', function() 
	{
		library.books[3].rentBook(person1);
		let res:Date = library.whenAvailableBook(library.books[3]);
		let eql:Date = Validation.addDays(new Date(),14);
		let eql2:number = Math.floor(eql.getTime()/1000);
		let res2:number = Math.floor(res.getTime()/1000);
		expect(res2).to.above(eql2-1); 
	});
	
	it('get top 10 books', function() 
	{
		for(let i=0;i<library.books.length;i++){
			for(let j=0;j<library.books.length-i;j++){
				library.books[j].rentBook(person1);
				library.books[j].returnBook();
				library.books[1].rentBook(person2);
				library.books[1].returnBook();
			}
		}

		//Każdą kolejną wypożyczamy o 1 raz mniej, oprócz drugiej w kolejności, którą najwięcej.
		let res:Array<Book.Book> = library.getTop10Books();
		expect(res.length).to.eql(10);
		expect(res[0]).to.eql(library.books[1]);
		expect(res[1]).to.eql(library.books[0]);
		expect(res[9]).to.eql(library.books[9]);
	});
});