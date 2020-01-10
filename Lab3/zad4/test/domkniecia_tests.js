describe('domkniecia-tests', function() 
{
	var ksiazka;
	
	beforeEach(function(){
		ksiazka = new Ksiazka(10,"Tytul","Autor",2019,50);
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
	
	it('sprawdzenie czytania atrybutu powinno dać niepowodzenie', function() 
	{
		should.not.exist(ksiazka.autor);
	});
	
	it('sprawdzenie zapisywania atrybutu powinno dać niepowodzenie', function() 
	{
		ksiazka.kto = "Bartek";
		let res = ksiazka.kto_ma();
		expect(res).to.eql(null);
	});
});