import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(({ TodoStore }) => ({ TodoStore }))
class HelloApp extends React.Component {

  renderTodoItem(todo, key) {
    const completedClassName = 'completed';

    return (
      <li key={key} className={completedClassName}>
        <div className='view'>
          <input className='toggle' type='checkbox'/>
          <label>todo</label>
          <button className='destroy'></button>
        </div>
        <input className='edit' value='Create a template'/>
      </li>
    );
  }

  render() {
    const {TodoStore, dispatch} = this.props;

    const todos = TodoStore.get('todos').toJS();
    const todosCount = todos.length;

    const todosDOM = todos.map((todo, idx) =>
      this.renderTodoItem(todo, idx)
    );

    return (
      <div>
        <section className='todoapp'>
          <header className='header'>
            <h1>todos</h1>
            <input className='new-todo' placeholder='What needs to be done?' autofocuc/>
          </header>
          <section className='main'>
            <input className='toggle-all' type='checkbox'/>
            <label htmlFor='toggle-all'>Mark all as complete</label>
            <ul className='todo-list'>
              {todosDOM}
            </ul>
          </section>
          <footer className='footer'>
            <span className='todo-count'>
              <strong>{todosCount}</strong> items left
            </span>
            <ul className='filters'>
              <li>
                <a className='selected'>All</a>
              </li>
              <li>
                <a className='selected'>Active</a>
              </li>
              <li>
                <a className='selected'>Completed</a>
              </li>
            </ul>
            <button className='clear-completed'>Clear completed</button>
          </footer>
        </section>
      </div>
    );
  }
}

export default HelloApp;
