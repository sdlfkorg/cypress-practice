import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Footer from './Footer'
import {saveTodo, loadTodos, destroyTodo, updateTodo} from '../lib/service'
import {filterTodos} from '../lib/utils'


export default class TodoApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTodo: '',
      todos: []
    }
    this.handleNewTodoChange = this.handleNewTodoChange.bind(this)
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this)
    
  }

  componentDidMount () {
    loadTodos()
      .then(({data}) => this.setState({todos: data}))
      .catch(() => this.setState({error: true}))
  }

  handleNewTodoChange (evt) {
    this.setState({currentTodo: evt.target.value})
  }

  handleTodoSubmit (evt) {
    evt.preventDefault()
    if(this.state.currentTodo){
      const newTodo = {name: this.state.currentTodo, isComplete: false}
      saveTodo(newTodo)
        .then(({data}) => this.setState({
          todos: this.state.todos.concat(data),
          currentTodo: ''
        }))
        .catch(() => this.setState({error: true}))

    }
  }

  render () {
    const remaining = this.state.todos.filter(t => !t.isComplete).length
    return (
      <Router>
        <div>
          <header className="header">
            <h1>Simple Notes</h1>
            <TodoForm
              currentTodo={this.state.currentTodo}
              handleTodoSubmit={this.handleTodoSubmit}
              handleNewTodoChange={this.handleNewTodoChange}
              />
          </header>
          {this.state.error ? <span className='error'>Oh no!</span> : null}
          <section className="main">
          <Route path='/:filter?' render={({match}) =>
            <TodoList
              todos={filterTodos(match.params.filter, this.state.todos)}
              />
            } />
          </section>
          <Footer remaining={remaining} />
        </div>
      </Router>
    )
  }
}
