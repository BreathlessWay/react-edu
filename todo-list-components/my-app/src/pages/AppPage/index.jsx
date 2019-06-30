import React, { Component } from 'react';

import CreateTodoComponent from '../../components/CreateTodoComponent';
import TodoListShowComponent from '../../components/TodoListShowComponent';
import FilterTodoComponent from '../../components/FilterTodoComponent';

import './style.scss';

export default class AppPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // 在state中创建一个保存待办事项的数组, todoList
      todoList: [
        {
          id: Date.now(),
          content: '模拟待办事项',
          complete: false
        }],
      // 在state中创建一个currentFilter, 表示当前筛选的类型type
      currentFilter: 'all'
    };
  }

  // es7语法， 用于绑定this， 指向当前作用域
  // 我们在事件处理函数中执行更新待办事项的操作
  handleChangeTodo = (item) => {
    // 从state中取出todoList
    const { todoList } = this.state;
    // 找到state的todoList中与当前点击的item相同的项
    const todoItem = todoList.find(todo => todo.id === item.id);
    // 将找到的项的complete设为原来值的相反值, 即完成/未完成
    todoItem.complete = !todoItem.complete;
    // 将改完的todoList重新setState到state中
    this.setState({
      todoList
    });
  };

  // 在事件处理函数中进行setState操作, 对于每一个filter项的点击, 我们都能拿到一个type, 我们用setState将currentFilter设置为点击项的type
  handleFilterTodo = (type) => {
    this.setState({
      currentFilter: type
    });
  };

// 创建待办组件的回调函数
  handleCreateTodo = (todo) => {
    const { todoList } = this.state;
    if (todo) {
      // 将当前输入的待办事项添加到待办事项列表
      todoList.push(todo);
      // 通过setState设置新的待办事项列表
      this.setState({
        todoList
      });
    }
  };

  render () {
    // 在上一章我们提到过受控组件的概念, 受控组件必须要有一个value/checked/selected值, 且值的改变只能通过onChange事件, 所以这里我们为几个form组件在state中设置了初始值

    // const是es6语法, 用于声明常量, 声明的常量不可以再被赋值
    // {value, todoChecked...}是es6的解构语法, 可以从json或者数据中获取需要的字段
    const { todoList, currentFilter } = this.state;

    return <article className='todo-wrap'>
      <CreateTodoComponent onCreateTodo={this.handleCreateTodo}/>
      <TodoListShowComponent todoList={todoList} currentFilter={currentFilter} onChangeTodo={this.handleChangeTodo}/>
      <FilterTodoComponent currentFilter={currentFilter} onFilterTodo={this.handleFilterTodo}/>
    </article>;
  }
}
