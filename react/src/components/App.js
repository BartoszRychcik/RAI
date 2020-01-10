import React from 'react'
import Footer from './Footer'
import AddBook from '../containers/AddBook'
import VisibleBookList from '../containers/VisibleBookList'

const App = () => (
  <div>
    <AddBook />
    <VisibleBookList />
    <Footer />
  </div>
)

export default App
