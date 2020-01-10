import React from 'react'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilters } from '../actions'

const Footer = () => (
  <div>
    <FilterLink filter={VisibilityFilters.ALL}>
      Wszystkie
    </FilterLink>
    <FilterLink filter={VisibilityFilters.AVAILABLE}>
      Dostępne
    </FilterLink>
    <FilterLink filter={VisibilityFilters.RENTED}>
      Wypożyczone
    </FilterLink>
  </div>
)

export default Footer
