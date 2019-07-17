import React from 'react'
import {Link} from 'react-router-dom'

export default props =>
  <footer className="footer">
    <span className="todo-count">
      There {props.remaining === 0 ? ' is no': (props.remaining === 1) ? ' is' : ' are'}<strong> {props.remaining > 0 && props.remaining}</strong>
      {props.remaining <= 1 ? ' note' : ' notes'}.
    </span>
  </footer>
