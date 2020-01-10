describe('prototypy-tests', function() 
{
	var ksiazka
	
	beforeEach(function(){
		ksiazka = new Ksiazka2(10,"Tytul","Autor",2019,50);
	});	
	
	it('wypozyczenie wypozyczonej powinno dać fałsz', function() 
	{
		ksiazka.wypozycz("Bartek");
		let res = ksiazka.wypozycz("Tomek");
		expect(res).to.eql(false);
	});
	
	it('wypozyczenie dostepnej powinno dać prawde', function() 
	{
		let res = ksiazka.wypozycz("Tomek");
		expect(res).to.eql(true);
	});
	
	it('sprawdzenie statusu dostepnosci', function() 
	{
		let res = ksiazka.czy_dostepna();
		expect(res).to.eql(true);
		
		ksiazka.wypozycz("Tomek");
		res = ksiazka.czy_dostepna();
		expect(res).to.eql(false);
	});
	
	it('jak niewypozyczona to nikt nie ma', function() 
	{
		let res = ksiazka.kto_ma();
		expect(res).to.eql(null);
	});
	
	it('jak wypozyczona to ma ktos', function()  
	{
		ksiazka.wypozycz("Tomek");
		let res = ksiazka.kto_ma();
		expect(res).to.eql("Tomek");
	});
	
	it('zwrocona moze byc wypozyczona', function() 
	{
		ksiazka.wypozycz("Bartek");
		ksiazka.zwroc();
		let res = ksiazka.wypozycz("Tomek");
		expect(res).to.eql(true);
	});
	
	it('sprawdzenie czytania atrybutu powinno się udać', function() 
	{
		let res = ksiazka.autor;
		expect(res).to.eql("Autor");
	});
	
	it('sprawdzenie zapisywania atrybutu powinno się udać', function() 
	{
		ksiazka.kto = "Bartek";
		let res = ksiazka.kto_ma();
		expect(res).to.eql("Bartek");
	});
	
	it('sprawdzenie dostepnosci prototype powinno się udać', function() 
	{
		should.exist(Ksiazka2.prototype);
		//console.log(Ksiazka2.prototype);
	});
	
	it('sprawdzenie dostepnosci constructor powinno się udać', function() 
	{
		should.exist(ksiazka.constructor);
		//console.log(ksiazka.constructor)
	});
	
	it('sprawdzenie dostepnosci _prototype powinno się nie udać', function() 
	{
		should.not.exist(ksiazka._prototype);
		//console.log(ksiazka._prototype)
	});
	
	it('sprawdzenie dodania pola do prototypu', function() 
	{
		Ksiazka2.prototype.liczba_stron = 230; //utworzone wystapienia obiektu takze dostaja to pole
		expect(ksiazka.liczba_stron).to.eql(230);
	});
});