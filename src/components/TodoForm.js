import React from 'react'

export default props =>
  <form onSubmit={props.handleTodoSubmit}>
    <input
      type='text'
      autoFocus
      value={props.currentTodo}
      onChange={props.handleNewTodoChange}
      className="new-todo"
      placeholder="Take a note here."/>
      <button className="btn" onClick={props.handleTodoSubmit}>Submit</button>
  </form>
