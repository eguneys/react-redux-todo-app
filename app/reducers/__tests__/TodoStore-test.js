import 'babel-core/polyfill';
import { expect } from 'chai';

import * as TodoActions from 'actions/TodoActions';

import { bindActionCreators } from 'redux';
import createStore from 'lib/createStore';


describe('Todo Store', () => {
  let store, initialTodos, todoActions;

  beforeEach(() => {
    store = createStore();
    todoActions = bindActionCreators(TodoActions, store.dispatch);

    initialTodos = [{ text: 'Initial Todo', isCompleted: false }];
  });

  function todoState(prop) {
    return store.getState().TodoStore.get(prop);
  }

  it('should add todo', () => {
    todoActions.addTodo("mock todo");

    const expectedTodos =  initialTodos.concat([
      { text: 'mock todo', isCompleted: false }
    ]);

    var s = store.getState().TodoStore;

    expect(todoState('todos').toJS()).to.eql(expectedTodos);
  });
});
