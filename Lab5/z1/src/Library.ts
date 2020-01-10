import Book = require('./Book');
import {Validation} from './Validation';

export class Library{
	name:string;
	books:Array<Book.Book>;
	constructor(name:string){
		this.name = name;
		this.books = [];
	}

	addBook(book:Book.Book):void{
		if(this.books.indexOf(book)==-1 && Validation.isCorrectBook(book))
			this.books.push(book);
	}

	getAmountRentedBooks():number{
		var res = this.books.filter(x=>x.availability===false);
		return res.length;
	}

	getListExpiredBooks():Array<Book.Book>{
		return this.books.filter(x=>x.isExpired()===true);
	}

	isAvailableBook(book:Book.Book):boolean{
		if(this.books.indexOf(book)!=-1) 
			return book.isAvailable();
		else
			return false;
	}

	whenAvailableBook(book:Book.Book):Date{
		if(this.books.indexOf(book)!=-1) 
			return book.whenAvailable();
	}

	getTop10Books():Array<Book.Book>{
		return this.books.slice(0).sort(compare).slice(0, 10);
		}
}

function compare(a:Book.Book,b:Book.Book):number{
	return b.rents.length-a.rents.length;
}