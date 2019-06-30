// 每一个react组件文件都要先引入react
import React, { PureComponent } from 'react';
// react的props的类型校验包
import PropTypes from 'prop-types';

import './style.scss';

export default class CreateTodoComponent extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      value: '',
      error: false
    };
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  // 输入框onChange事件处理函数
  handleChangeInput (e) {
    // 事件源的value值即为输入框的值, 通过setState将其赋值给state的value
    this.setState({
      value: e.target.value
    });
  };

  // 待办创建onClick事件处理函数
  handleSubmit = () => {
    // 获取当前输入的待办事项和待办事项列表
    const { value } = this.state;
    if (value && value.trim()) {
      // 回调函数, 前面说过react是单向数据流的, 作为子组件是不能直接设置父组件的state, 但是我们可以通过回调函数的形式将需要的参数传递给父组件, 然后由父组件自己拿参数来更新自身的state
      // 比如这里我们将输入的待办事项, 通过props上的onCreateTodo回调函数来传递给父组件
      this.props.onCreateTodo({
        id: Date.now(),
        content: value,
        complete: false
      });
      // 通过setState设置新的待办事项列表, 并将输入框清空
      this.setState({
        error: false,
        value: ''
      });
    } else {
      this.setState({
        error: true
      });
    }
  };

  render () {
    const { value, error } = this.state;

    return <section className='todo-header'>
      {/*className也可传入变量 `` 为es6的语法，用来拼接字符串和变量*/}
      <input type="text" placeholder='请输入待办事项' value={value} onChange={this.handleChangeInput} className={`todo-header_input nes-input ${error && 'is-error'}`}/>
      <button className='todo-header_btn nes-btn is-primary' type="button" onClick={this.handleSubmit}>提交</button>
    </section>;
  }
};
// 约定组件接受的props类型, 这里我们约定组件需要一个函数类型的props而且是必传的onCreateTodo
CreateTodoComponent.propTypes = {
  onCreateTodo: PropTypes.func.isRequired
};
