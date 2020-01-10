import Person = require('./Person');
import Rent = require('./Rent');
import {Validation} from './Validation';

export class Book{
	autors:Array<Person.Person>;
	title:string;
	numb:number;
	publicationYear:number;
	price:number;
	rents:Array<Rent.Rent>; 
	availability:boolean;
	constructor(numb:number,title:string,price:number,publicationYear:number,autors:Array<Person.Person>){
    	this.autors = autors;
    	this.title = title;
    	this.numb = numb;
    	this.publicationYear = publicationYear;
    	this.price = price;
    	this.rents = [];
    	this.availability = true;
	}
 
	rentBook(person:Person.Person):boolean{
    	if(this.availability===true){
    		this.rents.push(new Rent.Rent(person,new Date()));
    		this.availability = false;
			return true;	
    	}
      return false;
	}
 
	returnBook():boolean{
    	if(this.availability===false){
    		this.rents[this.rents.length-1].returnDate = new Date();
    		this.availability = true;
        return true;
    	}
      return false;
	}
 
	lenghtenRent(days=14):boolean{
		if(this.availability===false){
			this.rents[this.rents.length-1].expiryDate = Validation.addDays(this.rents[this.rents.length-1].expiryDate,days);
			return true;
		}
		return false;
	}
 
	isAvailable():boolean{
		return this.availability;
	}
 
	isExpired():boolean{
		if(this.availability===false && new Date()>this.rents[this.rents.length-1].expiryDate)
			return true;
		else
			return false;
	}
 
	whenAvailable():Date{
		if(this.availability===false)
			return this.rents[this.rents.length-1].expiryDate;
		else
			return new Date();
	}
 
	whoIsOwner():Person.Person{
		if(this.availability===false)
			return this.rents[this.rents.length-1].person;
		else
			return new Person.Person("","");
	}
}

