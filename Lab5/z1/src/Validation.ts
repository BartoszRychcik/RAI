import Person = require('./Person');
import Book = require('./Book');

export module Validation{
	export function isNotEmptyString(str:string):boolean{
		if(typeof(str) === 'string' && str.length > 0)
			return true;
		else
			return false;
	}
	 
	export function isCorrectPerson(person:Person.Person):boolean{
		if(person instanceof Person.Person &&
			isNotEmptyString(person.firstname) &&
			isNotEmptyString(person.lastname))
			return true;
		else
			return false;
	}
	  
	export function isCorrectAutors(autors:Array<Person.Person>):boolean{
		for(let i of autors){
			if(!isCorrectPerson(i))
			return false;
		}
		return true;
	}

	export function isCorrectBook(book:Book.Book):boolean{
		if(typeof book.price === 'number' &&
			book.price >= 0.0 &&
			typeof book.publicationYear === 'number' &&
			book.publicationYear > 0.0 &&
			isNotEmptyString(book.title) &&
			isCorrectAutors(book.autors))
			return true;
		else
			return false;
	}

	export function addDays(date:Date,days:number):Date {
		var date2:Date = new Date(date.valueOf());
		date2.setDate(date2.getDate() + days);
		return date2;
	}
}