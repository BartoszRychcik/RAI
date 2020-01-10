function isNotEmptyString(str){
	if(typeof(str) === 'string' && str.length > 0)
		return true;
	else
		return false;
}
 
function isCorrectPerson(person){
	if(person instanceof Person &&
		isNotEmptyString(person.firstname) &&
		isNotEmptyString(person.lastname))
		return true;
	else
		return false;
}
  
function isCorrectAutors(autors){
	for(let i of autors){
		if(!isCorrectPerson(i))
		return false;
	}
	return true;
}

function isCorrectBook(book){
	if(typeof book.price === 'number' &&
		book.price >= 0.0 &&
		typeof book.publicationYear === 'number' &&
		isNotEmptyString(book.title) &&
		isCorrectAutors(book.autors))
		return true;
	else
		return false;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}