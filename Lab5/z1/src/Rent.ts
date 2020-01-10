import Person = require('./Person');
import {Validation} from './Validation';

export class Rent{
	person:Person.Person;
	rentDate:Date;
	expiryDate:Date;
	returnDate:Date;
	constructor(person:Person.Person,date:Date){
		this.person = person;
		this.rentDate = date;
		this.expiryDate = Validation.addDays(this.rentDate,14);
		this.returnDate = new Date();
	}
}