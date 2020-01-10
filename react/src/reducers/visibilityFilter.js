import { VisibilityFilters } from '../actions'

const visibilityFilter = (state = VisibilityFilters.ALL, action) => {
  switch (action.type) {
    case 'FILTER':
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter
