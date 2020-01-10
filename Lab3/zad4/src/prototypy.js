"use strict";

function Ksiazka2(numer,tytul,autor,rok_wydania,cena,data_wypozyczenia=0,kto=null){
	this.numer = numer;
	this.tytul = tytul;
	this.autor = autor;
	this.rok_wydania = rok_wydania;
	this.cena = cena;
	this.data_wypozyczenia = data_wypozyczenia;
	this.kto = kto;
};

Ksiazka2.prototype = {
	wypozycz: function(imie){
		if(this.kto===null){
			this.kto=imie;
			this.data_wypozyczenia=new Date();
			return true;
		}
		else
			return false;
	},
	zwroc: function(){
		this.kto=null;
		this.data_wypozyczenia=0;
		return true;
	},
	czy_dostepna: function(){
		if(this.kto===null)
			return true;
		else
			return false;
	},
	kto_ma: function(){
		return this.kto;
	}
};

Ksiazka2.prototype.constructor = Ksiazka2;