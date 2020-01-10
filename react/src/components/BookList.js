import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BookList = ({ books, rent }) => (
  <div style={{
    minHeight: '100px',
  }}>
  <table border="1">
    <tr>
      <th>Tytuł</th>
      <th>Autorzy</th>
      <th>Cena</th>
      <th>Rok publikacji</th>
	  <th>Data wstawienia</th>
	  <th>Dostępność</th>
    </tr>
    {books.map(book =>
      <Book
        key={book.id}
        {...book}
        onClick={() => rent(book.id)}
      />
    )}
  </table>
  <div>
      <br/>
        <br/>
          <br/>
  </div>
  </div>
)

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired).isRequired,
  rent: PropTypes.func.isRequired
}

export default BookList
