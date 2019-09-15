import React, { Component } from 'react';

import CreateTodoComponent from '../../components/CreateTodoComponent';
import TodoListComponent from '../../components/TodoListComponent';
import FilterTodoComponent from '../../components/FilterTodoComponent';

import './style.scss';

export default class HomePage extends Component {
  render () {
    return <article className='todo-wrap'>
      <CreateTodoComponent/>
      {/*传入TodoListComponent内的props*/}
      <TodoListComponent renderTitle={<li className='todo-list_header'>
        <span className='nes-text is-primary'>待办事项</span>
        <span className='nes-text is-primary'>是否完成</span>
      </li>}>
        <h5 className='todo-list_title nes-text is-success'>待办列表</h5>
      </TodoListComponent>
      <FilterTodoComponent/>
    </article>;
  }
}
