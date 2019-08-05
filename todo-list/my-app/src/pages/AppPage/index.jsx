import React, { Component } from 'react';

import CreateTodoComponent from '../../components/CreateTodoComponent';
import TodoListComponent from '../../components/TodoListComponent';
import FilterTodoComponent from '../../components/FilterTodoComponent';

import './style.scss';

export default class AppPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      content: new Date()
    };
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      this.setState({
        content: new Date()
      });
    }, 1000);
  }

  componentWillUnmount () {
    clearInterval(this.timer);
  }

  render () {
    const { content } = this.state;
    return <article className='todo-wrap'>
      <CreateTodoComponent/>
      {/*传入TodoListComponent内的props*/}
      <TodoListComponent content={content.toLocaleString()}/>
      <FilterTodoComponent/>
    </article>;
  }
}
