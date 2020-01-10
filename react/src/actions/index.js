let _id = 0
export const addBook = (title,autors,price,publicationYear,time) => ({
  type: 'ADD',
  id: _id++,
  title: title,
  autors: autors,
  price: price,
  publicationYear: publicationYear,
  time: time,
  availability: "true"
})

export const setVisibilityFilter = filter => ({
  type: 'FILTER',
  filter
})

export const rent = (id,availability) => ({
  type: 'RENT',
  id,
  availability: availability
})

export const VisibilityFilters = {
  ALL: 'ALL',
  AVAILABLE: 'AVAILABLE',
  RENTED: 'RENTED'
}
