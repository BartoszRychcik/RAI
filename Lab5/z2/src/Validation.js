
class Validation{

isNotEmptyString(str){
	if(typeof(str) === 'string' && str.length > 0)
		return true;
	else
		return false;
}
 
isCorrectPerson(person){
	if(
		this.isNotEmptyString(person.firstname) &&
		this.isNotEmptyString(person.lastname))
		return true;
	else
		return false;
}
  
isCorrectAutors(autors){
	for(let i of autors){
		if(!this.isCorrectPerson(i))
		return false;
	}
	return true;
}

isCorrectBook(book){
	if(typeof book.price === 'number' &&
		book.price >= 0.0 &&
		typeof book.publicationYear === 'number' &&
		this.isNotEmptyString(book.title) &&
		this.isCorrectAutors(book.autors))
		return true;
	else
		return false;
}

}

module.exports = Validation