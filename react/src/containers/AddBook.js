import React from 'react'
import { connect } from 'react-redux'
import { addBook } from '../actions'

const AddBook = ({ dispatch }) => {
  let input1
  let input2
  let input3
  let input4

  return (
    <div>
      <form onSubmit={e => { 
        e.preventDefault()
        if (!input1.value.trim()&&!input2.value.trim()&&!input3.value.trim()&&!input4.value.trim()) {
          return
        }
        dispatch(addBook(input1.value,input2.value,input3.value,input4.value,new Date().toLocaleString()))
        input1.value = ''
		input2.value = ''
		input3.value = ''
		input4.value = ''
      }}>
		<h1>Biblioteka</h1>
		<img src="./a.png" height="42" width="42"/>
        <p>Tytuł: <input ref={node => input1 = node} /></p>
		<p>Autorzy: <input ref={node => input2 = node} /></p>
		<p>Cena: <input ref={node => input3 = node} /></p>
		<p>Rok publikacji: <input ref={node => input4 = node} /></p>
        <button type="submit">
          Dodaj książkę
        </button>
      </form>
    </div>
  )
}

export default connect()(AddBook)
