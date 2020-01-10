class Book{
	constructor(number,title,price,publicationYear,autors){
    	this.autors = autors;
    	this.title = title;
    	this.number = number;
    	this.publicationYear = publicationYear;
    	this.price = price;
    	this.rents = [];
    	this.availability = true;
	}
 
	rentBook(person){
    	if(this.availability===true){
    		this.rents.push(new Rent(person,new Date()));
    		this.availability = false;
			return true;	
    	}
      return false;
	}
 
	returnBook(){
    	if(this.availability===false){
    		this.rents[this.rents.length-1].returnDate = new Date();
    		this.availability = true;
        return true;
    	}
      return false;
	}
 
	lenghtenRent(days=14){
		if(this.availability===false){
			this.rents[this.rents.length-1].expiryDate = this.rents[this.rents.length-1].expiryDate.addDays(days);
			return true;
		}
		return false;
	}
 
	isAvailable(){
		return this.availability;
	}
 
	isExpired(){
		if(this.availability===false && new Date()>this.rents[this.rents.length-1].expiryDate)
			return true;
		else
			return false;
	}
 
	whenAvailable(){
		if(this.availability===false)
			return this.rents[this.rents.length-1].expiryDate;
		else
			return new Date();
	}
 
	whoIsOwner(){
		if(this.availability===true)
			return "";
		else
			return this.rents[this.rents.length-1].person;
			
	}
}

module.exports = Book