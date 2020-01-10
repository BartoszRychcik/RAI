class Rent{
	constructor(person,date){
		this.person = person;
		this.rentDate = date;
		this.expiryDate = this.rentDate.addDays(14);
		this.returnDate = 0;
	}
}