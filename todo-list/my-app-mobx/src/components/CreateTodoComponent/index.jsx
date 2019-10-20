import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class CreateTodoComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handelChange = (e) => {
    this.setState({
      value: e.target.value
    });
  };

  handleClick = () => {
    if (!this.state.value.trim()) {
      alert('请输入待办事项');
      return;
    }

    const { addTodo } = this.props.store.todo;
    const todo = {
      content: this.state.value,
      completed: false,
      id: Date.now()
    };
    addTodo(todo);
    this.setState({
      value: ''
    });
  };

  render () {
    const { value } = this.state;
    return <section className='todo-header'>
      <input type="text" placeholder='请输入待办事项' value={value} className='todo-header_input nes-input' onChange={this.handelChange}/>
      <button className='todo-header_btn nes-btn is-primary' type="button" onClick={this.handleClick}>提交</button>
    </section>;
  }
}

export default CreateTodoComponent
