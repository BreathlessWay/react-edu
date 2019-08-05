import React, { Component } from 'react';

export default class CreateTodoComponent extends Component {
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
    this.setState({
      value: 'add'
    });
  };

  render () {
    const { value } = this.state;
    return <section className='todo-header'>
      <input type="text" placeholder='请输入待办事项' value={value} className='todo-header_input nes-input' onChange={this.handelChange}/>
      <button className='todo-header_btn nes-btn is-primary' type="button" onClick={this.handleClick}>提交</button>
    </section>;
  }
};
