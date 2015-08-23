import React from 'react/addons';

import * as TodoActions from 'actions/TodoActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const { update } = React.addons;

const ENTER_KEY = 13;

@connect(({ TodoStore }) => ({ TodoStore }))
class HelloApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterType: 'all'
    };
  }

  handleNewTodoKeys= (e) => {
    const getRefValue = (name) => {
      return React.findDOMNode(this.refs[name]).value;
    }

    const { dispatch } = this.props;

    const actions = bindActionCreators(TodoActions, dispatch);

    if (e.charCode === ENTER_KEY) {
      const value = getRefValue('newTodoInput');
      actions.addTodo(value);
    }
  }

  handleEditTodoKeys = (id, e) => {
    const getRefValue = (name) => {
      return React.findDOMNode(this.refs[name]).value;
    }
    const { dispatch } = this.props;

    const actions = bindActionCreators(TodoActions, dispatch);

    if (e.charCode === ENTER_KEY) {
      const value = getRefValue('editTodoInput' + id);

      this.setState({
        currentEditingItem: null
      });

      actions.editTodo(id, value);
    }
  }

  handleRemoveTodo = (id) => {
    const { dispatch } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);

    actions.removeTodo(id);
  }

  handleClearCompleted = () => {
    const { dispatch } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);

    actions.clearCompleted();
  }

  handleCompletedToggle = (id) => {
    const { dispatch } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);

    actions.toggleCompleted(id);
  }

  handleToggleAll = () => {
    const { dispatch } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);

    actions.toggleAllCompleted();
  }

  todoEditMode = (id) => {
    this.setState({
      currentEditingItem: id
    });
  }

  handleFilter = (type) => {
    this.setState(update(this.state, {
      $merge: { filterType: type }
    }));
  }

  renderTodoItem(todo, key) {
    let itemClass = todo.isCompleted ? 'completed' : '';

    const { currentEditingItem } = this.state;

    if (currentEditingItem === key) {
      itemClass = 'editing';
    }

    return (
      <li key={key} className={itemClass}>
        <div className='view'>
          <input className='toggle'
                 onChange={this.handleCompletedToggle.bind(this, key)}
                 checked={todo.isCompleted}
                 type='checkbox'/>
          <label onClick={this.todoEditMode.bind(this, key)}>{todo.text}</label>
          <button className='destroy'
                  onClick={this.handleRemoveTodo.bind(this, key)}/>
        </div>
        <input onKeyPress={this.handleEditTodoKeys.bind(this, key)}
               ref={'editTodoInput' + key}
               className='edit'/>
      </li>
    );
  }

  renderFooter(todosCount, activeTodosCount) {
    const getSelectedClass = (type) => {
      const { filterType } = this.state;

      if (filterType === type) return 'selected';
      return '';
    }

    if (todosCount === 0) {
      return null;
    }

    return (
      <footer className='footer'>
        <span className='todo-count'>
          <strong>{activeTodosCount}</strong> items left
        </span>
        <ul className='filters'>
          <li>
            <a href='#' onClick={this.handleFilter.bind(this, 'all')}
               className={getSelectedClass('all')}>All</a>
          </li>
          <li>
            <a href='#' onClick={this.handleFilter.bind(this, 'active')}
               className={getSelectedClass('active')}>Active</a>
          </li>
          <li>
            <a href='#' onClick={this.handleFilter.bind(this, 'completed')}
               className={getSelectedClass('completed')}>Completed</a>
          </li>
        </ul>
        <button onClick={this.handleClearCompleted}
                className='clear-completed'>Clear completed</button>
      </footer>
    );
  }

  render() {
    const {TodoStore, dispatch} = this.props;

    const todos = TodoStore.get('todos').toJS();

    const todosCount = todos.length;

    const activeTodosCount = todos.filter((todo) =>
      !todo.isCompleted).length;

    const { filterType } = this.state;

    const filteredTodos = todos.filter((todo) => {
      switch (filterType) {
        case 'all':
          return true;
        case 'active':
          return !todo.isCompleted;
        case 'completed':
          return todo.isCompleted;
      }
    });

    const todosDOM = filteredTodos.map((todo, idx) =>
      this.renderTodoItem(todo, idx)
    );

    return (
      <div>
        <section className='todoapp'>
          <header className='header'>
            <h1>todos</h1>
            <input ref='newTodoInput'
                   onKeyPress={this.handleNewTodoKeys}
                   className='new-todo'
                   placeholder='What needs to be done?'/>
          </header>
          <section className='main'>
            <input onChange={this.handleToggleAll}
                   className='toggle-all' type='checkbox'/>
            <label htmlFor='toggle-all'>Mark all as complete</label>
            <ul className='todo-list'>
              {todosDOM}
            </ul>
          </section>
          {this.renderFooter(todosCount, activeTodosCount)}
        </section>
      </div>
    );
  }
}

export default HelloApp;
