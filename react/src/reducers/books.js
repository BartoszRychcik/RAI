const books = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
		  autors: action.autors,
		  price: action.price,
		  publicationYear: action.publicationYear,
		  time: action.time,
		  availability: action.availability,
          completed: false
        }
      ]
    case 'RENT':
      return state.map(book =>
        (book.id === action.id)
          ? {
            ...book,
            availability: !book.completed ? "false" : "true" ,
            completed: !book.completed
          }
          : book
      )
    default:
      return state
  }
}

export default books
