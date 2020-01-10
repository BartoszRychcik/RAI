"use strict";

function Ksiazka(numer,tytul,autor,rok_wydania,cena,data_wypozyczenia=0,kto=null){
	this.wypozycz = function(imie){
		if(kto===null){
			kto=imie;
			data_wypozyczenia=new Date();
			return true;
		}
		else
			return false;
	};
	this.zwroc = function(){
		kto=null;
		data_wypozyczenia=0;
		return true;
	};
	this.czy_dostepna = function(){
		if(kto===null)
			return true;
		else
			return false;
	};
	this.kto_ma = function(){
		return kto;
	};
}
