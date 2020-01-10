class Library{
	constructor(name){
		this.name = name;
		this.books = [];
	}

	addBook(book){
		if(this.books.indexOf(book)==-1 && isCorrectBook(book))
			this.books.push(book);
	}

	getAmountRentedBooks(){
		var res = this.books.filter(x=>x.availability===false);
		return res.length;
	}

	getListExpiredBooks(){
		return this.books.filter(x=>x.isExpired()===true);
	}

	isAvailableBook(book){
		if(this.books.indexOf(book)!=-1) 
			return book.isAvailable();
		else
			return false;
	}

	whenAvailableBook(book){
		if(this.books.indexOf(book)!=-1) 
			return book.whenAvailable();
	}

	getTop10Books(){
		return this.books.slice(0).sort(compare).slice(0, 10);
		}
}

function compare(a,b){
	return b.rents.length-a.rents.length;
}