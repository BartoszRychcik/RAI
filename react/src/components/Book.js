import React from 'react'
import PropTypes from 'prop-types'

const Book = ({ onClick, completed, title, autors, price, publicationYear, time, availability }) => (
  <tr
    onClick={onClick}
    style={{
      backgroundColor: completed ? 'red' : 'green'
    }}
  >
    <th>{title}</th>
    <th>{autors}</th>
    <th>{price}</th>
    <th>{publicationYear}</th>
	<th>{time}</th>
	<th>{availability}</th>
  </tr>
)

Book.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  autors: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  publicationYear: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
}

export default Book
