import { connect } from 'react-redux'
import { rent } from '../actions'
import BookList from '../components/BookList'
import { VisibilityFilters } from '../actions'

const getVisibleBooks = (books, filter) => {
  switch (filter) {
    case VisibilityFilters.ALL:
      return books
    case VisibilityFilters.RENTED:
      return books.filter(t => t.completed)
    case VisibilityFilters.AVAILABLE:
      return books.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = state => ({
  books: getVisibleBooks(state.books, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  rent: id => dispatch(rent(id,"false"))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookList)
