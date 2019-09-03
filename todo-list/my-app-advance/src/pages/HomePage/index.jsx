import React, { Component } from 'react';

import CreateTodoComponent from '../../components/CreateTodoComponent';
import TodoListComponent from '../../components/TodoListComponent';
import FilterTodoComponent from '../../components/FilterTodoComponent';

import { TodoListContext } from '../../context';

import './style.scss';

export default class HomePage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      current: 'all'
    };
  }

  static contextType = TodoListContext;

  handleFilter = (type) => {
    this.setState({
      current: type
    });
  };

  render () {
    const { current } = this.state;
    return <article className='todo-wrap'>
      <CreateTodoComponent/>
      {/*传入TodoListComponent内的props*/}
      <TodoListComponent current={current} renderTitle={<li className='todo-list_header'>
        <span className='nes-text is-primary'>待办事项</span>
        <span className='nes-text is-primary'>是否完成</span>
      </li>}>
        <h5 className='todo-list_title nes-text is-success'>待办列表</h5>
      </TodoListComponent>
      <FilterTodoComponent current={current} onFilter={this.handleFilter}/>
    </article>;
  }
}
