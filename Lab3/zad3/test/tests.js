describe('tests', function() 
{
	it('klasy (definiowane przez slowo kluczowe class)', function() 
	{
		class Person{
			constructor(name,age){
				this.name = name;
				this.age = age;
			}
		}
		var x = new Person("John",22);
		expect(x.name).to.eql("John");
	});
	
	it('uproszczona skladnie "strzalkowa" dla funkcji anonimowych', function() 
	{
		var list = [1,2,3];
		list2 = list.map(i=>i*i);
		expect(list2[2]).to.eql(9);
	});
	
	it('zmienne o zasiegu bloku', function()
	{
		let a = 1;
		if(true) {
			let a = 2;
			expect(a).to.eql(2);
		}
		expect(a).to.eql(1);
	});
	
	it('dostepnosc Object.create', function()
	{
		const rect ={
			x: 0,
			y: 0
		};
		
		var obj = Object.create(rect);
		obj.x=10;
		obj.y=20;
		expect(obj.x).to.eql(10);
	});
	
	it('parametry domyslne funkcji', function()
	{
		function fun (x=10,y=10){
			return x+y;
		}
		expect(fun(2)).to.eql(12);
	});
	
	it('przypisania dekomponujace struktury i listy', function()
	{
		var list = [1,2,3]
		var [a,b,c] = list 
		a = 4
		expect(a).to.eql(4);
		expect(b).to.eql(2);
		expect(c).to.eql(3);
	});
	
	it('interpolacja napisow', function()
	{
		var x=10;
		var y = `${x}`;
		expect(y).to.eql("10");
	});
	
	it('parametry "resztkowe"', function()
	{
		function fun(x,...args)
		{
			return args.length;
		}
		expect(fun(1,2,3,4,5)).to.eql(4);
	});
	
	it('zachowanie this w funkcji zagniezdzonej i =>', function()
	{
		let x ={
			a: 1,
			add: function(x) {
				return ()=>{ return this.a+=x}
			}
		}
		
		let a = x.add(10);
		let res = a();
		expect(res).to.eql(11);
	});
});