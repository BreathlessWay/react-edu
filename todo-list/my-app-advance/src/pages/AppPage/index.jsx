import React, { Component } from 'react';

import CreateTodoComponent from '../../components/CreateTodoComponent';
import TodoListComponent from '../../components/TodoListComponent';
import FilterTodoComponent from '../../components/FilterTodoComponent';

import './style.scss';

export default class AppPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      current: 'all',
      list: [
        {
          content: '待办1',
          completed: false,
          id: 0
        },
        {
          content: '待办2',
          completed: true,
          id: 1
        }
      ]
    };
  }

  handleAddTodo = (content) => {
    const { list } = this.state;

    const todo = {
      content,
      completed: false,
      id: list.length
    };

    list.push(todo);

    this.setState({
      list
    });
  };

  handleChange = ({ id, completed }) => {
    const { list } = this.state;

    list.forEach(item => {
      if (item.id === id) {
        item.completed = completed;
      }
    });

    this.setState({
      list
    });

  };

  handleFilter = (type) => {
    this.setState({
      current: type
    });
  };

  render () {
    const { list, current } = this.state;
    return <article className='todo-wrap'>
      <CreateTodoComponent onAddTodo={this.handleAddTodo}/>
      {/*传入TodoListComponent内的props*/}
      <TodoListComponent list={list} onChange={this.handleChange} current={current} renderTitle={<li className='todo-list_header'>
        <span className='nes-text is-primary'>待办事项</span>
        <span className='nes-text is-primary'>是否完成</span>
      </li>}>
        <h5 className='todo-list_title nes-text is-success'>待办列表</h5>
      </TodoListComponent>
      <FilterTodoComponent current={current} onFilter={this.handleFilter}/>
    </article>;
  }
}
