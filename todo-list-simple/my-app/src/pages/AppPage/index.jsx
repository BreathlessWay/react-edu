import React, { Component } from 'react';
import './style.scss';

// 首先创建一个筛选项目的数组, 之所以把这个数组放在外面, 是因为这个数据是固定的, 不会改变, 对于不会改变的固定数据我们不需要把它放在组件内部
const filterList = [
  {
    id: 0,
    type: 'all',
    label: '全部'
  },
  {
    id: 1,
    type: 'complete',
    label: '已完成'
  },
  {
    id: 2,
    type: 'uncomplete',
    label: '未完成'
  }
];
// 按照要求react的自定义组件都必须大写开头
// 使用es6的类语法extends继承父类Component, 然后通过export default默认导出当前组件
// 使用class式创建组件, 组件必须继承react提供的父类Component
// 并且要实现render方法, 方法返回一个jsx
export default class AppPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // 提交时输入框输入值验证
      error: false,
      // 这个value值就是受控组件待办事项输入框的默认值
      value: '',
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
    // react的所有事件处理函数都要绑定this到当前作用域，class不会帮你绑定this，必须要手动绑定
    // 可以使用箭头函数，constructor中声明bind，或者public class fileds来绑定this
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  // 输入框onChange事件处理函数
  handleChangeInput (e) {
    // 事件源的value值即为输入框的值, 通过setState将其赋值给state的value
    this.setState({
      value: e.target.value
    });
  };

  // public class fileds语法， 用于绑定this， 指向当前作用域
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
  handleFilter = (type) => {
    this.setState({
      currentFilter: type
    });
  };

  // 当事件处理函数写成this.handleFilter(item.type)时，进行的柯里化
  handleFilter=(type)=>()=>{
    this.setState({
      currentFilter: type
    });
  }

  // 待办创建onClick事件处理函数
  handleSubmit = () => {
    // 获取当前输入的待办事项和待办事项列表
    const { todoList, value } = this.state;
    if (value && value.trim()) {
      // 将当前输入的待办事项添加到待办事项列表
      todoList.push({
        id: Date.now(),
        content: value,
        complete: false
      });
      // 通过setState设置新的待办事项列表, 并将输入框清空
      this.setState({
        error: false,
        todoList,
        value: ''
      });
    } else {
      this.setState({
        error: true
      });
    }
  };

  render () {
    // 在上一章我们提到过受控组件的概念, 受控组件必须要有一个value/checked/selected值, 且值的改变只能通过onChange事件, 所以这里我们为几个form组件在state中设置了初始值

    // const是es6语法, 用于声明常量, 声明的常量不可以再被赋值
    // {value, todoChecked...}是es6的解构语法, 可以从json或者数据中获取需要的字段
    const { value, todoList, currentFilter, error } = this.state;

    // 使用filter遍历todoList, 根据不同的currentFilter, 来决定返回, 生成一个新的数组, 也就是我们筛选出来的结果
    const filterTodoList = todoList.filter(todo => {
      if (currentFilter === 'all') {
        return todo;
      }
      if (currentFilter === 'complete') {
        return todo.complete;
      }
      if (currentFilter === 'uncomplete') {
        return !todo.complete;
      }
      return null;
    });

    return <article className='todo-wrap'>
      <section className='todo-header'>
        {/*className也可传入变量 `` 为es6的语法，用来拼接字符串和变量*/}
        <input type="text" placeholder='请输入待办事项' value={value} onChange={this.handleChangeInput} className={`todo-header_input nes-input ${error && 'is-error'}`}/>
        <button className='todo-header_btn nes-btn is-primary' type="button" onClick={this.handleSubmit}>提交</button>
      </section>
      {/*
      error && 'is-error'与运算符, 是react中条件渲染的一种方式, 当error为truly时, 会返回'is-error', 为falsey时就不会返回
      之所以能这样做，是因为在 JavaScript 中，true && expression 总是会返回 expression, 而 false && expression 总是会返回 false。
      因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。
      还可以用三元运算符 error ? 'is-error' : '', 一样是条件渲染
      与运算符也可以用来条件渲染组件, 比如下面这种写法
      */}
      {
        error && <span className="nes-text is-error">请输入待办事项</span>
      }
      <h5 className='todo-list_title nes-text is-success'>待办列表</h5>
      <ul className='todo-list_content'>
        <li className='todo-list_header'>
          <span className='nes-text is-primary'>待办事项</span>
          <span className='nes-text is-primary'>是否完成</span>
        </li>
        {/*
        接着我们用map遍历数组, 返回一个jsx
        map方法会返回一个新的数组, 这里会返回一个jsx的数组
        jsx中变量要用{}包起来, 这种对数据的遍历操作一样也要在{}中, 依次设置htmlFor id label
        关于key, react对于渲染循环列表, 要求为每一项添加惟一值key来做渲染优化, 所以要求key是确定且唯一的值, 可以用id, 不推荐用循环的索引值
        对于checked我们只要判断当前的currentFilter是否和数组中的某一项的type相等
        对于onChange事件我们通过使用一个箭头函数, 对处理函数handleFilter传参, 传入循环项的type, 也可以写成this.handleFilter.bind(this, item.type)
        不能直接写成this.handleFilter(item.type), 这样事件处理就直接执行了
        如果要写成这种样子, 需要对事件处理函数柯里化
        */}
        {
          filterTodoList.map(item => <li className='todo-list_item' key={item.id}>
            <p className='todo-list_item-detail'>{item.content}</p>
            <label className='todo-list_item-complete'>
              <input type="checkbox" checked={item.complete} onChange={() => this.handleChangeTodo(item)} className='todo-list_item-checkbox nes-checkbox'/>
              <span/>
            </label>
          </li>)
        }
      </ul>
      <section className='todo-filter'>
        {
          // 这里我们遍历的是筛选出来的数组filterTodoList
          filterList.map(item => <label htmlFor={item.type} className='todo-filter_item' key={item.id}>
            <input type="checkbox" checked={currentFilter === item.type} id={item.type} onChange={() => this.handleFilter(item.type)} className='todo-filter_item-checkbox nes-checkbox'/>
            <span className='todo-filter_item-label'>{item.label}</span>
          </label>)
        }
      </section>
    </article>;
  }
}
