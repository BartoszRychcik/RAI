describe('book/rent/person-tests', function() 
{
	var book;
	
	beforeEach(function(){
		autor1 = new Person("Imie1","Nazwisko2");
		autor2 = new Person("Imie2","Nazwisko2");
		book = new Book(10,"Tytuł",49.99,2019,[autor1,autor2]);
		person1 = new Person("Imie3","Nazwisko3");
		person2 = new Person("Imie4","Nazwisko4");
		person3 = new Person("Imie5","Nazwisko5");
	});
	
	it('available book can be rent', function() 
	{
		let res = book.rentBook(person1);
		expect(res).to.true;
	});
	
	it('not available book can not be rent', function() 
	{
		book.rentBook(person1);
		let res = book.rentBook(person2);
		expect(res).to.false;
	});
	
	it('not rented book can be not expired', function() 
	{
		let res = book.isExpired();
		expect(res).to.false;
	});
	
	it('rented now book can be not expired now', function() 
	{
		book.rentBook(person1);
		let res = book.isExpired();
		expect(res).to.false;
	});
	
	it('rented now book should be available after 2 weeks', function() 
	{
		book.rentBook(person1);
		let res = book.whenAvailable();
		let eql = new Date().addDays(14);
		eql=Math.floor(eql/1000);
		res=Math.floor(res/1000);
		expect(res).to.above(eql-1); 
		//pozbywamy się 1 minuty, bo jak coś przemieli to porównywanie czasu nie działa.
	});
	
	it('not rented book should be available now', function() 
	{
		let res = book.whenAvailable();
		let eql = new Date()
		eql=Math.floor(eql/1000);
		res=Math.floor(res/1000);
		expect(res).to.above(eql-1);
	});
	
	it('status not rented book should be available', function() 
	{
		let res = book.isAvailable();
		expect(res).to.true;
	});
	
	it('status rented book should be not available', function() 
	{
		book.rentBook(person1);
		let res = book.isAvailable();
		expect(res).to.false;
	});
	
	it('no owner for not rented book', function() 
	{
		let res = book.whoIsOwner();
		expect(res).to.eql("");
	});
	
	it('owner for rented book', function() 
	{
		book.rentBook(person1);
		let res = book.whoIsOwner();
		expect(res.firstname).to.eql(person1.firstname);
		expect(res.lastname).to.eql(person1.lastname);
	});
	
	it('book is expired', function() 
	{
		book.rentBook(person1);
		book.rents[0].expiryDate=new Date("December 17, 2019 03:24:00");
		let res = book.isExpired();
		expect(res).to.true;
		//emulujemy wcześniejszą datę wygaśnięcia, bo domyślnie zawsze na 2 tyg od rejestracji jest ustawiona.
	});
	
	it('can not lengthen not rented book', function() 
	{
		let res = book.lenghtenRent();
		expect(res).to.false;
	});
	
	it('lengthen rented book remove expiry', function() 
	{
		book.rentBook(person1);
		book.rents[0].expiryDate = new Date().addDays(-2);
		book.lenghtenRent(2);
		let res = book.isExpired();
		expect(res).to.false;
	});
	
	it('can rent the same book after return', function() 
	{
		book.rentBook(person1);
		book.returnBook();
		book.rentBook(person2);
		book.returnBook();
		book.rentBook(person3);
		expect(book.rents.length).to.eql(3);
	});
	
	it('can not return not rented book ',function()
	{
		let res = book.returnBook();
		expect(res).to.false;
	});
	
	it('can return rented book',function()
	{
		book.rentBook(person1);
		let res = book.returnBook();
		expect(res).to.true;
	});
	
	it('testing correctness return date',function()
	{
		book.rentBook(person1);
		book.returnBook();
		
		let res = book.rents[0].returnDate;
		let eql = new Date();
		eql=Math.floor(eql/1000);
		res=Math.floor(res/1000);
		expect(res).to.above(eql-1); 
		//pozbywamy się 1 minuty, bo jak coś przemieli to porównywanie czasu nie działa.
	});
});