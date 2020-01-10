describe('library/validation-tests', function() 
{
	beforeEach(function(){
		library = new Library("Biblioteka")
		autor1 = new Person("Imie1","Nazwisko2");
		autor2 = new Person("Imie2","Nazwisko2");
		book1 = new Book(10,"Tytuł",49.99,2019,[autor1,autor2]);
		books = [book1];
		for(let i=1;i<=10;i++)
			books[i] = new Book(10+i,"Tytuł",49.99,2019,[autor1,autor2]);
		for(i of books){library.addBook(i);}
		person1 = new Person("Imie3","Nazwisko3");
		person2 = new Person("Imie4","Nazwisko4");
		person3 = new Person("Imie5","Nazwisko5");
	});
	
	it('validation incorrect strings', function() 
	{
		string1 = "";
		string2 = undefined;
		let res1 = isNotEmptyString(string1);
		let res2 = isNotEmptyString(string2);
		expect(res1).to.false;
		expect(res2).to.false;
	});
	
	it('validation correct strings', function() 
	{
		string1 = "tytuł";
		string2 = "10";
		let res1 = isNotEmptyString(string1);
		let res2 = isNotEmptyString(string2);
		expect(res1).to.true;
		expect(res2).to.true;
	});
	
	it('validation incorrect persons ', function() 
	{
		person1 = new Person("","Nazwisko");
		person2 = new Person("Imie","");
		person3 = new Person("Imie",10);
		let res1 = isCorrectPerson(person1);
		let res2 = isCorrectPerson(person2);
		let res3 = isCorrectPerson(person3);
		let res4 = isCorrectPerson(book1);
		expect(res1).to.false;
		expect(res2).to.false;
		expect(res3).to.false;
		expect(res4).to.false;
	});
	
	it('validation correct persons ', function() 
	{
		person1 = new Person("Imie","Nazwisko");
		let res1 = isCorrectPerson(person1);
		expect(res1).to.true;
	});
	
	it('validation incorrect autors', function() 
	{
		person1 = new Person("Imie","Nazwisko");
		person2 = new Person("","Nazwisko2");
		person3 = new Person("Imie3","Nazwisko3");
		autors = [person1,person2,person3];
		let res1 = isCorrectAutors(autors);
		expect(res1).to.false;
	});
	
	it('validation correct autors', function() 
	{
		person1 = new Person("Imie","Nazwisko");
		person2 = new Person("Imie2","Nazwisko2");
		person3 = new Person("Imie3","Nazwisko3");
		autors = [person1,person2,person3];
		let res1 = isCorrectAutors(autors);
		expect(res1).to.true;
	});
	
	it('book with incorrect autors is incorrect', function() 
	{
		autor3 = new Person("","Nazwisko2");
		book1 = new Book(1,"Tytuł",49.99,2019,[autor1,autor2,autor3]);
		let res = isCorrectBook(book1);
		expect(res).to.false;
	});
	
	it('book with incorrect title is incorrect', function() 
	{
		book = new Book(100,"",49.99,2019,[autor1,autor2]);
		let res = isCorrectBook(book);
		expect(res).to.false;
	});
	
	it('book with incorrect price is incorrect', function() 
	{
		book1 = new Book(100,"Tytuł",-1,2019,[autor1,autor2]);
		book2 = new Book(100,"Tytuł","49.99",2019,[autor1,autor2]);
		let res = isCorrectBook(book1);
		let res2 = isCorrectBook(book2);
		expect(res).to.false;
		expect(res2).to.false;
	});
	
	it('book with incorrect publicationYear is incorrect', function() 
	{
		book = new Book(100,"Tytuł",49.99,"2019",[autor1,autor2]);
		let res = isCorrectBook(book);
		expect(res).to.false;
	});
	
	it('correct book can be added to library', function() 
	{
		book = new Book(100,"Tytuł",49.99,2019,[autor1,autor2]);
		library.addBook(book);
		expect(library.books.length).to.eql(12);
		expect(library.books[library.books.length-1]).to.eql(book);
	});
	
	it('same book cant be added again', function() 
	{
		book = new Book(100,"Tytuł",49.99,2019,[autor1,autor2]);
		library.addBook(book);
		library.addBook(book);
		expect(library.books.length).to.eql(12);
	});
	
	it('incorrect book cant be added to library', function() 
	{
		book = new Book(100,"Tytuł","49.99","2019",[autor1,autor2]);
		library.addBook(book);
		expect(library.books.length).to.eql(11);
	});
	
	it('getAmountRentedBooks for 2 rented books from library should return 2', function() 
	{
		library.books[3].rentBook();
		library.books[5].rentBook();
		library.books[8].rentBook();
		library.books[8].returnBook();
		let res = library.getAmountRentedBooks();
		expect(res).to.eql(2);
	});
	
	it('available book from library should be available', function() 
	{
		let res = library.isAvailableBook(library.books[2]);
		expect(res).to.true;
	});
	
	it('available book not from library should not be available', function() 
	{
		book = new Book(300,"Tytuł",49.99,2019,[autor1,autor2]);
		let res = library.isAvailableBook(book);
		expect(res).to.false;
	});
	
	it('not available book from library should not be available', function() 
	{
		library.books[3].rentBook();
		let res = library.isAvailableBook(library.books[3]);
		expect(res).to.false;
	});
	
	it('getlistExpiredBooks should return empty list for not rented books', function() 
	{
		let res = library.getListExpiredBooks();
		expect(res.length).to.eql(0);
	});
	
	it('getlistExpiredBooks should return 2 books for 2 expired books', function() 
	{
		library.books[3].rentBook();
		library.books[5].rentBook();
		library.books[8].rentBook();
		//emulowanie przeterminowania
		library.books[3].rents[0].expiryDate=new Date("December 17, 2019 03:24:00");
		library.books[5].rents[0].expiryDate=new Date("December 17, 2019 03:24:00");
		
		let res = library.getListExpiredBooks();
		expect(res.length).to.eql(2);
		expect(res[0]).to.eql(library.books[3]);
		expect(res[1]).to.eql(library.books[5]);
	});
	
	it('not rented book from library should be available now', function() 
	{
		let res = library.whenAvailableBook(library.books[3]);
		let eql = new Date()
		eql=Math.floor(eql/1000);
		res=Math.floor(res/1000);
		expect(res).to.above(eql-1);
	});
	
	it('rented now book should be available after 2 weeks', function() 
	{
		library.books[3].rentBook(person1);
		let res = library.whenAvailableBook(library.books[3]);
		let eql = new Date().addDays(14);
		eql=Math.floor(eql/1000);
		res=Math.floor(res/1000);
		expect(res).to.above(eql-1); 
	});
	
	it('get top 10 books', function() 
	{
		for(let i=0;i<library.books.length;i++){
			for(let j=0;j<library.books.length-i;j++){
				library.books[j].rentBook();
				library.books[j].returnBook();
				library.books[1].rentBook();
				library.books[1].returnBook();
			}
		}

		//Każdą kolejną wypożyczamy o 1 raz mniej, oprócz drugiej w kolejności, którą najwięcej.
		let res = library.getTop10Books();
		expect(res.length).to.eql(10);
		expect(res[0]).to.eql(library.books[1]);
		expect(res[1]).to.eql(library.books[0]);
		expect(res[9]).to.eql(library.books[9]);
	});
});